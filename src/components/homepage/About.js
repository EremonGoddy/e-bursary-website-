import React, { useState} from "react";
import "./navigation.css";
import {Link} from "react-router-dom";
import about from '../../assets/services.jpg'

const About = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
  <div>
 <div className="topbar">
  <div className="logo">Ebursary</div>
  <div className="menu-icon" onClick={toggleMenu}>
  &#9776;
  </div>
  <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/service">Service</Link>
  <Link to="/contact">Contact</Link>
  </div>
  </div>
<h2>About Us</h2>
<div className='backgrounds'>
<img src={about} alt="about"/>
</div>
<div className="content-section">
<div className='about'>
<h1>Our Mission</h1>
<p>
Welcome to our e-Bursary System! Our mission is to streamline the 
bursary application process for students by offering a user-friendly, 
efficient, and transparent platform. We aim to bridge the gap between 
students and financial resources, ensuring no student is left behind 
due to financial constraints.
</p>
      </div>
      <div className='about1'>
      <h1>Our Vision</h1>
      <p>
      To be the leading digital platform in providing seamless access to 
          educational opportunities, fostering a future where every student 
          achieves their academic potential through equitable resource allocation.

      </p>
      </div>  
      <div className='about2'>
      <h1>Our Commitment</h1>
      <p>
      We are committed to ensuring equitable access to education by connecting 
    deserving students with the resources they need. Through innovation and 
    dedication, we strive to make the bursary application process transparent, 
    accountable, and accessible to all.

      </p>
      </div> 
      </div> 
    </div>
  )
}

export default About
