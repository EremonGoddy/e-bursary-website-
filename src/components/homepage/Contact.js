import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import "./navigation.css";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import contact from '../../assets/contact.jpg';

const Contact = () => {
const [formData, setFormData] = useState({ name: "", email: "", message: "" });
const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
const handleChange = (e) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Form submitted:", formData);
alert("Thank you for contacting us! We will get back to you soon.");
setFormData({ name: "", email: "", message: "" });
};

return (
<div>
{/* Top Bar */}
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

{/* Contact Section */}
<div className='backgrounders'>
     
<img src={contact} alt="contact" />

<div className='getintouch'>
<p>GET IN TOUCH</p>
</div>
<div className="contents-section">
{/* Address Section */}
<div className='address'>
<FontAwesomeIcon icon={faMapMarkerAlt} className='location-icon' />
<h1>LOCATION</h1>
<p>Nawoitorong, Turkana County Headquarters<br />P.O Box 141-30500, Lodwar</p>
</div>

{/* Contact Numbers */}
<div className='contacting'>
<FontAwesomeIcon icon={faPhoneAlt} className='contact-icon' />
<h1>PHONE</h1>
<p>+254707556732</p>
<p>+254707556732</p>
</div>

{/* Email Address */}
<div className='email-address'>
<FontAwesomeIcon icon={faEnvelope}  className='email-icon'/>
<h1>EMAIL </h1>
<p>eremon.godwin@gmail.com</p>
</div>
</div>
</div>

{/* Contact Form */}
<div className='contenting-section'>
<div className='messagecontact'>
<h1>Contact us</h1>
<p>Have questions or need assistance? We're here to help! Whether you’re seeking information, need support, 
or have feedback, feel free to reach out. Fill out the form below with your details and message,
and our team will respond promptly. 
We look forward to connecting with you and addressing your needs effectively!</p>
</div>
<div className='submitcontact'>
<form onSubmit={handleSubmit}>
<div className='user-contact'>
<div className='user-input-contact'>
<label htmlFor="name">Name:</label>
<input
type="text"
id="name"
name="name"
value={formData.name}
onChange={handleChange}
required
/>
</div>
<div className='user-input-contact'>
<label htmlFor="email">Email:</label>
<input
type="email"
id="email"
name="email"
value={formData.email}
onChange={handleChange}
required
/>
</div>
<div className='user-input-contact'>
<label htmlFor="message">Message:</label>
<textarea
id="message"
name="message"
value={formData.message}
onChange={handleChange}
rows="4"
required
></textarea>
</div>

<button
type="submit"
style={{
backgroundColor: "#007BFF",
color: "white",
padding: "10px 20px",
border: "none",
borderRadius: "4px",
cursor: "pointer"
}}
>
Submit
</button>
</div>
</form>
</div>
</div>
</div>
);
};

export default Contact;