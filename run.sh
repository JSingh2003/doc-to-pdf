#!/bin/bash

# Exit on any error
set -e

# Variables
FRONTEND_DIR="frontend"
BACKEND_DIR="backend"
FRONTEND_PORT=8080
BACKEND_PORT=3001

# Check for dependencies
echo "Checking dependencies..."
if ! command -v npm &> /dev/null; then
  echo "npm is not installed. Please install Node.js and npm first."
  exit 1
fi

if ! command -v serve &> /dev/null; then
  echo "'serve' is not installed globally. Installing now..."
  npm install -g serve
fi

# Start backend
echo "Setting up backend..."
if [ -d "$BACKEND_DIR" ]; then
  cd "$BACKEND_DIR"
  echo "Installing backend dependencies..."
  npm install
  echo "Starting backend server on port $BACKEND_PORT..."
  npm run start &
  BACKEND_PID=$!
  cd ..
else
  echo "Warning: Backend directory '$BACKEND_DIR' not found. Skipping backend setup."
fi

# Start frontend
echo "Setting up frontend..."
if [ -d "$FRONTEND_DIR" ]; then
  cd "$FRONTEND_DIR"
  echo "Installing frontend dependencies..."
  npm install
  echo "Building frontend app..."
  npm run build
  echo "Starting frontend app on port $FRONTEND_PORT..."
  serve -s build -l $FRONTEND_PORT &
  FRONTEND_PID=$!
  cd ..
else
  echo "Warning: Frontend directory '$FRONTEND_DIR' not found. Skipping frontend setup."
fi

# Wait for processes to terminate
echo "App is running. Press Ctrl+C to stop."

# Handle termination and cleanup
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait
