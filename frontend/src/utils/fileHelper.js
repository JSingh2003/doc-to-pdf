export const isValidFile = (file) => {
    const validExtensions = ["doc", "docx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };
  