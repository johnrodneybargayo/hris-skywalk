import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidepanel from '../../components/Sidepanel';
import Loader from '../../components/Loader';
import Dropdown from '../../components/Dropdown';
import './styles.scss';

const RecruitmentPage = () => {
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
            <div className="recruitment-container">
              <div className="recruitment-tile">
                <h1>RECRUITMENT</h1>
              </div>
              <div className="sources-container">
                <h1 className='title-sources'>Sources</h1>
                <div className="dropdown-container">
                  <Dropdown />
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecruitmentPage;
