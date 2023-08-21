import React from 'react';
import Board from '../ui/Boards/Board';
import UserDetailExport from '../ui/Export/UserDetailExport';
import './styles.scss'; // Import the styles.scss for styling the modal

interface ShortlistingsModalProps {
  showModal: boolean;
  onClose: () => void;
}

const ShortlistingsModal: React.FC<ShortlistingsModalProps> = ({ showModal, onClose }) => {
  return (
    <div className={`modal-overlay ${showModal ? 'open' : ''}`}>
      <div className="modal-content">
        {/* Close Icon */}
        <div className="close-icon" onClick={onClose}>
          <svg height="45px" width="45px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path style={{ fill: '#3a3672' }} d="M0,256c0,141.384,114.615,256,256,256l22.261-256L256,0C114.615,0,0,114.615,0,256z"></path>
              <path style={{ fill: '#1C274C' }} d="M256,0v512c141.384,0,256-114.616,256-256S397.384,0,256,0z"></path>
              <polygon style={{ fill: '#FFFFFF' }} points="161.555,114.333 114.333,161.555 208.778,256 114.333,350.445 161.555,397.667 256,303.222 278.261,256 256,208.778 "></polygon>
              <polygon style={{ fill: '#cfc2ff' }} points="397.667,161.555 350.445,114.333 256,208.778 256,303.222 350.445,397.667 397.667,350.445 303.222,256 "></polygon>
            </g>
          </svg>
        </div>
        {/* Modal Content */}
        <h2 className='label-pooling'>Applicants Pooling</h2>
        <UserDetailExport />
        
        {/* Display the Board component with draggable tiles and droppable areas */}
        <Board />
      </div>
    </div>
  );
};

export default ShortlistingsModal;
