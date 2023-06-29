import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidepanel from '../../components/Sidepanel';
import Loader from '../../components/Loader';
import './styles.scss';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDashboardHalfWidth, setIsDashboardHalfWidth] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    setIsDashboardHalfWidth(!isDashboardHalfWidth);
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
          <Sidepanel isOpen={isPanelOpen} />
          <div className={`dashboard ${isDashboardHalfWidth ? '' : 'half-width'}`}>
            <div className="dashboard-container">
              <div className="dashboard-tile">
                <button className="tiles">
                  <p className="title-tile">Recruitment</p>
                </button>
              </div>
              <div className="dashboard-tile">
                <button className="tiles">
                  <p className="title-tile">All Employees</p>
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
              {/* Add more dashboard tiles here */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
