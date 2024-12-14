import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

const MaterialImageUploader = () => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
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
    </Box>
  );
};

export default MaterialImageUploader;
