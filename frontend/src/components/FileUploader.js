import React from "react";

const FileUploader = ({ onFileSelect }) => {
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <label className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded shadow">
        Upload File
        <input
          type="file"
          accept=".doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUploader;
