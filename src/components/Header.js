import React from "react";
import "./Header.css"; // Import CSS file for styling
import logo from "../images/logo.jpg"; // Import your logo image
import { Link } from "react-router-dom";
import { useState } from 'react';

const Header = ({ selectedItem }) => {
  return (
    <header>
      <div className="header-content">
        <img src={logo} alt="Logo" className="logo" />
        <nav className="header-titles">
          <ul>
          <li className={selectedItem === 'HOME' ? 'active' : ''}>
              <Link className="header-link" to="/">PEALEHT</Link>
            </li>
            <li className={selectedItem === 'BQ UKSED' ? 'active' : ''}>
              <Link className="header-link" to="/bq-uksed">BQ UKSED</Link>
            </li>
            <li className={selectedItem === 'BQ AKNAD' ? 'active' : ''}>
              <Link className="header-link" to="/bq-aknad">BQ AKNAD</Link>
            </li>
            <li className={selectedItem === 'POLO UKSED' ? 'active' : ''}>
              <Link className="header-link" to="/polo-uksed">POLO UKSED</Link>
            </li>
            <li className={selectedItem === 'LADU' ? 'active' : ''}>
              <Link className="header-link" to="/ladu">LADU</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;