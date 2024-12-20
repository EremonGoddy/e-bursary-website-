import React, { useState, useEffect } from 'react';
import './Student.css';
import axios from 'axios';
import patient from '../../assets/patient.png';
import { Link,useNavigate } from 'react-router-dom';



const Student = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [studentDetails, setStudentDetails] = useState({});
const [isEditFormVisible, setEditFormVisible] = useState(false); // State for edit form visibility
const [formData, setFormData] = useState({});
const navigate = useNavigate();
  
// Function to toggle sidebar active state
const toggleSidebar = () => {
setSidebarActive(!sidebarActive);
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
  setFormData(response.data); // Populate the form with current data
})
.catch(error => console.error('Error fetching student data:', error));
}
}, [navigate]);
 
const handleEditClick = () => {
  setEditFormVisible(true); // Toggle the form visibility
};

const handleCloseForm= () => {
  setEditFormVisible(false); // Toggle the form visibility
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleFormSubmit = (e) => {
e.preventDefault();
const token = sessionStorage.getItem('authToken');
axios
.put('http://localhost:5000/api/student/update', formData, {
headers: { Authorization: token },
})
.then((response) => {
setStudentDetails(response.data);
setEditFormVisible(false); // Hide the edit form after saving
})
.catch((error) => console.error('Error updating student data:', error));
};

// Check if the studentDetails object is empty
const isStudentRegistered = Object.keys(studentDetails).length > 0;

return (
<div>
{isEditFormVisible && (
<div className="shadow-overlay" onClick={handleCloseForm}></div>
)}
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
 
<div className='main-student' >
 {/* Conditionally render the main-content based on student registration */}
 {isStudentRegistered && (
<div className='main-content' >
<h2>Bursary funds allocate:</h2>
<p>{studentDetails.bursary}</p>
<i class="bi bi-cash"></i>
</div>
 )}
{isStudentRegistered && (
<div className='status-content'>
<h2>Status of the application:</h2>
<p>{studentDetails.status}</p>
<i class="bi bi-check2-all"></i>
</div>
)}
{/* Check if the student has not applied */}
{!isStudentRegistered ? (
<div className='welcome'>
<h2>Welcome, User!</h2>
<p>Please apply for the bursary to get started.</p>
</div>
) : (
<div className='profiles'>
<h2>User Profile</h2>
<div className="line">
<hr/></div>
<div className=" card-header bg-transparent text-centre">
<img className="profile-img" src={patient} alt=''/>
<h5>{studentDetails.fullname}</h5>
<h6>Student</h6>
</div>
<hr/>
<div className="card-body">
<p className="numbers"><strong className="snumber">Student No:</strong> {studentDetails.admission}</p>
<p className="schools"><strong className="mschool">School:</strong> {studentDetails.institution}</p>
</div>
</div>
)}
{/* Personal Information Section */}
{isStudentRegistered && (
<div className='informations'>
<span className="person-icon"><i className="bi bi-person-fill"></i></span>
<h2>Personal Information</h2>
<button onClick={handleEditClick}><i className="bi bi-pencil-square"></i>Update Profile</button>
<div class="icon-line">
<hr/>
</div>
<table className="table">
<tr>
<th>Full name:</th>
<td>{studentDetails.fullname}</td>
</tr>
<tr>
<th>Email:</th>
<td>{studentDetails.email}</td>
</tr>
<tr>
<th>Sub County:</th>
<td>{studentDetails.subcounty}</td>
</tr>
<tr>
<th>Ward:</th>
<td>{studentDetails.ward}</td>
</tr>
<tr>
<th>Village unit:</th>
<td>{studentDetails.village}</td>
</tr>
<tr>
<th>Date of birth:</th>
<td>{studentDetails.birth}</td>
</tr>
<th>Sex:</th>
<td>{studentDetails.gender}</td>
<tr/>
<tr>
<th>Name of institution:</th>
<td>{studentDetails.institution}</td>
</tr>
<tr>
<th>Year:</th>
<td>{studentDetails.year}</td>
</tr>
<tr>
<th>Admission:</th>
<td>{studentDetails.admission}</td>
</tr>
</table>
</div>
)}
 {/* Edit Form */}
 {isEditFormVisible && (
  <div className='updateProfile'>
 <form onSubmit={handleFormSubmit} className="edit-form">
<h2>Edit Profile</h2>
<button className="close-button" onClick={handleCloseForm}>×</button>
<label>
Full Name:
<input
type="text"
name="fullname"
value={formData.fullname || ''}
onChange={handleInputChange}
/>
</label>
<label>
Email:
<input
type="email"
name="email"
value={formData.email || ''}
onChange={handleInputChange}
/>
</label>
<label>
Sub county:
<input
type="subcounty"
name="subcounty"
value={formData.subcounty || ''}
onChange={handleInputChange}
/>
</label>
<label>
Ward:
<input
type="ward"
name="ward"
value={formData.ward || ''}
onChange={handleInputChange}
/>
</label>
<label>
Village Unit:
<input
type="village"
name="village"
value={formData.village || ''}
onChange={handleInputChange}
/>
</label>
<label>
Date of birth:
<input 
type="date" 
name="birth" 
value={formData.birth || ''} 
onChange={handleInputChange}/>
</label>
<label>
Sex:
<input 
type="gender" 
name="gender" 
value={formData.gender || ''} 
onChange={handleInputChange}/>
</label>
<label>
Name of Institution:
<input 
type="institution" 
name="institution" 
value={formData.institution || ''} 
onChange={handleInputChange}/>
</label>
<label>
Year:
<input 
type="year" 
name="year" 
value={formData.year || ''} 
onChange={handleInputChange}/>
</label>
<label>
Admission:
<input 
type="admission" 
name="admission" 
value={formData.admission || ''} 
onChange={handleInputChange}/>
</label>
{/* More Form Fields */}
<button type="submit">Save Changes</button>
</form>
</div>
)}
</div>
</div>
</div>
  );
};

export default Student
