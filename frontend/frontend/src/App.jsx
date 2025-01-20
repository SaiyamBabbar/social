import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./App.css";

const App = () => {
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Function triggered on file drop
  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) {
      setErrorMessage("No file selected. Please upload a valid file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    setLoading(true);
    setErrorMessage("");
    setExtractedText("");

    try {
      const response = await axios.post("http://localhost:5001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setExtractedText(response.data.text || "No text could be extracted.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong while processing the file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
    maxFiles: 1,
  });

  // Split the extracted text by lines
  const splitLines = extractedText ? extractedText.split("\n") : [];

  return (
    <div className="App">
      <h1>Social Media Content Analyzer</h1>
      <div
        {...getRootProps()}
        className={`dropzone ${loading ? "disabled" : ""}`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <p>Processing your file...</p>
        ) : (
          <p>Drag & drop a file here, or click to select one (PDF/Images)</p>
        )}
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {extractedText && (
        <div className="result">
          <h2>Extracted Text</h2>
          <ul className="text-list">
            {splitLines.map((line, index) =>
              line.trim() ? <li key={index}>{line}</li> : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;