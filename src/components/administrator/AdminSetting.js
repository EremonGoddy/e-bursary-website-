import React, { useState, useEffect } from 'react';
import patient from '../../assets/patient.png';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminSetting = () => {
const [sidebarActive, setSidebarActive] = useState(false);
const [adminDetails, setAdminDetails] = useState({});
const navigate = useNavigate();
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [message, setMessage] = useState('');
const [isError, setIsError] = useState(false);


// State to manage visibility of password fields
const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        const handleChangePassword = async (e) => {
            e.preventDefault();
            setMessage('');
            setIsError(false);
            
            if (newPassword !== confirmPassword) {
            setMessage('New password and confirmation do not match');
            setIsError(true);
            return;
            }
            
            const token = sessionStorage.getItem('authToken');
            if (!token) {
            setMessage('No authentication token found');
            setIsError(true);
            return;
            }
            
            try {
            // Verify current password first
            const verifyResponse = await axios.get('http://localhost:5000/api/verify-password', {
            headers: { Authorization: `Bearer ${token}` }, // Ensure token is passed correctly
            params: { password: currentPassword },
            });
            
            if (verifyResponse.status === 200) {
            // If current password is verified, proceed to change password
            const response = await axios.post(
            'http://localhost:5000/api/change-password',
            { currentPassword, newPassword },
            {
            headers: { Authorization: `Bearer ${token}` }, // Ensure token is passed correctly
            }
            );
            setMessage(response.data.message);
            setIsError(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            }
            } catch (error) {
            const errorMessage = error.response?.data || 'Error updating password';
            setMessage(errorMessage);
            setIsError(true);
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
{/* Settings Section */}
<div className="setting">
<h2>Change Password</h2>
<form onSubmit={handleChangePassword}>
<div className="input-setting">
<label>Current Password</label>
<div className="password-input">
<input
type={showCurrentPassword ? 'text' : 'password'}
value={currentPassword}
onChange={(e) => setCurrentPassword(e.target.value)}
required
/>
<span
className="toggle-password-setting"
onClick={() => setShowCurrentPassword(!showCurrentPassword)}
>
<i
className={
showCurrentPassword
? 'bi bi-eye eye-icon'
: 'bi bi-eye-slash eye-icon'
}
alt="Toggle Password Visibility"
></i>
</span>
</div>
</div>

<div className="input-setting">
<label>New Password</label>
<div className="password-input">
<input
type={showNewPassword ? 'text' : 'password'}
value={newPassword}
onChange={(e) => setNewPassword(e.target.value)}
required
/>
<span
className="toggle-password-setting"
onClick={() => setShowNewPassword(!showNewPassword)}
>
<i
className={
showNewPassword
? 'bi bi-eye eye-icon'
: 'bi bi-eye-slash eye-icon'
}
alt="Toggle Password Visibility"
></i>
</span>
</div>
</div>
<div className="input-setting">
<label>Confirm New Password</label>
<div className="password-input">
<input
type={showConfirmPassword ? 'text' : 'password'}
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)}
required
/>
<span
className="toggle-password-setting"
onClick={() => setShowConfirmPassword(!showConfirmPassword)}
>
<i
className={
showConfirmPassword
? 'bi bi-eye eye-icon'
: 'bi bi-eye-slash eye-icon'
}
alt="Toggle Password Visibility"
></i>
</span>
</div>
</div>
<button type="submit">Update Password</button>
</form>

{/* Message handling */}
{message && (
<p
style={{
color: isError ? 'red' : 'green',
marginTop: '10px',
}}
>
{typeof message === 'object' ? JSON.stringify(message) : message}
</p>
)}
</div>     
</div>
)
}

export default AdminSetting
