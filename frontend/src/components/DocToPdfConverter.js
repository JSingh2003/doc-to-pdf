import React, { useState, useRef } from "react";
import { renderAsync } from "docx-preview";
import html2pdf from "html2pdf.js";

const DocToPdfConverter = () => {
  const [file, setFile] = useState(null);
  const previewRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;

        // Render the .docx content to HTML
        await renderAsync(arrayBuffer, previewRef.current);

        // Convert the rendered HTML to a PDF
        const pdfOptions = {
          margin: 1,
          filename: "converted.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(pdfOptions).from(previewRef.current).save();
      } catch (error) {
        console.error("Error converting file:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        className="border p-2"
      />
      <button
        onClick={handleConvert}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded shadow font-semibold"
      >
        Convert to PDF
      </button>
      <div ref={previewRef} className="hidden"></div> {/* Hidden container for rendering */}
    </div>
  );
};

export default DocToPdfConverter;