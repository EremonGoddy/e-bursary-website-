import React, {useEffect, useState } from 'react';
import "./Amountdetails.css"
import axios from 'axios';
import patient from '../../assets/patient.png';
import {Link,useNavigate } from 'react-router-dom';

const Disclosuredetails = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
const [formData, setFormData] = useState({
bursary: '',
bursarysource: '',
bursaryamount: '',
helb: '',
granted: '',
noreason: '',
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
axios.post('http://localhost:5000/api/disclosure-details',dataWithUserId)
.then(response => {
alert('Data inserted successfully');
navigate('/student');
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
<h2 className="subtitle">Other disclosure</h2>
<form onSubmit={handleSubmit}>
<div className="main-user-info">
<div className="gender-details-box">
<span className="gender-title">Are you currently receiving any other bursaries or scholarship?</span>
<div className="gender-category">
<input type="radio" name="bursary" id="yesBursary" value="yes"  onChange={handleChange}/>
<label for="yesBursary">Yes</label>
<input type="radio" name="bursary" id="noBursary" value="no"  onChange={handleChange}/>
<label for="noBursary">No</label>
</div>
</div><br/>

<div className="user-input-box">
<label for="bursarysource">If yes:state the source:</label>
<input type="text" id="bursarysource" name="bursarysource" value={formData.bursarysource} onChange={handleChange} placeholder="Enter the source"/>
</div>
<div className="user-input-box">
<label for="bursaryamount">state the amount in Ksh:</label>
<input type="text" id="bursaryamount" name="bursaryamount" value={formData.bursaryamount} onChange={handleChange} placeholder="Enter amount Ksh"/>
</div>

<div className="gender-details-box">
<span className="gender-title">If you are a student of the university or tertiary college, 
    have you applied for financial support from HELB?</span>
<div className="gender-category">
<input type="radio" name="helb" id="yesHelb" value="Yes"  onChange={handleChange}/>
<label for="yesHelb">Yes</label>
<input type="radio" name="helb" id="noHelb" value="No" onChange={handleChange}/>
<label for="noHelb">No</label>
</div>
</div><br/>
<div class="user-input-box">
<label for="granted">If yes in above state, the outcome and why you should be granted a bursary under this program:</label>
<textarea type="textarea" id="granted" name="granted" value={formData.granted} onChange={handleChange} placeholder="Enter the reason for grantation"></textarea>
</div>
<div class="user-input-box">
<label for="noreason">If no in above state the reasons:</label>
<textarea type="textarea" id="noreason" name="noreason" value={formData.noreason} onChange={handleChange} placeholder="Enter the reason"></textarea>
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

export default Disclosuredetails
