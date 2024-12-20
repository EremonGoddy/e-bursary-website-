import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Signin from "./components/authentication/Signin";
import Student from "./components/systemusers/Student";
import Forgotpassword from "./components/authentication/Forgotpassword";
import Personaldetails from "./components/applicationform/Personaldetails";
import Disclosuredetails from "./components/applicationform/Disclosuredetails";
import Amountdetails from "./components/applicationform/Amountdetails";
import Familydetails from "./components/applicationform/Familydetails";
import StudentSignup from "./components/authentication/StudentSignup";
import AdminDashboard from "./components/systemusers/AdminDashboard";
import CommitteeDashboard from "./components/systemusers/CommitteeDashboard";
import PersonalInformation from "./components/committeedisplay/PersonalInformation";
import Documentupload from "./components/applicationform/Documentupload";
import Bursaryallocation from "./components/committeedisplay/Bursaryallocation";
import Usermanagement from "./components/administrator/Usermanagement";
import Bursaryfundmanagement from "./components/administrator/Bursaryfundmanagement";
import Homepages from "./components/homepage/Homepages";
import UserDetails from "./components/committeedisplay/UserDetails";
import Contact from "./components/homepage/Contact";
import About from "./components/homepage/About";
import Service from "./components/homepage/Service";
import Reports from "./components/applicationform/Reports";
import Setting from "./components/applicationform/Setting";
import Profile from "./components/committeedisplay/Profile";
import Settings from "./components/committeedisplay/Settings";
import Comreport from "./components/committeedisplay/Comreport";
import SampleCom from "./components/committeedisplay/SampleCom";
import MonitoringApplication from "./components/administrator/MonitoringApplication";
import AdminReport from "./components/administrator/AdminReport";
import AuditLogs from "./components/administrator/AuditLogs";
import AdminSetting from "./components/administrator/AdminSetting";
import HomeSample from "./components/homepage/HomeSample";




function App() {
  return (
  <Router>
  <div className="App">
  <Routes>
  <Route exact path="/"  element={<Homepages/>}/>
  <Route path="/contact"  element={<Contact/>}/>
  <Route path="/about"  element={<About/>}/>
  <Route path="/service"  element={<Service/>}/>
  <Route path="/StudentSignup"  element={<StudentSignup/>}/>
  <Route path="/Signin" element={<Signin />} />
  <Route path="/student" element={<Student />} />
  <Route path="/forgotpassword" element={<Forgotpassword />} />
  <Route path="/personaldetails" element={<Personaldetails />} />
  <Route path="/Disclosuredetails" element={<Disclosuredetails />} />
  <Route path="/Amountdetails" element={<Amountdetails/>} />
  <Route path="/Familydetails" element={<Familydetails/>} />
  <Route path="/admindashboard" element={<AdminDashboard/>} />
  <Route path="/CommitteeDashboard" element={<CommitteeDashboard/>} />
  <Route path="/userdetails" element={<UserDetails/>} />
  <Route path="/PersonalInformation" element={<PersonalInformation/>} />
  <Route path="/personalInformation/:id" element={<PersonalInformation/>} />
  <Route path="/documentupload" element={<Documentupload/>} />
  <Route path="/bursaryallocation/:id" element={<Bursaryallocation/>}/>
  <Route path="/bursaryallocation" element={<Bursaryallocation/>}/>
  <Route path="/usermanagement" element={<Usermanagement/>}/>
  <Route path="/usermanagement/:id" element={<Usermanagement/>}/>
  <Route path="/bursaryfund" element={<Bursaryfundmanagement/>}/>
  <Route path="/reports" element={<Reports />} />
  <Route path="/setting" element={<Setting />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/comreport" element={<Comreport />} />
  <Route path="/sampling" element={<SampleCom />} />
  <Route path="/monitoring" element={<MonitoringApplication />} />
  <Route path="/adminreport" element={<AdminReport />} />
  <Route path="/auditlogs" element={<AuditLogs />} />
  <Route path="/adminsetting" element={<AdminSetting />} />
  <Route path="/homesample" element={<HomeSample />} />

  </Routes>
  </div>
  </Router>
  );
}

export default App;
