import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

interface SidepanelProps {
  isOpen: boolean;
  active: string;
  onClose: () => void;
}

const Sidepanel: React.FC<SidepanelProps> = ({ isOpen, active, onClose }) => {
  const history = useHistory();
  const sidepanelRef = useRef<HTMLDivElement>(null);

  const handleDashboardClick = () => {
    history.push('/dashboard');
  };

  const handleRecruitmentClick = () => {
    history.push('/recruitment');
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidepanelRef.current &&
        !sidepanelRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen ? (
        <div className="sidepanel-backdrop" onClick={onClose} />
      ) : null}
      <div className={`sidepanel ${isOpen ? 'open' : ''}`} ref={sidepanelRef}>
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
    </>
  );
};

export default Sidepanel;
