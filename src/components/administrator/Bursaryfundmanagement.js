import React, { useState, useEffect } from 'react';
import axios from 'axios';
import patient from '../../assets/patient.png';
import { Link,useNavigate } from 'react-router-dom';
import './AdminUserManagement.css';

const Bursaryfundmanagement = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [adminDetails, setAdminDetails] = useState({});
const [amount, setAmount] = useState('');
const navigate = useNavigate();


// Function to toggle sidebar active state
const toggleSidebar = () => {
setSidebarActive(!sidebarActive);
};

useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
    navigate('/signin'); // Redirect if not authenticated
    return;
    }

       // Fetch admin details
       axios.get('http://localhost:5000/api/admin-details')
       .then(response => {
           setAdminDetails({
               name: response.data.name,
               email: response.data.email,
           });
       })
       .catch(error => console.error('Error fetching admin details:', error));
     }, [navigate]);

// Handle form submission
const handleSubmit = async () => {
await axios.post('http://localhost:5000/api/bursary-funds', { amount });
alert('Funds disbursed successfully!');
setAmount('');
};

// Handle adjustment of fund allocation
const handleAdjust = async () => {
try {
await axios.put('http://localhost:5000/api/adjust-funds', { amount });
alert('Funds adjusted successfully!');
setAmount('');
} catch (error) {
console.error('Error adjusting funds:', error);
alert('Error in adjusting funds. Please try again.');
}
};
return (
<div>
{/* Top Bar */}
    <div className="topbaradmin">
<div className="logo">
<h2>EBursary</h2>
</div>
<div className="search">
<input type="text" id="search" placeholder="search here" />
<label htmlFor="search">
<i className="bi bi-search"></i>
</label>
</div>
<h1 className='welcoming'>Welcome:{adminDetails.name}</h1>
<div className="user">
<img src={patient} alt="User" />
</div>
</div>
{/* Sidebar */}
<div className={`sidebaradmin ${sidebarActive ? 'active' : ''}`}>
<div>
<i className="bi bi-list" id="btn" onClick={toggleSidebar}></i>
<ul>
<li>
<Link to='/admindashboard'>
<i className="bi bi-house-door-fill"></i>
<span className="links-name">Dashboard</span>
</Link>
<span className="tooltip">Dashboard</span>
</li>
<li>
<Link to="/usermanagement">
<i class="bi bi-person-fill-gear"></i>
<span className="links-name">User Management</span>
</Link>
<span className="tooltip">User Management</span>
</li>
<li>
<Link to="/bursaryfund">
<i class="bi bi-bank"></i>
<span className="links-name">Bursary Management</span>
</Link>
<span className="tooltip">Bursary Management</span>
</li>
<li>
<Link to="/monitoring">
<i class="bi bi-file-earmark-person"></i>
<span className="links-name">Application Monitoring</span>
</Link>
<span className="tooltip">Application Monitoring</span>
</li>
<li>
<Link to="/adminreport">
<i class="bi bi-bar-chart-fill"></i>
<span className="links-name">Analysis</span>
</Link>
<span className="tooltip">Analysis</span>
</li>
<li>
<Link to='/auditlogs'>
<i class="bi bi-list-check"></i>
<span className="links-name">Audit logs</span>
</Link>
<span className="tooltip">Audit logs</span>
</li>
<li>
<Link to='/adminsetting'>
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
<div className="bursary-funds-input">
<h2>Fund Allocation</h2>
<input 
type="number" 
value={amount}
placeholder="Enter amount disbursed" 
onChange={(e) => setAmount(e.target.value)} 
/>
<button onClick={handleSubmit}>Submit</button>
<br/><br/>
<button onClick={handleAdjust}>Adjust</button>  
</div> 
 
</div>
)
}

export default Bursaryfundmanagement
