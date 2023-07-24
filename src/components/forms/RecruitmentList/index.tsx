import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardQuestion, faClipboardCheck, faList, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

const TilesContainer = () => {
  return (
    <div className="tiles-container">
      <div className="tile">
        <i className="fas fa-interview"><FontAwesomeIcon icon={faClipboardQuestion} /></i>
        <h3>Interview</h3>
        <p className="number">10</p>
      </div>
      <div className="tile">
        <i className="fas fa-clipboard-check"><FontAwesomeIcon icon={faClipboardCheck} /></i>
        <h3>Onboarding</h3>
        <p className="number">5</p>
      </div>
      <div className="tile">
        <i className="fas fa-list"><FontAwesomeIcon icon={faList} /></i>
        <h3>Shortlisting</h3>
        <p className="number">20</p>
      </div>
      <div className="tile">
        <i className="fas fa-check-circle"><FontAwesomeIcon icon={faCheckCircle} /></i>
        <h3>Hired</h3>
        <p className="number">15</p>
      </div>
    </div>
  );
};

export default TilesContainer;
