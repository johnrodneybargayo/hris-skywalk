import React from 'react';
import './styles.scss';

const ApplicationBox = () => {
  return (
    <>
      <div className='label-tile-appbox'>
        <label>Applications</label>
        <div className="application-box">
          <div className="shape shape1-app"></div>
          <div className="shape shape2-app"></div>
          <div className="shape shape3-app"></div>
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

      <div className='label-tile-appbox-2'>
        <div className="application-box">
          <div className="shape-app shape1-app"></div>
          <div className="shape-app shape2-app"></div>
          <div className="shape-app shape3-app"></div>
          <div className="small-box-1">
            <p className="number-app">16</p>
            <p className="label-app">Male</p>
          </div>
          <div className="small-box">
            <p className="label-app-2">GENDER RATIO</p>
          </div>
          <div className="small-box-3">
            <p className="number-app">10</p>
            <p className="label-app">Female</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationBox;
