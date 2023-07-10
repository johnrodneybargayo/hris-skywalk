import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidepanel from '../../components/Sidepanel';
import Loader from '../../components/Loader';
import Dropdown from '../../components/Dropdown';
import ProgressBar from '../../components/ProgressBar';
import Applications from '../../components/Applications';
import Interview from '../../components/Interviews';
import Chart from '../../components/Chart';
import HiringPositions from '../../components/Hiring';
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

  const positions = [
    { position: "Software Engineer", available: 5 },
    { position: "UI/UX Designer", available: 3 },
    { position: "Data Analyst", available: 2 },
  ];

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
                    <ProgressBar value={50} maxValue={100} color=" rgb(191 70 70)" />
                    <p className='label-box-progress'>Refferal</p>
                    <ProgressBar value={11} maxValue={100} color=" rgb(147 255 87)" />
                    <p className='label-box-progress'>JobStreet</p>
                    <ProgressBar value={84} maxValue={100} color=" #451397" />
                    <p className='label-box-progress'>Mynimo</p>
                    <ProgressBar value={25} maxValue={100} color=" rgb(0 255 154)" />
                    <p className='label-box-progress'>LinkedIn</p>
                    <ProgressBar value={30} maxValue={100} color=" rgb(10 215 14)" />
                  </div>
                </div>
                <TilesContainer />
                <div className="tile-appbox">
                  <Applications />
                </div>
                <div className="interviews-box-container">
                  <div className="interviews-box">
                    <h2>Interviews</h2>
                    <div className="interview-scrollable">
                      <Interview candidate="John Doe" />
                      <Interview candidate="Jane Smith" />
                      <Interview candidate="Michael Johnson" />
                      <Interview candidate="John Doe" />
                      <Interview candidate="Jane Smith" />
                      <Interview candidate="Michael Johnson" />
                      <Interview candidate="John Doe" />
                      <Interview candidate="Jane Smith" />
                      <Interview candidate="Michael Johnson" />
                      <Interview candidate="John Doe" />
                      <Interview candidate="Jane Smith" />
                    </div>
                  </div>
                  <div className="button-74-container">
                    <button className="button-74">
                      <span className="button-icon">+</span>
                      Add Candidates
                    </button>
                  </div>
                </div>
                <div className="chart-container-1">
                  <h1 className="chart-label">Job Statistic</h1>
                  <Chart />
                  <div className="shape1-chart"></div>
                  <div className="shape2-chart"></div>
                </div>
                <div className="job-postings-container">
                  <h1 className='job-header'>Current Job Postings</h1>
                  <HiringPositions positions={positions} />
                  <div className="circle-shape shape1-job"></div>
                  <div className="circle-shape shape2-job"></div>
                </div>

              </div>
            </div>
          </div>
        </>
      )
      }
    </div >
  );
};

export default RecruitmentPage;
