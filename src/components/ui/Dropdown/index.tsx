import React from 'react';
import './styles.scss';

const Dropdown = () => {
  return (
    <div className="dropdown">
      <input type="checkbox" id="dropdown" />

      <label className="dropdown__face" htmlFor="dropdown">
        <div className="dropdown__text"><p>DEPARTMENT</p></div>

        <div className="dropdown__arrow"></div>
      </label>

      <ul className="dropdown__items">
        <li>ALL</li>
        <li>HUMAN RESOURCES</li>
        <li>GRAPHIC DESIGNER</li>
        <li>CSR AGENT</li>
        <li>IT</li>
        <li>MANAGER</li>
        <li>FINANCE</li>
        <li>MARKETING</li>
      </ul>
    </div>
  );
}

export default Dropdown;

export {};
