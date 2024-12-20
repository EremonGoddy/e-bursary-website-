import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import "./comsample.css";

const SampleCom = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div>
      <div className="navbar">
        <div className="navbar-logo">
          <h1>My Website</h1>
        </div>
        <ul className={isMobile ? "nav-links-mobile" : "nav-links"}>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/service" className="nav-link">
              Service
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/sampling">
              <input type="button" value="Sign in" />
            </Link>
          </li>
        </ul>
        <div className="hamburger" onClick={() => setIsMobile(!isMobile)}>
          &#9776;
        </div>
      </div>
    </div>
  );
};

export default SampleCom;