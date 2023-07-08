import React from 'react';
import './styles.scss';

const ApplicationBox = () => {
  return (
    <div className='label-tile-appbox'>
      <label>Applications</label>
      <div className="application-box">
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
      <div className="shape shape3"></div>
        <div className="small-box-1">
          <p className="number-app">16</p>
          <p className="label-app">Receive</p>
        </div>
        <div className="small-box-2">
          <p className="number-app">6</p>
          <p className="label-app">ONHOLD</p>
        </div>
        <div className="small-box-3">
          <p className="number-app">10</p>
          <p className="label-app">Failed</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationBox;
