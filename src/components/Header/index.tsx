import React from 'react';
import { FaBars, FaSearch, FaCog, FaBell, FaUser } from 'react-icons/fa';
import './styles.scss';

interface HeaderProps {
  togglePanel: () => void;
}

const Header: React.FC<HeaderProps> = ({ togglePanel }) => {
  return (
    <div className="banner">
      <div className="left-section">
        <img
          className="logo-banner"
          src="https://empireonecontactcenter.com/wp-content/uploads/2023/03/Contact-Center-logo.png"
          alt="Logo"
        />
        <button className="side-panel-btn" onClick={togglePanel}>
          <FaBars />
        </button>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <FaSearch className="search-icon" />
        </div>
      </div>
      <div className="right-section">
        <button className="notification-icon">
          <FaBell />
        </button>
        <button className="profile-icon">
          <FaUser />
        </button>
        <button className="settings-icon">
          <FaCog />
        </button>
      </div>
    </div>
  );
};

export default Header;
