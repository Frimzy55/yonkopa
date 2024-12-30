import React, { useState } from "react";
import { Button, Box, Typography, Snackbar } from "@mui/material";

const MaterialImageUploader = () => {
  const [preview, setPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // To store error message
  const [openSnackbar, setOpenSnackbar] = useState(false); // To control snackbar visibility

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file); // Debugging: Check the selected file

    if (file) {
      if (file.type.startsWith("image")) {
        setPreview(URL.createObjectURL(file)); // Show the preview
        setErrorMessage(""); // Clear any previous error
        setOpenSnackbar(false); // Hide the snackbar if no error
      } else {
        setErrorMessage("Please select a valid image file."); // Set error message
        setOpenSnackbar(true); // Show snackbar with error
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Upload Photo
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {preview && (
        <Box mt={2}>
          <Typography>Image Preview:</Typography>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "auto", height: "auto", maxWidth: "10%" }} // Normal image size
          />
        </Box>
      )}

      {/* Snackbar for error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Box>
  );
};

export default MaterialImageUploader;
