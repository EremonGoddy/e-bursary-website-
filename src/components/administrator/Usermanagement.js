import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUserManagement.css';
import patient from '../../assets/patient.png';
import { Link } from 'react-router-dom';

const Usermanagement = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [users, setUsers] = useState([]);
const [adminDetails, setAdminDetails] = useState({});
const [activityLogs, setActivityLogs] = useState([]);
const [newUser, setNewUser] = useState({ fullname: '', email: '', role: 'Committee', password: '123' });
  

// Function to toggle sidebar active state
const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
    };

// Fetch users from the backend
useEffect(() => {
const fetchUsers = async () => {
const response = await axios.get('http://localhost:5000/api/users');
setUsers(response.data);
};
fetchUsers();
}, []);
  
// Fetch activity logs from the backend
useEffect(() => {
const fetchLogs = async () => {
const response = await axios.get('http://localhost:5000/api/activity-logs');
setActivityLogs(response.data);
};
fetchLogs();
}, []);
  
// Handle form changes
const handleInputChange = (e) => {
setNewUser({ ...newUser, [e.target.name]: e.target.value });
};
  
// Handle adding a new user (send data to backend)
const handleAddUser = async () => {
await axios.post('http://localhost:5000/api/users', newUser);
setNewUser({ fullname: '', email: '', role: 'Committee' });
// Refresh users and logs
const usersResponse = await axios.get('http://localhost:5000/api/users');
setUsers(usersResponse.data);
const logsResponse = await axios.get('http://localhost:5000/api/activity-logs');
setActivityLogs(logsResponse.data);
};
  
// Handle delete user
const handleDeleteUser = async (userId) => {
await axios.delete(`http://localhost:5000/api/users/${userId}`);
// Refresh users and logs
const usersResponse = await axios.get('http://localhost:5000/api/users');
setUsers(usersResponse.data);
const logsResponse = await axios.get('http://localhost:5000/api/activity-logs');
setActivityLogs(logsResponse.data);
};

// Fetch admin details
axios.get('http://localhost:5000/api/admin-details')
.then(response => {
    setAdminDetails({
        name: response.data.name,
        email: response.data.email,
    });
})
.catch(error => console.error('Error fetching admin details:', error));
  
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
<h2>User Account Management</h2>
<div className="admin-container">
<div className="add-user">
<h3>Add New User</h3>
<input
type="text"
name="fullname"
placeholder="Full Name"
value={newUser.name}
onChange={handleInputChange}
/>
<input
 type="email"
name="email"
placeholder="Email"
value={newUser.email}
onChange={handleInputChange}
/>
<select name="role" value={newUser.role} onChange={handleInputChange}>
<option value="User">Committee</option>
<option value="Admin">Admin</option>
</select>
<input
 type="hidden"
name="password"
placeholder="Password"
value={newUser.password}
onChange={handleInputChange}
/>
<button onClick={handleAddUser}>Add User</button>
</div>

<div className="user-list">
<h3>Existing Users</h3>
<table>
<thead>
<tr>
<th>ID</th>
<th>Full Name</th>
<th>Email</th>
<th>Role</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{users.map((user) => (
<tr key={user.id}>
<td>{user.id}</td>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.role}</td>
<td>
<button onClick={() => handleDeleteUser(user.id)}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>

<div className="activity-logs-container">
<h3>Activity Logs</h3>
<ul>
{activityLogs.map((log, index) => (
<li key={index}>{log.log_message} at {log.log_time}</li>

))}
</ul>
</div>
</div>
</div>
)
}

export default Usermanagement

