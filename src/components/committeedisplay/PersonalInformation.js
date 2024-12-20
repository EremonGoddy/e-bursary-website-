import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import patient from '../../assets/patient.png';
import './personalInformation.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PersonalInformation = () => {
const { id } = useParams(); // Get the user ID from the URL
const [committeeDetails, setCommitteeDetails] = useState({});
const navigate = useNavigate(); // Initialize useNavigate
const [personalData, setPersonalData] = useState([]);
const [amountData, setAmountData] = useState([]);
const [familyData, setFamilyData] = useState([]);
const [disclosureData, setDisclosureData] = useState([]);
const [documentData, setDocumentData] = useState([]);
const [sidebarActive, setSidebarActive] = useState(false);

// Function to toggle sidebar active state
const toggleSidebar = () => {
  setSidebarActive(!sidebarActive);
    };

// Fetch personal data
const loadPersonalData = useCallback(async () => {
try {
const response = await axios.get(`http://localhost:5000/api/personalInformation/${id}`);
setPersonalData(response.data);
} catch (error) {
console.error('Error fetching personal information:', error);
}
}, [id]);

// Fetch amount data
const loadAmountData = useCallback(async () => {
try {
const response = await axios.get(`http://localhost:5000/api/amountInformation/${id}`);
setAmountData(response.data);
} catch (error) {
console.error('Error fetching amount information:', error);
}
}, [id]);

// Fetch family data
const loadFamilyData = useCallback(async () => {
try {
const response = await axios.get(`http://localhost:5000/api/familyInformation/${id}`);
setFamilyData(response.data);
} catch (error) {
console.error('Error fetching family information:', error);
}
}, [id]);

// Fetch disclosure data
const loadDisclosureData = useCallback(async () => {
try {
const response = await axios.get(`http://localhost:5000/api/disclosureInformation/${id}`);
setDisclosureData(response.data);
} catch (error) {
console.error('Error fetching disclosure information:', error);
}
}, [id]);

// Fetch document data
const loadDocumentData = useCallback(async () => {
try {
const response = await axios.get(`http://localhost:5000/api/get-document/${id}`);
setDocumentData(response.data);
} catch (error) {
console.error('Error fetching document information:', error);
}
}, [id]);

useEffect(() => {
loadPersonalData();
loadAmountData();
loadFamilyData();
loadDisclosureData();
loadDocumentData();
}, [loadPersonalData, loadAmountData, loadFamilyData, loadDisclosureData, loadDocumentData]);

// Function to handle approval/rejection
const updateStatus = async (userId, status) => {
try {
await axios.put(`http://localhost:5000/api/update-status/${userId}`, { status });
alert(`Application ${status}`);
// Reload the data to reflect changes
if (status === 'Approved') {
navigate(`/bursaryallocation/${userId}`);
} else {
// Reload data only if the status is 'Rejected'
loadPersonalData();
loadAmountData();
loadFamilyData();
loadDisclosureData();
loadDocumentData();
}
} catch (error) {
console.error('Error updating status:', error);
}
};

// Fetch profile data when component loads
useEffect(() => {
  const token = sessionStorage.getItem('authToken');
  if (!token) {
    navigate('/signin');
    } else {
    axios
    .get('http://localhost:5000/api/profile-committee', {
    headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
    setCommitteeDetails(response.data);
    
    })
    .catch((error) => {
    console.error('Error fetching profile data:', error);
    });
    }
    }, [navigate]);
return (
<div>
{/* Top Bar */}
<div className="topbary">
<div className="logoy">
<h2>EBursary</h2>
</div>
<div className="searchs">
<input type="text" id="search" placeholder="search here" />
<label htmlFor="search">
<i className="bi bi-search"></i>
</label>
</div>
<h1 className='welcoming'>Welcome:{committeeDetails.fullname}</h1>
<div className="usery">
<img src={patient} alt="User" />
</div>
<i class="bi bi-bell-fill"></i>
</div>

{/* Sidebar */}
<div className={`sidebary ${sidebarActive ? 'active' : ''}`}>
<div>
<i className="bi bi-list" id="btn" onClick={toggleSidebar}></i>
<ul>
<li>
<Link to='/committeedashboard'>
<i className="bi bi-house-door-fill"></i>
<span className="links-name">Dashboard</span>
</Link>
<span className="tooltip">Dashboard</span>
</li>
<li>
<Link to="/profile">
<i class="bi bi-person-square"></i>
<span className="links-name">Profile</span>
</Link>
<span className="tooltip">Profile</span>
</li>
<li>
<Link to="/userdetails">
<i className="bi bi-file-earmark-text-fill"></i>
<span className="links-name">Student Information</span>
</Link>
<span className="tooltip">Student Information</span>
</li>
<li>
<Link to="/comreport">
<i class="bi bi-bar-chart-fill"></i>
<span className="links-name">Analysis</span>
</Link>
<span className="tooltip">Analysis</span>
</li>
<li>
<Link to='/settings'>
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
{/* Common Identifier: User's Full Name, Admission Number, and Institution */}
{personalData.length > 0 && (
<div className="common-identifier">
<h1>{personalData[0].fullname}</h1>
<p>Admission Number: {personalData[0].admission}</p>
<p>Institution: {personalData[0].institution}</p>
</div>
)}
<div className="combined-container">
{/* Personal Information Section */}
<div className="ptable-container">
<h2>Personal Information</h2>
{personalData.map((item) => (
<div key={item.user_id} className="data-item">
<span>Email:</span> <p>{item.email}</p>
<span>Sub County:</span> <p>{item.subcounty}</p>
<span>Ward:</span> <p>{item.ward}</p>
<span>Village:</span> <p>{item.village}</p>
<span>Date of Birth:</span> <p>{item.birth}</p>
<span>Gender:</span> <p>{item.gender}</p>
<span>Institution:</span> <p>{item.institution}</p>
<span>Year/Form:</span> <p>{item.year}</p>
<span>Admission:</span> <p>{item.admission}</p>
</div>
))}
</div>
{/* Amount Information Section */}
<div className="ptable-container">
<h2>Amount Information</h2>
{amountData.map((item) => (
<div key={item.user_id} className="data-item">
<span>Payable Amount (Words):</span> <p>{item.payable_words}</p>
<span>Payable Amount (Figures):</span> <p>{item.payable_figures}</p>
<span>Outstanding Amount (Words):</span> <p>{item.outstanding_words}</p>
<span>Outstanding Amount (Figures):</span> <p>{item.outstanding_figures}</p>
<span>School Account Name:</span> <p>{item.school_accountname}</p>
<span>School Account Number:</span> <p>{item.school_accountnumber}</p>
<span>School Branch:</span> <p>{item.school_branch}</p>
</div>
))}
</div>
{/* Family Information Section */}
<div className="ptable-container">
<h2>Family Information</h2>
{familyData.map((item) => (
<div key={item.user_id} className="data-item">
<span>Family Status:</span> <p>{item.family_status}</p>
<span>Disability Issue:</span> <p>{item.disability}</p>
<span>Parent/Guardian Name:</span> <p>{item.parent_guardian_name}</p>
<span>Relationship:</span> <p>{item.relationship}</p>
<span>Contact Information:</span> <p>{item.contact_info}</p>
<span>Occupation:</span> <p>{item.occupation}</p>
<span>Guardian Children:</span> <p>{item.guardian_children}</p>
<span>Working Siblings:</span> <p>{item.working_siblings}</p>
<span>Studying Siblings:</span> <p>{item.studying_siblings}</p>
<span>Monthly Income:</span> <p>{item.monthly_income}</p>
</div>
))}
</div>

</div>
<div className='combined-container'>
 {/* Disclosure Information Section */}
<div className="ptable-container">
<h2>Disclosure Information</h2>
{disclosureData.map((item) => (
<div key={item.user_id} className="data-item">
<span>Bursary Received:</span> <p>{item.receiving_bursary}</p>
<span>Bursary Source:</span> <p>{item.bursary_source}</p>
<span>Bursary Amount:</span> <p>{item.bursary_amount}</p>
<span>Applied HELB:</span> <p>{item.applied_helb}</p>
<span>HELB Outcome:</span> <p>{item.helb_outcome}</p>
<span>Reason for Not Applying HELB:</span> <p>{item.helb_noreason}</p>
</div>
))}
</div>

{/* Other sections like Amount, Family, Disclosure, etc. */}

{/* Document Display Section */}
<div className="ptable-container">
<h2>Uploaded Documents</h2>
{documentData.map((item) => (
<div key={item.user_id} className="data-item">
<span>Document Name:</span> <p>{item.document_name}</p>
<span>File Path:</span> <p>{item.file_path}</p>
<div className="viewButton">
<a
href={`http://localhost:5000/uploads/${item.document_name}`}
target="_blank"
rel="noopener noreferrer"
>
View Document
</a>
</div>
</div>
))}
</div>

{/* Approval and Rejection Buttons */}
<div className="ptable-container">
<div className="approve">
<button onClick={() => updateStatus(id, 'Approved')}>Approve Application</button>
</div>
<div className="reject">
<button onClick={() => updateStatus(id, 'Rejected')}>Reject Application</button>
</div>
</div>   
</div>
</div>
);
};

export default PersonalInformation;