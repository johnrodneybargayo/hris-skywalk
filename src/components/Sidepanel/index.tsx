import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

interface SidepanelProps {
  isOpen: boolean;
  active: string;
}

const Sidepanel: React.FC<SidepanelProps> = ({ isOpen, active }) => {
  const history = useHistory();

  const handleDashboardClick = () => {
    history.push('/dashboard');
  };

  const handleRecruitmentClick = () => {
    history.push('/recruitment');
  };

  return (
    <div className={`sidepanel ${isOpen ? '' : 'open'}`}>
      <div className="panel-content">
        <h1 className="label-dashboard">Dashboard</h1>
        <button
          className={`btn-dashboard ${active === 'dashboard' ? 'active' : ''}`}
          onClick={handleDashboardClick}
        >
          Dashboard
        </button>
        <button
          className={`btn-recruitment ${active === 'recruitment' ? 'active' : ''}`}
          onClick={handleRecruitmentClick}
        >
          Recruitment
        </button>
        <button className="btn-cdoc">Central Documentation</button>
        <button className="btn-compensation">Compensation</button>
        <button className="btn-ER">Employee Relation</button>
        <button className="btn-CP">Career Path</button>
        <button className="btn-LD">Learning &amp; Development</button>
        <button className="btn-payroll">Payroll</button>
      </div>
    </div>
  );
};

export default Sidepanel;
