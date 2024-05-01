import React from "react";
import "./Header.css";
import logo from "../images/logo.jpg";
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const Header = ({ selectedItem }) => {
  const location = useLocation();
  const pathname = location.pathname.substring(1);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <div className="header-content">
        <img src={logo} alt="Logo" className="logo" />
        <nav className={`header-titles${showMenu ? '-show-menu' : ''}`}>
          <div className="menu-icon-container">
            <div className="menu-icon" onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
          <ul>
            <li className={pathname === '' ? 'active' : ''}>
              <Link className="header-link" to="/">MAIN PAGE</Link>
            </li>
            <li className={pathname === 'bq-doors' ? 'active' : ''}>
              <Link className="header-link" to="/bq-doors">BQ DOORS</Link>
            </li>
            <li className={pathname === 'bq-windows' ? 'active' : ''}>
              <Link className="header-link" to="/bq-windows">BQ WINDOWS</Link>
            </li>
            <li className={pathname === 'polo-doors' ? 'active' : ''}>
              <Link className="header-link" to="/polo-doors">POLO DOORS</Link>
            </li>
            <li className={pathname === 'inventory' ? 'active' : ''}>
              <Link className="header-link" to="/inventory">INVENTORY</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;