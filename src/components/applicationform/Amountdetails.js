import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Amountdetails.css"
import patient from '../../assets/patient.png';
import {Link,useNavigate } from 'react-router-dom';

const Amountdetails = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [studentDetails, setStudentDetails] = useState({});
const [formData, setFormData] = useState({
payablewords: '',
payablefigures: '',
outstandingwords: '',
outstandingfigures: '',
accountname: '',
accountnumber: '',
branch: '',
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
axios.post('http://localhost:5000/api/amount-details',dataWithUserId)
.then(response => {
alert('Data inserted successfully');
navigate('/Familydetails');
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
<div class="apply-form">
<h2 class="subtitle">Amounts Applied</h2>
<form onSubmit={handleSubmit}>
<div class="main-user-info">
<div class="user-input-box">
<label for="payablewords">Total amounts payable in words:</label>
<input type="text" id="payablewords" name="payablewords" value={formData.payablewords} onChange={handleChange}  placeholder="Enter amount payable"/>
</div>
<div class="user-input-box">
<label for="payablefigures">Total amounts payable in figures:</label>
<input type="number" id="payablefigures" name="payablefigures" value={formData.payablefigures} onChange={handleChange}  placeholder="Enter amount payable"/>
</div>
<div class="user-input-box">
<label for="outstandingwords">Outstanding balance in words:</label>
<input type="text" id="outstandingwords" name="outstandingwords" value={formData.outstandingwords} onChange={handleChange}  placeholder="Enter Outstanding balance"/>
</div>
<div class="user-input-box">
<label for="outstandingfigures">Outstanding balance in figures:</label>
<input type="number" id="outstandingfigures" name="outstandingfigures" value={formData.outstandingfigures} onChange={handleChange}  placeholder="Enter Outstanding balance"/>
</div>
<div class="user-input-box">
<label for="accountname">School account name:</label>
<input type="text" id="accountname" name="accountname" value={formData.accountname} onChange={handleChange}  placeholder="Enter School account name"/>
</div>

<div class="user-input-box">
<label for="accountnumber">School account number:</label>
<input type="number" id="accountnumber" name="accountnumber" value={formData.accountnumber} onChange={handleChange}  placeholder="Enter school account number"/>
</div>
<div class="user-input-box">
<label for="branch">Branch:</label>
<input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange}  placeholder="Enter the branch"/>
</div>
<div class="forms-submit-btn">
<input type="submit" value="Next"/>
</div>
</div>
</form>
</div>     
</div>
  )
}

export default Amountdetails
