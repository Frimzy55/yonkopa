import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const ImageUploader = () => {
  const [preview, setPreview] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6">
          {/* Image Preview */}
          {preview && (
            <div className="text-center mb-2">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded"
                style={{ maxHeight: "150px", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Drag-and-Drop Section */}
          <div
            {...getRootProps()}
            className="text-center p-3 border border-secondary rounded"
            style={{ background: "#f7f7f7", cursor: "pointer", fontSize: "1rem" }}
          >
            <input {...getInputProps()} />
            <p style={{ fontSize: "1rem", color: "#555" }}>
              Drag & Drop or Click to Select a File
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
