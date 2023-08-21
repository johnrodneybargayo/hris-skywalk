import React, { useState, useRef } from 'react';
import axios from 'axios';
import UploadProfileImage from '../../modals/UploadprofileImage'; // Corrected the component import name
import './styles.scss';

interface ImageUploadResponse {
  imageUrl: string;
}

interface ImagesUploadProps {
  onImageUpload: (file: File) => void;
}

const ImagesUpload: React.FC<ImagesUploadProps> = ({ onImageUpload }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false); // Added type annotation
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const defaultImageUrl = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post<ImageUploadResponse>('https://empireone-global-inc.uc.r.appspot.com/api/uploadImage',
    //  const response = await axios.post<ImageUploadResponse>('http://localhost:8080/api/uploadImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const uploadedImageUrl = response.data.imageUrl;

      setImageUrl(uploadedImageUrl);
      console.log('Uploaded image URL:', uploadedImageUrl);
      onImageUpload(file); // Pass the uploaded file to the parent component
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageUrl(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleDrop(selectedFile);
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="images-upload-container">
      <img
        className="image-placeholder-applicants"
        src={imageUrl || defaultImageUrl}
        alt="Profile"
      />
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
        onImageUpload={handleDrop} // Use the handleDrop function
      />
    </div>
  );
};

export default ImagesUpload;
