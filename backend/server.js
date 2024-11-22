const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const cors = require('cors');

// Create an Express app
const app = express();
const port = 3001;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});
// Enable CORS
app.use(cors());

// Set up file storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  },
});

const upload = multer({ storage });

// Conversion endpoint
app.post('/convert', upload.single('file'), (req, res) => {
  const inputFilePath = req.file.path;
  const outputFilePath = `converted/${Date.now()}.pdf`;

  console.log('Received file:', req.file);

  // Check if file exists
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // LibreOffice command to convert DOCX to PDF
  const command = `soffice --headless --convert-to pdf "${inputFilePath}" --outdir "converted"`;

  console.log('Running command:', command); // Log the command to check for errors

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error during conversion:', error);
      console.error('stderr:', stderr);
      return res.status(500).json({ error: `Conversion failed: ${stderr || error.message}` });
    }

    console.log('stdout:', stdout);

    // Send the converted PDF file to the client
    res.download(outputFilePath, (err) => {
      if (err) {
        console.error('Error sending the converted file:', err);
        return res.status(500).json({ error: 'Failed to send the converted file' });
      }

      // Clean up the uploaded and converted files after sending them
      fs.unlinkSync(inputFilePath);  // Remove uploaded file
      fs.unlinkSync(outputFilePath);  // Remove converted PDF
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
