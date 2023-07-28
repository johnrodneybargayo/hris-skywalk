import React from 'react';
import './styles.scss'; // Import the styles.scss for styling the modal

interface UserDetailProps {
  showModal: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailProps> = ({ showModal, onClose }) => {
  return (
    <div className={`modal-overlay ${showModal ? 'open' : ''}`}>
      <div className="modal-content">
        {/* Close Icon */}
        <div className="close-icon" onClick={onClose}>
          <svg height="45px" width="45px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            {/* SVG paths for the close icon */}
            {/* ... */}
          </svg>
        </div>
        {/* Modal Content */}
        <h2>User Information</h2>
        {/* Add your modal content here */}
      </div>
    </div>
  );
};

export default UserDetailModal;