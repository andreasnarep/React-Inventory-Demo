import React from "react";
import "./Header.css"; // Import CSS file for styling
import logo from "../images/logo.jpg"; // Import your logo image
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const Header = ({ selectedItem }) => {
  const location = useLocation();
  const pathname = location.pathname.substring(1); // Remove the leading slash
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <div className="header-content">
        <img src={logo} alt="Logo" className="logo" />
        <nav className={`header-titles${showMenu ? 'show-menu' : ''}`}>
          <div className="menu-icon-container">
            <div className="menu-icon" onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
          <ul>
            <li className={pathname === '' ? 'active' : ''}>
              <Link className="header-link" to="/">PEALEHT</Link>
            </li>
            <li className={pathname === 'bq-uksed' ? 'active' : ''}>
              <Link className="header-link" to="/bq-uksed">BQ UKSED</Link>
            </li>
            <li className={pathname === 'bq-aknad' ? 'active' : ''}>
              <Link className="header-link" to="/bq-aknad">BQ AKNAD</Link>
            </li>
            <li className={pathname === 'polo-uksed' ? 'active' : ''}>
              <Link className="header-link" to="/polo-uksed">POLO UKSED</Link>
            </li>
            <li className={pathname === 'ladu' ? 'active' : ''}>
              <Link className="header-link" to="/ladu">LADU</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;