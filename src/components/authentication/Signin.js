import React, { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate } from 'react-router-dom';
import './Signin.css';

const Signin = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState({});
const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(false);
const navigate = useNavigate();

const handleSubmit = (e) => {
e.preventDefault();
const newErrors = {};
if (!email) newErrors.email = '*Please provide an email';
if (!password) newErrors.password = '*Please provide a password';
if (Object.keys(newErrors).length > 0) {
setErrors(newErrors);
return;
}

axios
.post('http://localhost:5000/api/signin', { email, password })
.then((response) => {
const { token, student, role } = response.data;

// Store token and user data based on "Remember me" checkbox
const storage = rememberMe ? localStorage : sessionStorage;
storage.setItem('authToken', token);
storage.setItem('student', JSON.stringify(student)); // Store student details
            
// Redirect based on user role
if (role === 'Student') {
navigate('/student');  // Redirect to student dashboard
} else if (role === 'Admin') {
navigate('/admindashboard');    // Redirect to admin dashboard
}  else if (role === 'Committee') {
navigate('/committeedashboard');    // Redirect to admin dashboard
} 
else {
alert('Role not recognized');    // Handle any other roles
}

})
.catch(err => alert(err.response.data.message));

};


// Toggle password visibility
const togglePasswordVisibility = () => {
setShowPassword((prevState) => !prevState);
};

  
return (
<div className="signin-container">
<h2>Sign in</h2>
<form onSubmit={handleSubmit}>
<div className="input-group">
<label htmlFor="email">Email</label>
<input
type="email"
id="email"
name="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Enter your email"
/>
{errors.email && <p className="error-message">{errors.email}</p>}
</div>

<div className="input-group">
<label htmlFor="password">Password</label>
<input
type={showPassword ? 'text' : 'password'} // Change type based on visibility state
id="password"
name="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Enter your password"
/>
<span className="toggle-password" onClick={togglePasswordVisibility}>
<i className={showPassword ? 'bi bi-eye eye-icon' : 'bi bi-eye-slash eye-icon'} 
alt="Toggle Password Visibility" id="hide-eye"></i>
</span>
{errors.password && <p className="error-message">{errors.password}</p>}
</div>
<div className="input-check">
<input 
type="checkbox"
id="checkbox"
name="checkbox"
checked={rememberMe}
onChange={(e)=> setRememberMe(e.target.checked)}
/> 
<label>Remember me</label>
<Link to="/forgotpassword">
<button type="button" className="forgot-password-link">
Forgot password?
</button>
</Link>
</div>
<div> 
<input type="submit" value="Sign in" />
</div>
<div>
<Link to="/StudentSignup">
<input type="submits" value="Create an Account" />
</Link>
</div>
</form>
</div>
);
};


export default Signin
