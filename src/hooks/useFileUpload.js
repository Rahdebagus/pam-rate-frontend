// ─── File Upload Hook ─────────────────────────────────────────────────────────

import { useState, useRef } from "react";

/**
 * Custom hook for file upload handling
 * @param {function} onFileSelect - Callback when file is selected
 * @param {function} validateFile - Optional file validation function
 * @returns {Object} File upload state and handlers
 */
export const useFileUpload = (onFileSelect, validateFile) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const handleFile = (f) => {
    // Validate file
    if (validateFile && !validateFile(f)) {
      setError("Invalid file. Please check file type and size.");
      return;
    }

    if (!f || !f.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, WEBP)");
      return;
    }

    setError(null);
    setFile(f);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);

    // Call callback
    if (onFileSelect) onFileSelect(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const clear = () => {
    setPreview(null);
    setFile(null);
    setError(null);
  };

  return {
    preview,
    file,
    dragOver,
    error,
    inputRef,
    handleFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    clear,
    setError,
  };
};
