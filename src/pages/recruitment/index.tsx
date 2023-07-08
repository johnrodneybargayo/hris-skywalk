import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidepanel from '../../components/Sidepanel';
import Loader from '../../components/Loader';
import Dropdown from '../../components/Dropdown';
import ProgressBar from '../../components/ProgressBar';
import Applications from '../../components/Applications';
import TilesContainer from '../../components/RecruitmentList';
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
          <div className={`dashboard-recruitment ${isDashboardHalfWidth ? '' : 'half-width'}`}>
            <div className="dashboard-container-recruitment">
              <div className="recruitment-container">
                <div className="recruitment-tile">
                  <h1>RECRUITMENT</h1>
                </div>
                <div className="sources-container">
                  <h1 className='title-sources'>Sources</h1>
                  <div className="dropdown-container">
                    <Dropdown />
                  </div>
                  <div className='box-container'>
                    <p className='label-box-progress'>EmpireOne Contact Center</p>
                    <ProgressBar value={45} maxValue={100} color=" rgb(127 48 176)" />
                    <p className='label-box-progress'>Facebook Page</p>
                    <ProgressBar value={50} maxValue={100} color=" rgb(191 70 70" />
                    <p className='label-box-progress'>Refferal</p>
                    <ProgressBar value={11} maxValue={100} color=" rgb(147 255 87)" />
                    <p className='label-box-progress'>JobStreet</p>
                    <ProgressBar value={84} maxValue={100} color=" rgb(87 117 255)" />
                    <p className='label-box-progress'>Mynimo</p>
                    <ProgressBar value={25} maxValue={100} color=" rgb(0 255 154)" />
                    <p className='label-box-progress'>LinkedIn</p>
                    <ProgressBar value={30} maxValue={100} color=" rgb(10 215 14)" />
                  </div>
                  <TilesContainer />
                  <div className="tile-appbox">
                    <Applications />
                  </div>
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
