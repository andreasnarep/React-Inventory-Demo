import React from "react";
import "./Header.css"; // Import CSS file for styling
import logo from "../images/logo.jpg"; // Import your logo image
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <img src={logo} alt="Logo" className="logo" />
        <nav className="header-titles">
          <ul>
            <li>
              <Link className="header-link" to="/">PEALEHT</Link>
            </li>
            <li>
              <Link className="header-link" to="/bq-uksed">BQ UKSED</Link>
            </li>
            <li>
              <Link className="header-link" to="/bq-aknad">BQ AKNAD</Link>
            </li>
            <li>
              <Link className="header-link" to="/polo-uksed">POLO UKSED</Link>
            </li>
            <li>
              <Link className="header-link" to="/ladu">LADU</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;