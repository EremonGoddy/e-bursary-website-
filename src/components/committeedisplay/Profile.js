import React, { useState, useEffect } from 'react';
import axios from 'axios';
import patient from '../../assets/patient.png';
import './profile.css';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [committeeDetails, setCommitteeDetails] = useState({});
const [formData, setFormData] = useState({
fullname: '',
email: '',
phone_no: '',
national_id: '',
subcounty: '',
ward: '',
position: '',
});
const [isProfileFetched, setIsProfileFetched] = useState(false);
const [profileExists, setProfileExists] = useState(false);
const navigate = useNavigate();

const toggleSidebar = () => setSidebarActive(!sidebarActive);

// Fetch profile data when component loads
useEffect(() => {
const token = sessionStorage.getItem('authToken');
if (!token) {
navigate('/signin');
} else {
axios
.get('http://localhost:5000/api/profile-committee', {
headers: { Authorization: `Bearer ${token}` },
})
.then((response) => {
setIsProfileFetched(true);
const data = response.data;
if (data) {
setFormData(data); // Set fetched data to form
setProfileExists(true); // Mark profile as existing
}
})
.catch((error) => {
console.error('Error fetching profile data:', error);
setIsProfileFetched(true); // Mark fetching attempt as finished
setProfileExists(false); // Mark profile as non-existent
});
}
}, [navigate]);

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
e.preventDefault();
const token = sessionStorage.getItem('authToken');
  
axios
.post('http://localhost:5000/api/profile-form', formData, {
headers: { Authorization: `Bearer ${token}` },
})
.then(() => {
alert('Profile created/updated successfully');
        
// After successful submission, set profileExists to true and use the submitted data
setProfileExists(true);
  
// Optionally, you can refetch the profile data here if needed, but this is unnecessary
// since you already have the updated data in formData.
  
// Clear the form data only if you want to reset the form, but we keep the data here for display
})
.catch((error) => {
console.error('Error submitting committee data:', error);
alert('Error submitting data. Please try again.');
});
};

// Fetch profile data when component loads
useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      navigate('/signin');
      } else {
      axios
      .get('http://localhost:5000/api/profile-committee', {
      headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
      setCommitteeDetails(response.data);
      
      })
      .catch((error) => {
      console.error('Error fetching profile data:', error);
      });
      }
      }, [navigate]);
return (
<div>
{/* Top Bar */}
<div className="topbary">
<div className="logoy">
<h2>EBursary</h2>
</div>
<div className="searchs">
<input type="text" id="search" placeholder="search here" />
<label htmlFor="search">
<i className="bi bi-search"></i>
</label>
</div>
<h1 className='welcoming'>Welcome:{committeeDetails.fullname}</h1>
<div className="usery">
<img src={patient} alt="User" />
</div>
<i class="bi bi-bell-fill"></i>
</div>

{/* Sidebar */}
<div className={`sidebary ${sidebarActive ? 'active' : ''}`}>
<div>
<i className="bi bi-list" id="btn" onClick={toggleSidebar}></i>
<ul>
<li>
<Link to='/committeedashboard'>
<i className="bi bi-house-door-fill"></i>
<span className="links-name">Dashboard</span>
</Link>
<span className="tooltip">Dashboard</span>
</li>
<li>
<Link to="/profile">
<i class="bi bi-person-square"></i>
<span className="links-name">Profile</span>
</Link>
<span className="tooltip">Profile</span>
</li>
<li>
<Link to="/userdetails">
<i className="bi bi-file-earmark-text-fill"></i>
<span className="links-name">Student Information</span>
</Link>
<span className="tooltip">Student Information</span>
</li>
<li>
<Link to="/comreport">
<i class="bi bi-bar-chart-fill"></i>
<span className="links-name">Analysis</span>
</Link>
<span className="tooltip">Analysis</span>
</li>
<li>
<Link to='/settings'>
<i className="bi bi-gear-fill"></i>
<span className="links-name">Settings</span>
</Link>
<span className="tooltip">Settings</span>
</li>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div className="Navigation">
<li>
<Link to='/'>
<i className="bi bi-box-arrow-right"></i>
<span className="links-name">Logout</span>
</Link>
<span className="tooltip">Logout</span>
</li>
</div>
</ul>
</div>
</div>

{/* Profile Form */}
<div>
{isProfileFetched ? (
profileExists ? (
<div className="profile-info">
<h2>Committee Profile</h2>
<table>
<tbody>
<tr>
<td><strong>Full name:</strong></td>
<td>{formData.fullname}</td>
</tr>
<tr>
<td><strong>Email:</strong></td>
<td>{formData.email}</td>
</tr>
<tr>
<td><strong>Phone No:</strong></td>
<td>{formData.phone_no}</td>
</tr>
<tr>
<td><strong>National ID:</strong></td>
<td>{formData.national_id}</td>
</tr>
<tr>
<td><strong>Sub County:</strong></td>
<td>{formData.subcounty}</td>
</tr>
<tr>
<td><strong>Ward:</strong></td>
<td>{formData.ward}</td>
</tr>
<tr>
<td><strong>Position:</strong></td>
<td>{formData.position}</td>
</tr>
</tbody>
</table>
<p>Your profile has been successfully updated. You can edit it anytime.</p>
</div>
) : (
<div className='profile-box'>
<h2>Create Profile</h2>
<form onSubmit={handleSubmit}>
<div className="profile-input-box">
<label>
Full name:
<input
type="text"
name="fullname"
value={formData.fullname}
onChange={handleChange}
/>
</label>
<label>
Email:
<input
type="text"
name="email"
value={formData.email}
onChange={handleChange}
/>
</label>
<label>
Phone No:
<input
type="text"
name="phone_no"
value={formData.phone_no}
onChange={handleChange}
/>
</label>
<label>
National ID:
<input
type="text"
name="national_id"
value={formData.national_id}
onChange={handleChange}
/>
</label>
<label>
Sub County:
<input
type="text"
name="subcounty"
value={formData.subcounty}
onChange={handleChange}
/>
</label>
<label>
Ward:
<input
type="text"
name="ward"
value={formData.ward}
onChange={handleChange}
/>
</label>
<label>
Position:
<input
type="text"
name="position"
value={formData.position}
onChange={handleChange}
/>
</label>
<button type="submit">Submit</button>
</div>
</form>
</div>
)
) : (
<p>Loading...</p>
)}
</div>
</div>
);
};

export default Profile;









