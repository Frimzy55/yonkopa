import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa'; // Camera icon from React Icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ProfilePicture = () => {
  const [profileImage, setProfileImage] = useState(null); // Holds the current profile image URL
  const [isUploading, setIsUploading] = useState(false); // Uploading state
  const fileInputRef = useRef(null); // Ref to trigger file input when clicking on the icon

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the selected image for display after uploading
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image upload (simulated in this example)
  const handleUpload = async () => {
    if (!profileImage) return;

    setIsUploading(true);

    try {
      // Simulate the upload process with a timeout (e.g., upload to your server or cloud storage)
      setTimeout(() => {
        // After upload, reset uploading state and show success
        setIsUploading(false);
        alert("Profile picture uploaded successfully!");
      }, 2000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-white text-primary">
          <h3 className="mb-0">Profile Picture</h3>
        </div>
        <div className="card-body text-center">
          {/* Display the current profile image */}
          <div className="profile-image mb-4">
            <img
              src={profileImage || "default-avatar.png"} // Use default if no profile image
              alt="Profile"
              className="img-thumbnail"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>

          {/* Upload Icon - Trigger file input */}
          <div className="upload-section mb-3">
            <button
              className="btn btn-light btn-lg"
              onClick={() => fileInputRef.current.click()} // Trigger file input on icon click
              disabled={isUploading}
              style={{ border: '2px solid #ddd', borderRadius: '50%' }}
            >
              <FaCamera size={30} color="#007bff" /> {/* Camera icon */}
            </button>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }} // Hide the file input
            />
          </div>

          {/* Action buttons for upload */}
          <div className="action-buttons">
            {profileImage && !isUploading ? (
              <button
                className="btn btn-success"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            ) : (
              <p>Select an image to upload</p>
            )}
          </div>
        </div>
        <div className="card-footer text-muted">
          Update your profile picture by clicking the icon above.
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
