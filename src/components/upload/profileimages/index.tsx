import React, { useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import './styles.scss';

interface ImageUploadResponse {
  profileImageUrl: string;
}

const ImagesUpload: React.FC = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const defaultImageUrl =
    'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('profile', file); // Use the correct file field name 'profile'

      const response = await axios.post<ImageUploadResponse>('https://hrsystem.empireonecontactcenter.com/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const profileImageUrl = response.data.profileImageUrl;

      setProfileImageUrl(profileImageUrl);

      console.log('Uploaded image URL:', profileImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setProfileImageUrl('');
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleDrop(event.target.files[0]);
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Use the profileImageUrl state to conditionally display the default image or uploaded image
  const displayImageUrl = profileImageUrl || defaultImageUrl;

  return (
    <div className="images-upload-container">
      <img className="image-placeholder-applicants" src={displayImageUrl} alt="Profile" />
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
    </div>
  );
};

export default ImagesUpload;
