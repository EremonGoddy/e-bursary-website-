import React, { useEffect,useState } from 'react';
import axios from 'axios';
import "./Amountdetails.css"
import patient from '../../assets/patient.png';
import {Link,useNavigate } from 'react-router-dom';

const Familydetails = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
const [formData, setFormData] = useState({
family_status: '',
disability: '',
parentname: '',
relationship: '',
contact: '',
occupation: '',
guardian_children: '',
working_siblings: '',
studying_siblings: '',
monthly_income:''
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
const userId = sessionStorage.getItem('userId');  // Retrieve userId
const dataWithUserId = { ...formData, userId };
// Send form data to the backend
axios.post('http://localhost:5000/api/family-details',dataWithUserId )
.then(response => {
alert('Data inserted successfully');
navigate('/Disclosuredetails');
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
  setFormData(response.data); // Populate the form with current data
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
<h2 className="subtitle">Family details</h2>
<form onSubmit={handleSubmit}>
<div className="main-user-info">
<div className="gender-details-box">
<span className="gender-title">Family status</span>
<div className="gender-category">
<input type="radio" name="family_status" id="both_alive" value="Both parents alive" onChange={handleChange} />
<label for="both_alive">Both parents alive</label>
<input type="radio" name="family_status" id="single_parent" value="Single parent"  onChange={handleChange} />
<label for="single_parent">Single parent</label>
<input type="radio" name="family_status" id="orphan"  value="Orphan"  onChange={handleChange} />
<label for="orphan">Orphan</label>
<input type="radio" name="family_status" id="one_deceased" value="One parent deceased" onChange={handleChange} />
<label for="one_deceased">One parent deceased</label>
</div>
</div>
<div className="gender-details-box">
<span className="gender-title">The student has a disability or special education need?</span>
<div className="gender-category">
<input type="radio" name="disability" id="disability_yes" value="Yes" onChange={handleChange} />
<label for="disability_yes">Yes</label>
<input type="radio" name="disability" id="disability_no" value="No" onChange={handleChange} />
<label for="disability_no">No</label>
</div>
</div>
<div className="user-input-box">
<label for="parentname">Parents/guardian name(s):</label>
<input type="text" id="parentname" name="parentname" value={formData.parentname} onChange={handleChange}  placeholder="Enter parents/guardian name"/>
</div>
<div className="user-input-box">
<label for="relationship">Relationship:</label>
<input type="text" id="relationship" name="relationship" value={formData.relationship} onChange={handleChange}  placeholder="Enter relationship"/>
</div>
<div className="user-input-box">
<label for="contact">Contact Information:</label>
<input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange}  placeholder="Enter contact information"/>
</div>
<div className="user-input-box">
<label for="occupation">Occupation:</label>
<input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange}  placeholder="Enter Occupation"/>
</div>
<div className="user-input-box">
<label for="guardian">How many children does the guardian have?:</label>
<input type="text" id="guardian"  name="guardian_children" value={formData.guardian_children} onChange={handleChange}  placeholder="Enter number of children"/>
</div>
<div className="user-input-box">
<label for="working">How many of your siblings are working or in business?:</label>
<input type="text" id="working" name="working_siblings" value={formData.working_siblings} onChange={handleChange}  placeholder="Enter siblings who are working"/>
</div>
<div className="user-input-box">
<label for="siblings">How many of your siblings/guardian children are in secondary school/college/university?:</label>
<input type="text" id="siblings" name="studying_siblings" value={formData.studying_siblings} onChange={handleChange}  placeholder="Enter siblings number"/>
</div>
<div className="user-input-box">
<label for="income">Total Monthly income of the parent/guardian(sum of all sources):</label>
<input type="text" id="income" name="monthly_income" value={formData.monthly_income} onChange={handleChange}  placeholder="Enter parent/guardian income"/>
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

export default Familydetails
