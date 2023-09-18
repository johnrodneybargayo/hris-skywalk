import React, { useEffect, useRef } from 'react';
import { FaWrench, FaUserCircle, FaSlidersH } from 'react-icons/fa';
import './styles.scss';
import Logout from '../../logout';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;

}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`settings-modal ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="settings-content" ref={modalRef}>
          <div className="settings-button-label">
            <div>
              <FaWrench /> <span>Settings</span>
            </div>
          </div>
          <div className='settings-add-buttons'>
            <button className="settings-button">
              <FaUserCircle /> User Profile
            </button>
            <button className="settings-button">
              <FaSlidersH /> Advanced Options
            </button>
          </div>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default SettingsModal;
