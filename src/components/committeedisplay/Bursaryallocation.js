import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import patient from '../../assets/patient.png';
import './bursary.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Bursaryallocation = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [data, setData] = useState([]);
    const [committeeDetails, setCommitteeDetails] = useState({});
    const [selectedAmount, setSelectedAmount] = useState({});
    const navigate = useNavigate();
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const loadData = useCallback(async () => {
        try {
            const url = id 
                ? `http://localhost:5000/api/get-bursary/${id}`
                : `http://localhost:5000/api/get-bursary`;

            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Function to handle allocation when a radio button is clicked
    const handleAmountChange = async (userId, amount) => {
        setSelectedAmount({ ...selectedAmount, [userId]: amount }); // Track selected amount for each user
        try {
            await axios.put(`http://localhost:5000/api/update-bursary/${userId}`, { bursary: amount });
            alert(`Allocated Ksh ${amount} to the application and updated allocation date.`);
            loadData(); // Refresh data after allocation
        } catch (error) {
            console.error('Error updating bursary:', error);
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

            <div className="allocation-container">
                <h1>Bursary Allocation</h1>
                <div className="card-wrapper">
                    {data.map((item) => (
                        <div key={item.user_id} className="student-card">
                            <div className="student-details">
                                <p><strong>Full Name:</strong> {item.fullname}</p>
                                <p><strong>Admission Number:</strong> {item.admission}</p>
                                <p><strong>Institution:</strong> {item.institution}</p>
                            </div>
                            <div className="bursary-allocation">
                                {[10000, 20000, 30000, 40000, 50000].map((amount) => (
                                    <label key={amount}>
                                        <input
                                            type="radio"
                                            name={`amount-${item.user_id}`}
                                            value={amount}
                                            onChange={() => handleAmountChange(item.user_id, amount)}
                                        />
                                        {amount.toLocaleString()} Ksh
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Bursaryallocation;