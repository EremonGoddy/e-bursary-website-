import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import './Monitoring.css';
import patient from '../../assets/patient.png';

const MonitoringApplication = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [data, setData] = useState([]);
    const [adminDetails, setAdminDetails] = useState({});
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
<div className='table-monitor'>
<h1>Personal Information</h1>
<table>
<thead>
<tr>
<th style={{ textAlign: 'center' }}>Full Name</th>
<th style={{ textAlign: 'center' }}>Email</th>
<th style={{ textAlign: 'center' }}>Sub County</th>
<th style={{ textAlign: 'center' }}>Ward</th>
<th style={{ textAlign: 'center' }}>Village</th>
<th style={{ textAlign: 'center' }}>D.O.B</th>
<th style={{ textAlign: 'center' }}>Gender</th>
<th style={{ textAlign: 'center' }}>Institution</th>
<th style={{ textAlign: 'center' }}>Year</th>
<th style={{ textAlign: 'center' }}>Admission</th>
<th style={{ textAlign: 'center' }}>Status</th>
<th style={{ textAlign: 'center' }}>Bursary</th>
<th style={{ textAlign: 'center' }}>Action</th>
</tr>
</thead>
<tbody>
{data.map((item) => (
<tr key={item.id}>
<td>{item.fullname}</td>
<td>{item.email}</td>
<td>{item.subcounty}</td>
<td>{item.ward}</td>
<td>{item.village}</td>
<td>{item.birth}</td>
<td>{item.gender}</td>
<td>{item.institution}</td>
<td>{item.year}</td>
<td>{item.admission}</td>
<td>{item.status}</td>
<td>{item.bursary}</td>
<td>
<div className='viewButton'>
<Link to={`/PersonalInformation/${item.user_id}`}>
<button>User Details</button>
</Link>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
  )
}

export default MonitoringApplication
