import React from 'react';
import './styles.scss';


const Chart = () => {
  return (
    <div className="chart-container">
      <div className="igFrameBar">
        <div className="igData igData1"></div>
        <div className="igData igData2"></div>
        <div className="igData igData3"></div>
        <div className="igData igData4"></div>
        <div className="igData igData5"></div>
        <div className="igData igData6"></div>
        <div className="igData igData7"></div>
      </div>
      <div className='month'>
        <button className='month-button'>Month</button>
      </div>
      <div className='week'>
        <button className='week-button'>Week</button>
      </div>
      <div className='day'>
    </div>
    <div className='Job'>
      <p>Job Applied</p>
      <p>Job</p>
      </div>
</div>
  );
};

export default Chart;
