import React, {useEffect, useState } from 'react';
import axios from 'axios';
import patient from '../../assets/patient.png';
import "./Amountdetails.css"
import {Link,useNavigate} from 'react-router-dom';

const Documentupload = () => {
// State for form data
const [sidebarActive, setSidebarActive] = useState(false);
const [studentDetails, setStudentDetails] = useState({});
const [formData, setFormData] = useState({
documentName: '',
document: null, // file state for document upload
});


const navigate = useNavigate();
// State to handle file upload status
const [uploadStatus, setUploadStatus] = useState('');

// Handle file change for document input
const handleFileChange = (e) => {
const file = e.target.files[0];
if (file) {
setFormData({
...formData,
documentName: file.name, // set the document name as uploaded
document: file, // storing the uploaded file
});
}
};

// Function to toggle sidebar active state
const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
    };

// Handle form submission
const handleSubmit = (e) => {
e.preventDefault();

// Creating form data object to send file and other data
const formDataToSend = new FormData();
formDataToSend.append('documentName', formData.documentName); // pass the name of the file
formDataToSend.append('document', formData.document); // append file to FormData

// API call to send data to backend
axios.post('http://localhost:5000/api/upload', formDataToSend, {
headers: {
'Content-Type': 'multipart/form-data', // important for file upload
},
})
.then(response => {
setUploadStatus('File uploaded successfully!');
})
.catch(error => {
console.error('Error uploading file:', error);
setUploadStatus('File upload failed!');
});
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
  setFormData(response.data); // Populate the form with current data
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
<div className='documentUpload'>
<h2>Document Upload Form</h2>
<form onSubmit={handleSubmit}>
{/* Display the Document Name */}
<div>
<label>Document Name:</label>
<input
type="text"
value={formData.documentName}
readOnly
/>
</div>

{/* File Upload Input */}
<div>
<label htmlFor="document">Upload Document:</label>
<input
type="file"
id="document"
name="document"
onChange={handleFileChange}
required
/>
</div>

{/* Submit Button */}
<div>
<button type="submit">Submit</button>
</div>

{/* Upload Status */}
{uploadStatus && <p>{uploadStatus}</p>}
</form>    
</div>
</div>
)
}

export default Documentupload
