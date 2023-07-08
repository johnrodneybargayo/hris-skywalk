import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidepanel from '../../components/Sidepanel';
import Loader from '../../components/Loader';
import Dropdown from '../../components/Dropdown';
import ProgressBar from '../../components/ProgressBar';
import Applications from '../../components/Applications';
import { faClipboardCheck, faList, faCheckCircle, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                <div className='box-container'>
                  <ProgressBar value={45} maxValue={100} color=" rgb(127 48 176)" />
                  <ProgressBar value={50} maxValue={100} color=" rgb(191 70 70" />
                  <ProgressBar value={15} maxValue={100} color=" rgb(147 255 87)" />
                  <ProgressBar value={85} maxValue={100} color=" rgb(87 117 255)" />
                  <ProgressBar value={25} maxValue={100} color=" rgb(0 255 154)" />
                </div>
                <div className='tiles-container'>

                  <div className="tile">
                    <i className="fas fa-interview"><FontAwesomeIcon icon={faClipboardQuestion} /></i>
                    <h3>Interview</h3>
                    <p className="number">10</p>
                  </div>
                  <div className="tile">
                    <i className="fas fa-clipboard-check"><FontAwesomeIcon icon={faClipboardCheck} />
                    </i>
                    <h3>Onboarding</h3>
                    <p className="number">5</p>
                  </div>
                  <div className="tile">
                    <i className="fas fa-list"><FontAwesomeIcon icon={faList} /></i>
                    <h3>Shortlisting</h3>
                    <p className="number">20</p>
                  </div>
                  <div className="tile">
                    <i className="fa-check-circle"><FontAwesomeIcon icon={faCheckCircle} /></i>
                    <h3>Hired</h3>
                    <p className="number">15</p>
                  </div>
                </div>
                <div className="tile-appbox">
                  <>
                    <Applications />
                  </>
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
