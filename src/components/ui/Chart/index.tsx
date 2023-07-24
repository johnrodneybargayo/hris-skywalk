import React from 'react';
import './styles.scss';


const Chart = () => {
  return (
    <>
      <div className="chart-container">
        <table id="q-graph">
          <thead>
            <tr>
              <th></th>
              <th className="sent">Invoiced</th>
              <th className="paid">Collected</th>
            </tr>
          </thead>
          <tbody>
            <tr className="qtr" id="q1">
              <th scope="row">MON</th>
              <td className="sent bar" style={{ height: '111px' }}><p></p></td>
              <td className="paid bar" style={{ height: '99px' }}><p></p></td>
            </tr>
            <tr className="qtr" id="q2">
              <th scope="row">TUE</th>
              <td className="sent bar" style={{ height: '206px' }}><p></p></td>
              <td className="paid bar" style={{ height: '194px' }}><p></p></td>
            </tr>
            <tr className="qtr" id="q3">
              <th scope="row">WED</th>
              <td className="sent bar" style={{ height: '259px' }}><p></p></td>
              <td className="paid bar" style={{ height: '193px' }}><p></p></td>
            </tr>
            <tr className="qtr" id="q4">
              <th scope="row">THURS</th>
              <td className="sent bar" style={{ height: '110px' }}><p></p></td>
              <td className="paid bar" style={{ height: '195px' }}><p></p></td>
            </tr>
            <tr className="qtr" id="q5">
              <th scope="row">FRI</th>
              <td className="sent bar" style={{ height: '110px' }}><p></p></td>
              <td className="paid bar" style={{ height: '195px' }}><p></p></td>
            </tr>
            <tr className="qtr" id="q6">
              <th scope="row">SAT</th>
              <td className="sent bar" style={{ height: '110px' }}><p></p></td>
              <td className="paid bar" style={{ height: '195px' }}><p></p></td>
            </tr>
            <tr className="qtr" id="q7">
              <th scope="row">SUN</th>
              <td className="sent bar" style={{ height: '110px' }}><p></p></td>
              <td className="paid bar" style={{ height: '195px' }}><p></p></td>
            </tr>
          </tbody>
        </table>

        <div id="ticks">
          <div className="tick" style={{ height: '59px' }}><p>125%</p></div>
          <div className="tick" style={{ height: '59px' }}><p>100%</p></div>
          <div className="tick" style={{ height: '59px' }}><p>75%</p></div>
          <div className="tick" style={{ height: '59px' }}><p>50%</p></div>
          <div className="tick" style={{ height: '59px' }}><p>25%</p></div>
        </div>
      </div>
      <div className='month'>
        <button className='month-button'>Month</button>
      </div>
      <div className='week'>
        <button className='week-button'>Week</button>
      </div>
    </>
  );
};

export default Chart;
