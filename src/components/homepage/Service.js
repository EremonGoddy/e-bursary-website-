import React, { useState} from "react";
import {Link} from "react-router-dom";
import "./navigation.css";
import services from '../../assets/payment.jpg'

const Service = () => {
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
<div className='backgrounder'>
<h2>Our Services</h2>
<img src={services} alt="services"/>
</div>
<div className="content-section">
<div className="service">
<h1>Student Registration</h1>
<p>
Easily register for bursary applications through our user-friendly system. 
Create an account and start your journey toward financial assistance. 
The digital process eliminates paperwork and streamlines registration, 
allowing students to focus on their education without hassle.
</p>
</div>

{/* Application Tracking */}
<div className="service1">
<h1>Application Tracking</h1>
<p>
Track your bursary application in real time with our transparent system. 
Stay informed at every stage, from submission to approval, through timely 
updates. No need to follow up manually — our platform keeps you in the loop.
</p>
</div>

{/* Document Upload */}
<div className="service2">
<h1>Document Upload</h1>
<p>
Upload required documents securely and with ease. Our system supports multiple 
file formats and ensures data confidentiality. Simplify submissions and manage 
your application digitally, reducing the need for physical paperwork.
</p>
</div>

{/* Allocation Notifications */}
<div className="service3">
<h1>Allocation Notifications</h1>
<p>
Get notified about bursary allocation and disbursement status. Our alerts 
keep you informed at key milestones, helping you stay updated and plan 
ahead with confidence. Notifications are sent directly to ensure transparency.
</p>
</div>
</div>
</div>
)
}

export default Service
