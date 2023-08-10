import React, { useState, useRef } from 'react';
import axios from 'axios';
import UploadProfileImage from '../../modals/UploadprofileImage';
import './styles.scss'; // Add the appropriate styling for the ImagesUpload component

interface ImageUploadResponse {
  imageUrl: string;
}

const ImagesUpload = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const defaultImageUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      // Send the image to the backend server using axios
      const response = await axios.post<ImageUploadResponse>('http://localhost:8080/api/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // The response should contain the image URL or filename saved on the server
      const imageUrl = response.data.imageUrl; // Replace "imageUrl" with the actual property name returned by the server

      // Set the imageUrl state to the received image URL
      setImageUrl(imageUrl);

      // Do something with the image URL if needed (e.g., set it to the applicant's data)
      console.log('Uploaded image URL:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Set imageUrl to null when an error occurs to display the default image
      setImageUrl(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleDrop(event.target.files[0]);
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="images-upload-container">
      {imageUrl ? (
        <img className="image-placeholder-applicants" src={imageUrl} alt="Profile" />
      ) : (
        <img className="image-placeholder-applicants" src={defaultImageUrl} alt="Profile" />
      )}
      <div
        className="images-upload-overlay"
        onClick={handleClickUpload}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files.length > 0) {
            handleDrop(e.dataTransfer.files[0]);
          }
        }}
      >
        <span className="images-upload-icon">+</span>
        <span className="images-upload-text">Upload Photo</span>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      <UploadProfileImage
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onImageUpload={(file) => {
          handleDrop(file);
        }}
      />
    </div>
  );
};

export default ImagesUpload;
