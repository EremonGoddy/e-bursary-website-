import React, { useState, useEffect  } from "react";
import {Link} from "react-router-dom";
import "./sample.css";
import arrangement from '../../assets/arrangement-education-growth-concept.jpg'
import homepic from '../../assets/homepic.jpg'; // Add the new image
import homephoto from '../../assets/homephoto.jpg'; // Add the second new image


const Homepages = () => {
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
  const images = [arrangement, homepic, homephoto]; // Array of images
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
  const interval = setInterval(() => {
  setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through the images
  }, 3000); // Change image every 2 seconds
    
  return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);
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
    <Link to="/signin">
    <input type="button" value="Sign in" className="signin"/>
    </Link>
    </div>
    </div>
    <div className="background">
   <img src={images[currentImageIndex]} alt="Dynamic background" className="background" />
  <div className="form-blur">
  <h2>Empowering Education in Turkana Through Bursaries: Your Path to Success</h2>
  </div>
  </div> 
  <div className="content-sections">
  <div className='program'>
  <h1>Overview of the Bursary Program in Turkana County:
  </h1>
  <p>The Turkana County Bursary Program is designed to support deserving students from
  Turkana County in their pursuit of higher education.The program aims to alleviate
  financial barriers and empower talented individuals to achieve their academic goals.
  Eligible candidates will receive financial assistance to cover tuition fees, textbooks,
  and other educational expenses.</p>
  </div>
      
  <div className="dates">
  <h1>Key Dates for Application:
  </h1>
  <ul>
  <li>Application Open Date: 12/3/2024</li>
  <li>Application Deadline: 25/3/2024</li>
  <li>Announcement of Recipients: 2/4/2024</li>
  <li>Disbursement of Funds: 12/4/2024</li>
  </ul>
  </div>
      
  <div className="announcement">
  <h1>Important Announcement:
  </h1>
  <p>
  We are pleased to announce that the application period for the Turkana County
  Bursary Program is now open.All interested candidates are encouraged to submit
  their applications before the deadline to be considered for financial assistance.
  Additionally, please note that this year, we have expanded the eligibility
  criteria to include students pursuing vocational and technical courses.
  </p>
  </div>  
    </div>    
    </div>
  )
}

export default Homepages
