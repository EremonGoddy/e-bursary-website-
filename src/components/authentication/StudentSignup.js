import React, {useState} from 'react'
import "./Signup.css";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";


const initialState = {
name: "",
email: "",
password: "",
confirmPassword: '',
role:"Student",
errors: { name: '', email: '', password: '', confirmPassword: '' } 
};

const StudentSignup = () => {

const [state, setState] = useState(initialState);
const {name, email, password, confirmPassword, role, errors } = state;
const navigate = useNavigate();
const [isTermsAccepted, setIsTermsAccepted] = useState(false); 
const [showPassword, setShowPassword] = useState(false);
    
const handleSubmit = (e) => {
e.preventDefault();
let hasError = false;
    
setState(prev => ({ ...prev, errors: { name: '', email: '', password: '', confirmPassword: '' } }));
    
if (!name) {
hasError = true;
setState(prev => ({ ...prev, errors: { ...prev.errors, name: 'Name is required' } }));
}
if (!email) {
hasError = true;
setState(prev => ({ ...prev, errors: { ...prev.errors, email: 'Email is required' } }));
}
if (!password) {
hasError = true;
setState(prev => ({ ...prev, errors: { ...prev.errors, password: 'Password is required' } }));
}
if (!confirmPassword) {
hasError = true;
setState(prev => ({ ...prev, errors: { ...prev.errors, confirmPassword: 'Confirm Password is required' } }));
}
if (password !== confirmPassword) {
hasError = true;
setState(prev => ({ ...prev, errors: { ...prev.errors, confirmPassword: 'Passwords do not match' } }));
}
    
if (hasError) return; // Stop form submission if there are errors
    
if (!isTermsAccepted) {
hasError = true;
alert('You must accept the terms and conditions.');
return;
}
    
axios.post("http://localhost:5000/api/post",{
name,
email,
password,
role
}).then(() => {
alert("Contact added successfully"); // Use alert for success
setState(initialState); // Reset state on successful submission
navigate('/Signin');
}).catch((err) => alert(err.response.data));
};
    
const handleInputChange = (e) => {
const {name, value } = e.target;
setState(prev => ({ ...prev, [name]: value }));
};
    
const handleCheckboxChange = (e) => {
setIsTermsAccepted(e.target.checked); // Update the checkbox state
};

// Toggle password visibility
const togglePasswordVisibility = () => {
setShowPassword((prevState) => !prevState);
};
return (
<div>
<div className="signup-container">
<h2>Sign Up</h2>
<form onSubmit={handleSubmit}>
<div className="input-group">
<label htmlFor="name">Full Name</label>
<input
type="text"
id="name"
name="name"
value={name}
onChange={handleInputChange}
placeholder="Enter your full name"
/>
{errors.name && <p className="error-message">{errors.name}</p>}
</div>

<div className="input-group">
<label htmlFor="email">Email</label>
<input
type="email"
id="email"
name="email"
value={email}
onChange={handleInputChange}
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
onChange={handleInputChange}
placeholder="Enter your password"
/>
{errors.password && <p className="error-message">{errors.password}</p>}
</div>
<div className="input-group">
<label htmlFor="confirmPassword">Confirm Password</label>
<input
type={showPassword ? 'text' : 'password'} // Change type based on visibility state
id="confirmPassword"
name="confirmPassword"
value={confirmPassword}
onChange={handleInputChange}
placeholder="Confirm your password"
/>
<span className="toggle-password" onClick={togglePasswordVisibility}>
<i className={showPassword ? 'bi bi-eye eye-icon' : 'bi bi-eye-slash eye-icon'} 
alt="Toggle Password Visibility" id="hide-eye"></i>
</span>
{errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}  
</div>

<div className="input-checks">
<input 
type="checkbox" 
id="checkbox" 
name="checkbox" 
checked={isTermsAccepted} 
onChange={handleCheckboxChange} 
/>
<label>I agree with terms and conditions</label>
</div>
<input type="submit" value="Register"/>
<div class="signup">
<input type="hidden" name="role" value="student" />
</div>
</form>
</div>

</div>
)
}

export default StudentSignup
