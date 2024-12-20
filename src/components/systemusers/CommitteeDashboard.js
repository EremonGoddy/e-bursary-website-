import React, { useState, useEffect } from 'react';
import './committeedash.css';
import patient from '../../assets/patient.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommitteeDashboard = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [committeeDetails, setCommitteeDetails] = useState({});
const [bursaryAmount, setBursaryAmount] = useState(0);
const [allocatedAmount, setAllocatedAmount] = useState(0);
const [remainingAmount, setRemainingAmount] = useState(0);
const [totalApplications, setTotalApplications] = useState(0);
const [approvedApplications, setApprovedApplications] = useState(0);
const [rejectedApplications, setRejectedApplications] = useState(0);

const [data, setData] = useState([]);
const navigate = useNavigate();
// Function to toggle sidebar active state
const toggleSidebar = () => {
setSidebarActive(!sidebarActive);
};
useEffect(() => {
axios
.get('http://localhost:5000/api/committee-count')  // API call to get the count of rows in personal_details
.then((response) => {
console.log('API Response:', response.data); 
setBursaryAmount(response.data.amount);
// Assume response includes allocated and remaining amounts
setAllocatedAmount(response.data.allocated);
setRemainingAmount(response.data.amount - response.data.allocated);
})
.catch((error) => {
console.error('Error fetching student count:', error);
});

// Fetch the statistics for total, approved, and rejected applications
axios
.get('http://localhost:5000/api/quick-statistics')
.then((response) => {
const { total, approved, rejected } = response.data;
setTotalApplications(total);
setApprovedApplications(approved);
setRejectedApplications(rejected);
})
.catch((error) => {
console.error('Error fetching application statistics:', error);
});

}, []);

  

// Fetch personal information from the API
const loadData = async () => {
try {
const response = await axios.get('http://localhost:5000/api/personalInformation');
setData(response.data); // Set the response data to the state
} catch (error) {
console.error('Error fetching personal information:', error);
}
};

// Call loadData when the component mounts
useEffect(() => {
loadData();
}, []);


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
 
<div className='main-wrappery' >
{/* Main Content Container */}
<div className='main-contenty'>
<h2>Bursary Fund Details</h2>
<div className='statistics-content'>
<div>
<p>Total Funds Available:</p>
<strong>{bursaryAmount}</strong>
</div>
<div>
<p>Amount Allocated to student:</p>
<strong>{allocatedAmount}</strong>
</div>
<div>
<p>Remaining Funds:</p>
<strong>{remainingAmount}</strong>
</div>
</div>
</div>
{/* Quick Statistics Container */}
<div className='quick-statistics'>
<h2>Quick Statistics</h2>
<div className='statistics-content'>
<div className='total'>
<p>Total Applications:</p>
<strong>{totalApplications}</strong>
</div>
<div className='approved'>
<p>Approved Applications:</p>
<strong>{approvedApplications}</strong>
</div>
<div className='rejected'>
<p>Rejected Applications:</p>
<strong>{rejectedApplications}</strong>
</div>
</div>
</div>

<div className='table-containery'>
<h1>Personal Information</h1>
<table>
<thead>
<tr>
<th style={{textAlign: "center"}}>Full Name.</th>
<th style={{textAlign: "center"}}>Email.</th>
<th style={{textAlign: "center"}}>Institution.</th>
<th style={{textAlign: "center"}}>Admission.</th>
<th style={{textAlign: "center"}}>Sub County.</th>
<th style={{ textAlign: 'center' }}>Action</th> {/* New Action Column */}
</tr>
</thead>
<tbody>
{data.map((item) =>{
return(
<tr key={item.id}>
<td>{item.fullname}</td>
<td>{item.email}</td>
<td>{item.institution}</td>
<td>{item.admission}</td>
<td>{item.subcounty}</td>

<td>
{/* Add a button to view all details */}
<div className='viewButton'>
<Link to={`/PersonalInformation/${item.user_id}`}>
<button>User Details</button>
</Link>
</div>
</td>
</tr>
);
})}
</tbody>
</table>
</div> 

</div>
</div>
</div>
  )
}

export default CommitteeDashboard
