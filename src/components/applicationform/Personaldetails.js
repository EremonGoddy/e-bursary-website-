import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Amountdetails.css";
import patient from '../../assets/patient.png';
import {Link,useNavigate } from 'react-router-dom';



const Personaldetails = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [studentDetails, setStudentDetails] = useState({});
const [formData, setFormData] = useState({
fullname: '',
email: '',
subcounty: '',
ward: '',
village: '',
birth: '',
gender: '',
institution: '',
year: '',
admission: ''
});

const navigate = useNavigate();

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

// Function to toggle sidebar active state
const toggleSidebar = () => {
  setSidebarActive(!sidebarActive);
  }; 

const handleSubmit = (e) => {
e.preventDefault();
// Send form data to the backend
axios.post('http://localhost:5000/api/personal-details', formData)
.then(response => {
alert('Data inserted successfully');
navigate('/Amountdetails');
})
.catch(error => {
console.error('There was an error inserting the data!', error);
});
};

useEffect(() => {
const token = sessionStorage.getItem('authToken');
if (!token) {
navigate('/signin'); // Redirect if not authenticated
} else {
axios.get('http://localhost:5000/api/student', {
headers: { Authorization: token },
})
.then((response) => {
setStudentDetails(response.data);
})
.catch(error => console.error('Error fetching student data:', error));
}
}, [navigate]);
   
return (
<div>
 {/* Top Bar */}
<div className="topbars">
<div className="logos">
<h2>EBursary</h2>
</div>

<h1>Welcome:{studentDetails.fullname}</h1>
<div className="users">
<img src={patient} alt="User" />
</div>
<i class="bi bi-bell-fill"></i>
</div>

{/* Sidebar */}
<div className={`sidebars ${sidebarActive ? 'active' : ''}`}>
<div>
<i className="bi bi-list" id="btn" onClick={toggleSidebar}></i>
<ul>
<li>
<Link to="/student">
<i className="bi bi-house-door-fill"></i>
<span className="links-name">Dashboard</span>
</Link>
<span className="tooltip">Dashboard</span>
</li>
<li>
<Link to="/personaldetails">
<i className="bi bi-file-earmark-text-fill"></i>
<span className="links-name">Apply</span>
</Link>
<span className="tooltip">Apply</span>
</li>
<li>
<Link to="/documentupload">
<i class="bi bi-paperclip"></i>
<span className="links-name">File attached</span>
</Link>
<span className="tooltip">File attached</span>
</li>
<li>
<Link to="/reports">
<i class="bi bi-file-earmark-arrow-down-fill"></i>
<span className="links-name">Download Report</span>
</Link>
<span className="tooltip">Report</span>
</li>
<li>
<Link>
<i className="bi bi-chat-dots-fill"></i>
<span className="links-name">Messages</span>
</Link>
<span className="tooltip">Messages</span>
</li>
<li>
<Link to='/setting'>
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

<div className="apply-form">
<h1 className="form-title">Bursary Application Form</h1>
<h2 className="subtitle">Student Details</h2>
<form onSubmit={handleSubmit}>
<div className="main-user-info">
<div className="user-input-box">
<label for="FullName">Full Name</label>
<input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter Full Name"/>
</div>
<div className="user-input-box">
<label for="Email">Email</label>
<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email"/>
</div>
<div className="user-input-box">
<label for="subcounty">Sub county:</label>
<input type="text" id="subcounty" name="subcounty" value={formData.subcounty} onChange={handleChange} placeholder="Enter Sub county"/>
</div>
<div className="user-input-box">
<label for="ward">Ward:</label>
<input type="text" id="ward" name="ward" value={formData.ward} onChange={handleChange} placeholder="Enter ward"/>
</div>
<div className="user-input-box">
<label for="village">village unit:</label>
<input type="text" id="village" name="village" value={formData.village} onChange={handleChange} placeholder="Enter your village"/>
</div>
<div className="user-input-box">
<label for="birth">Date of birth:</label>
<input type="date" id="birth" name="birth" value={formData.birth} onChange={handleChange}/>
</div>
<div className="gender-details-box">
<span className="gender-title">Gender</span>
<div className="gender-category">
<input type="radio" name="gender" id="male" value="Male" onChange={handleChange}/>
<label for="male">Male</label>
<input type="radio" name="gender" id="female" value="Female" onChange={handleChange}/>
<label for="female">Female</label>
</div>
</div>
<div className="user-input-box">
<label for="institution">Name of institution:</label>
<input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} placeholder="Enter institution"/>
</div>
<div className="user-input-box">
<label for="year">Year:</label>
<input type="number" id="year" name="year" value={formData.year} onChange={handleChange} placeholder="Enter year of education"/>
</div>
<div className="user-input-box">
<label for="admission">Admission:</label>
<input type="text" id="admission" name="admission" value={formData.admission} onChange={handleChange} placeholder="Enter Admission"/>
</div>

<div className="forms-submit-btn">
<input type="submit" value="Next"/>
</div>
</div>
</form>
</div>  
    </div>
  )
}

export default Personaldetails
