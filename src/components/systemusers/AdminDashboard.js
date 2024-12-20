import React, { useState, useEffect } from 'react';
import './Admin.css';
import patient from '../../assets/patient.png';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const AdminDashboard = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [adminDetails, setAdminDetails] = useState({});
const [bursaryAmount, setBursaryAmount] = useState(0);
const [allocatedAmount, setAllocatedAmount] = useState(0);
const [remainingAmount, setRemainingAmount] = useState(0);
const [totalApplications, setTotalApplications] = useState(0);
const [approvedApplications, setApprovedApplications] = useState(0);
const [rejectedApplications, setRejectedApplications] = useState(0);
const [users, setUsers] = useState([]);
const [activityLogs, setActivityLogs] = useState([]);


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
      // Fetch admin details
      axios.get('http://localhost:5000/api/admin-details')
      .then(response => {
          setAdminDetails({
              name: response.data.name,
              email: response.data.email,
          });
      })
      .catch(error => console.error('Error fetching admin details:', error));
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
      

         
    // Handle delete user
    const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/api/users/${userId}`);
    // Refresh users and logs
    const usersResponse = await axios.get('http://localhost:5000/api/users');
    setUsers(usersResponse.data);
    const logsResponse = await axios.get('http://localhost:5000/api/activity-logs');
    setActivityLogs(logsResponse.data);
    };

    const approvedPercentage = totalApplications > 0 ? (approvedApplications / totalApplications) * 100 : 0;
    const rejectedPercentage = totalApplications > 0 ? (rejectedApplications / totalApplications) * 100 : 0;
  
    const chartData = {
      labels: ['Approved', 'Rejected'],
      datasets: [
        {
          data: [approvedPercentage, rejectedPercentage],
          backgroundColor: ['#4CAF50', '#FF5252'],
          hoverBackgroundColor: ['#388E3C', '#D32F2F'],
        },
      ],
    };
  
    const chartOptions = {
      plugins: {
        datalabels: {
          color: '#fff',
          formatter: (value) => `${value.toFixed(2)}%`,
          font: {
            weight: 'bold',
            size: 15,
          },
        },
      },
    };
     
return (
<div>
<div className='container'>
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
<div className='main-wrapperadmin' >
{/* Main Content Container */}
<div className='main-content'>
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
<div className="admin-containers">
<div className="user-list">
<h2>Existing Users</h2>
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
<h2>Activity Logs</h2>
<ul>
{activityLogs.map((log, index) => (
<li key={index}>{log.log_message} at {log.log_time}</li>
))}
</ul>
</div>
<div>
      {/* Content of AdminDashboard */}
      <div className="chart-container">
        <h2>Approval Status</h2>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
</div>

</div>
</div>
</div>
)
}

export default AdminDashboard
