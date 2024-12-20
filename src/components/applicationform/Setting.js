
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import './Report.css';
import patient from '../../assets/patient.png';
import {Link,useNavigate } from 'react-router-dom';

const Setting = () => {
const [studentDetails, setStudentDetails] = useState({});
const [sidebarActive, setSidebarActive] = useState(false);
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

const navigate = useNavigate();

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
{message && (
<p
style={{
color: isError ? 'red' : 'green',
marginTop: '10px',
}}
>
{message}
</p>
)}
</div>
</div>
);
};

export default Setting;