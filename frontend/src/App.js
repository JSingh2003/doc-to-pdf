import React from 'react';
import DocToPdfConverter from './components/DocToPdfConverter'; // Adjust the path based on your file structure
import './App.css';  // Import the updated CSS file

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        DOC to PDF Converter
      </header>
      
      <section className="info-section">
        <p className="intro-text">
          Welcome to the DOC to PDF Converter! This tool allows you to easily convert your DOCX files into PDF format without losing any content.
        </p>
        <p className="instructions-text">
          Simply upload your DOCX file below, and with a click of a button, you can download a fully converted PDF version.
        </p>
        <p className="note-text">
          Note: The converter preserves all text, images, and formatting from the original DOCX file.
        </p>
      </section>

      <div className="main-content">
        <DocToPdfConverter />
      </div>

      <footer className="footer">
        <p>&copy; 2024 Doc Converter App. All Rights Reserved.</p>
        
      </footer>
    </div>
  );
};

export default App;
