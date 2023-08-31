import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './styles.scss';
import { UploadButton } from '../../ui/Buttons'; // Make sure to provide the correct path to the UploadButton component

interface UploadProfileImageProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onImageUpload: (file: File) => void;
}

interface ImageUploadResponse {
  imageUrl: string;
}

const UploadProfileImage: React.FC<UploadProfileImageProps> = ({
  isOpen,
  onRequestClose,
  onImageUpload,
}) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedImage(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (uploadedImage) {
      try {
        const formData = new FormData();
        formData.append('image', uploadedImage);

        // Send the image to the backend server using axios
        const response = await axios.post<ImageUploadResponse>('https://empireone-global-inc.uc.r.appspot.com/api/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // The response should contain the image URL or filename saved on the server
        const imageUrl = response.data.imageUrl; // Replace "imageUrl" with the actual property name returned by the server

        // Do something with the image URL if needed (e.g., set it to the applicant's data)
        onImageUpload(uploadedImage);
        setUploadedImage(null);
        onRequestClose();
        console.log('Uploaded image URL:', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Upload Profile Image Modal"
      className="upload-profile-image-modal"
      overlayClassName="upload-profile-image-modal-overlay"
    >
      <h2>Drag and Drop an Image</h2>
      <div className="dropzone">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <p>Drag and drop an image here, or click to select an image.</p>
      </div>
      {uploadedImage && (
        <div className="uploaded-image-preview">
          <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Preview" />
        </div>
      )}
      <UploadButton value="Upload Image" onClick={handleImageUpload} />
    </Modal>
  );
};

export default UploadProfileImage;
