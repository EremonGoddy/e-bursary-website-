import React, { useState } from 'react';
import './Signin.css';

const ForgotPassword = () => {
const [input, setInput] = useState('');
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
setInput(e.target.value);
};

const handleSubmit = async (e) => {
e.preventDefault();

if (!input) {
setMessage('Please enter your email or phone number.');
return;
}

setLoading(true);
setMessage('');

try {
// Replace with your actual API call
const response = await fetch('/api/forgot-password', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ identifier: input }),
});

if (response.ok) {
setMessage('A reset code has been sent to your email or phone.');
} else {
setMessage('Error sending reset code. Please try again.');
}
} catch (error) {
setMessage('An error occurred. Please try again later.');
} finally {
setLoading(false);
}
};

return (
<div className='ForgotVerify'>
<h1>Forgot Password</h1>
<p>Enter your registered email or phone number below, and we'll send you a code to reset your password.</p>
<form onSubmit={handleSubmit}>
<label htmlFor="identifier">
Email or Phone:
</label>
<input
type="text"
id="identifier"
value={input}
onChange={handleChange}
placeholder="Enter your email or phone"
required
/>
<button
type="submit"
disabled={loading}
style={{
backgroundColor: loading ? '#ccc' : '#007BFF',
color: 'white',
padding: '10px 20px',
border: 'none',
fontWeight:'600',
borderRadius: '4px',
cursor: loading ? 'not-allowed' : 'pointer',
}}
>
{loading ? 'Sending...' : 'Send Reset Code'}
</button>
</form>
{message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
</div>
);
};

export default ForgotPassword;
