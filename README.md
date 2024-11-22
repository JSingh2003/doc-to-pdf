## Setup and Running

### 1. Manual Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/JSingh2003/doc-to-pdf.git
   cd Doc-to-pdf
   ```

2. Build and run:
   ```bash
   npm i
   npm run start:run
   ```

### 2. Automated Scripts
#### `run_demo.sh`

This script sets up the entire environment, including RabbitMQ and the backend service, in Docker containers.

**Script Highlights**:

- Cleans up any existing Docker containers and networks.
- Creates a custom Docker network.

**Usage**:

1. Make the script executable:
   ```bash
   chmod +x run.sh
   ```
2. Execute the script:
   ```bash
   ./run.sh
   ```
## Directory Structure

```nim

doc-to-pdf/
├── backend/               # Backend service
│   ├── uploads/           # Directory for uploaded files
│   ├── .dockerignore      # Docker ignore rules for the backend
│   ├── Dockerfile         # Dockerfile for the backend
│   ├── package.json       # Dependencies for the backend
│   ├── server.js          # Main server logic
│
├── frontend/              # Frontend service
│   ├── public/            # Static assets (e.g., favicon, index.html)
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   ├── src/               # React source code
│   │   ├── components/    # Reusable React components
│   │   │   ├── DocToPdfConverter.js
│   │   │   ├── FileUploader.js
│   │   ├── utils/         # Helper functions
│   │   │   ├── fileHelper.js
│   │   ├── App.css        # Styling for the app
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # Entry point
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js  # Jest test setup
│   ├── .dockerignore      # Docker ignore rules for the frontend
│   ├── Dockerfile         # Dockerfile for the frontend
│   ├── package.json       # Dependencies for the frontend
│
├── .github/
│   ├── workflows/
│       ├── docker-build.yml # CI/CD workflow configuration
│
├── k8s/                   # Kubernetes configuration files
├── docker-compose.yml     # Docker Compose file for local development
├── run.sh                 # Shell script for initializing services
├── README.md              # Documentation
                        # Project documentation
```

---
