import React, { useState } from 'react';
import './gameIcon.css';

const MenuNav = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {/* <nav className="nav"> */}
        <label htmlFor="menu" onClick={handleCheckboxChange}>Menu</label>
        <ul className="menu">
          <li>
            <a href="#0">
              <span>About</span>
              <i className="fas fa-address-card" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="#0">
              <span>Projects</span>
              <i className="fas fa-tasks" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      {/* </nav> */}

      {/* <p className="notification">Click on the Menu</p>
      <footer className="page-footer">
        <span>made by </span>
        <a href="https://georgemartsoukos.com/" target="_blank" rel="noopener noreferrer">
          <img
            width="24"
            height="24"
            src="https://assets.codepen.io/162656/george-martsoukos-small-logo.svg"
            alt="George Martsoukos logo"
          />
        </a>
      </footer> */}
    </>
  );
};

export default MenuNav;
