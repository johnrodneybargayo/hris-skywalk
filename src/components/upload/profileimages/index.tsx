import React, { useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import './styles.scss';

interface ImageUploadResponse {
  image: {
    url: string;
    imageType: string;
    size: number;
    contentType: string;
    createdBy: string;
    createdAt: string;
  };
}

const ImagesUpload: React.FC = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const defaultImageUrl =
    'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      
        formData.append('image', file);

      // Send the image to the backend server using axios
      const response = await axios.post<ImageUploadResponse>('https://empireone-global-inc.uc.r.appspot.com/api/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        }
      );

      const imageUrl = response.data.image.url;
      setProfileImageUrl(imageUrl);

      console.log('Uploaded profile image URL:', imageUrl);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleProfileUpload(event.target.files[0]);
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
            handleProfileUpload(e.dataTransfer.files[0]);
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
