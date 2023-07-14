import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Sidepanel from '../../components/Sidepanel';
import Loader from '../../components/Loader';
import './styles.scss';

const DashboardPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDashboardHalfWidth, setIsDashboardHalfWidth] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    setIsDashboardHalfWidth(!isDashboardHalfWidth);
  };

  const handleTileClick = () => {
    history.push('/recruitment');
  };

  useEffect(() => {
    // Simulate a delay of 2 seconds = 2000 before marking loading as complete
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="dashboard-page">
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <Header togglePanel={togglePanel} />
          <Sidepanel isOpen={isPanelOpen} active={'dashboard'} />
          <div className={`dashboard ${isDashboardHalfWidth ? '' : 'half-width'}`}>
            <div className="dashboard-container">
              <div className="dashboard-tile">
                <button className="tiles" onClick={handleTileClick}>
                  <p className="title-tile">Recruitment</p>
                </button>
              </div>
              <div className="dashboard-tile">
                <button className="tiles">
                  <p className="title-tile">Central Documentation</p>
                </button>
              </div>
              <div className="dashboard-tile">
                <button className="tiles">
                  <p className="title-tile">Compensation</p>
                </button>
              </div>
              <div className="dashboard-tile">
                <button className="tiles">
                  <p className="title-tile">Employee relation</p>
                </button>
              </div>
              <div className="dashboard-tile">
                <button className="tiles">
                  <p className="title-tile">Career Path</p>
                </button>
              </div>
              <div className="dashboard-tile">
                <button className="tiles">
                  <p className="title-tile">Learning &amp; Development</p>
                </button>
              </div>
              <div className="dashboard-tile">
                <button className="tiles">
                  <p className="title-tile">Payroll</p>
                </button>
              </div>
              {/* Add more dashboard tiles here */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
