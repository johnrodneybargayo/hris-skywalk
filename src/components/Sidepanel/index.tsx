import React from 'react';
import './styles.scss';

interface SidepanelProps {
  isOpen: boolean;
}

const Sidepanel: React.FC<SidepanelProps> = ({ isOpen }) => {
  const handleDashboardClick = () => {
    // Handle dashboard button click
    window.location.href = '/dashboard';
  };

  const handleRecruitmentClick = () => {
    // Handle recruitment button click
    window.location.href = '/recruitment';
  };

  return (
    <div className={`sidepanel ${isOpen ? '' : 'open'}`}>
      <div className="panel-content">
        <h1 className='label-dashboard'>Dashboard</h1>
        <button className='btn-dashboard' onClick={handleDashboardClick}>
          Dashboard
        </button>
        <button className='btn-recruitment' onClick={handleRecruitmentClick}>
          Recruitment
        </button>
        <button className='btn-AE'>All Employees</button>
        <button className='btn-compensation'>Compensation</button>
        <button className='btn-ER'>Employee Relation</button>
        <button className='btn-CP'>Career Path</button>
        <button className='btn-LD'>Learning &amp; Development</button>
      </div>
    </div>
  );
};

export default Sidepanel;
