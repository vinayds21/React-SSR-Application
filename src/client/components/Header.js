/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar-fixed">
      <nav className="grey">
        <div className="conainer">
          <div className="nav-wrapper">
            <Link to="/">SpaceX Launch Program</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
