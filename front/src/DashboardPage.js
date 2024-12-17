import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './image/yonko.png';
import CustomerRegistration from './CustomerRegistration';
import CustomerSearch from './CustomerSearch';
import CreateNewApplication from './CreateNewApplication';
import IndividualLoan from './IndividualLoan';
import { FaUserCircle } from 'react-icons/fa';
import { MdAssessment } from 'react-icons/md';
import ChangePassword from './ChangePassword';  // Import the ChangePassword component

// Import React Icons
import {
  FaTachometerAlt,
  FaUser,
  FaSearch,
  FaRegFileAlt,
  FaClipboardList,
  FaCogs,
  FaMoneyCheckAlt, // Loan Repayments
  FaHandHoldingUsd, // Loans Disbursed
  FaWallet, // Cash on Hand
} from 'react-icons/fa';
import Assessment from './Assessment';

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);
  const [isCustomerMenuOpen, setIsCustomerMenuOpen] = useState(false);
  const [isLoanMenuOpen, setIsLoanMenuOpen] = useState(false);
  const [isCreditAssessmentMenuOpen, setIsCreditAssessmentMenuOpen] = useState(false);
  const [isCreditComiteeMenu, setIsCreditComiteeMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); 

  const location = useLocation();
  const navigate = useNavigate(); // Use navigate for redirection
  const username = location.state?.username || localStorage.getItem('username') || 'User';

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem('username'); // Adjust key as needed
    localStorage.removeItem('authToken'); // Optional: if using a token
    navigate('/'); // Redirect to login page
  };

  const toggleDashboardMenu = () => {
    setIsDashboardMenuOpen(!isDashboardMenuOpen);
    setActiveSection('');
    setIsCustomerMenuOpen(false);
    setIsLoanMenuOpen(false);
    setIsCreditAssessmentMenuOpen(false);
  };

  const toggleCustomerMenu = () => {
    setIsCustomerMenuOpen(!isCustomerMenuOpen);
    setActiveSection('');
    setIsDashboardMenuOpen(false);
    setIsLoanMenuOpen(false);
    setIsCreditAssessmentMenuOpen(false);
  };

  const toggleLoanMenu = () => {
    setIsLoanMenuOpen(!isLoanMenuOpen);
    setActiveSection('');
    setIsDashboardMenuOpen(false);
    setIsCreditAssessmentMenuOpen(false);
  };

  const toggleCreditAssessmentMenu = () => {
    setIsCreditAssessmentMenuOpen(!isCreditAssessmentMenuOpen);
    setActiveSection('');
  };

  const toggleCreditComiteeMenu = () => { 
    setIsCreditComiteeMenu(!isCreditComiteeMenu);
    setActiveSection('');
  };

  const handleMenuClick = (section) => {
    console.log('Active Section:', section);
    setActiveSection(section);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle profile menu
  };

  const handleChangePassword = () => {
    // Set the active section to 'Change Password'
    setActiveSection('Change Password');
  };

  return (
    <div className="d-flex">
      {/* Sidebar Menu */}
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo-image" />

        <ul className="list-unstyled">
          <li>
            <a href="#dashboard" className="text-white" onClick={toggleDashboardMenu}>
              <FaTachometerAlt /> Dashboard
            </a>
          </li>
          <li>
            <a href="#customer" className="text-white" onClick={toggleCustomerMenu}>
              <FaUser /> Customer Menu
            </a>
            {isCustomerMenuOpen && (
              <ul className="submenu list-unstyled ms-3">
                <li>
                  <button className="text-white btn btn-link" onClick={() => handleMenuClick('Customer Registration')}>
                    <FaUser /> Customer Registration
                  </button>
                </li>
                <li>
                  <button className="text-white btn btn-link" onClick={() => handleMenuClick('Customer Search')}>
                    <FaSearch /> Customer Search
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="#loan" className="text-white" onClick={toggleLoanMenu}>
              <FaRegFileAlt /> Loan Application
            </a>
            {isLoanMenuOpen && (
              <ul className="submenu list-unstyled ms-3">
                <li>
                  <button className="text-white btn btn-link" onClick={() => handleMenuClick('Online Application')}>
                    <FaRegFileAlt /> Online Application
                  </button>
                </li>
                <li>
                  <button className="text-white btn btn-link" onClick={() => handleMenuClick('Create New Application')}>
                    <FaRegFileAlt /> New Application
                  </button>
                </li>
                <li>
                  <button className="text-white btn btn-link" onClick={toggleCreditAssessmentMenu}>
                    <FaClipboardList /> Credit Assessment
                  </button>
                  {isCreditAssessmentMenuOpen && (
                    <ul className="submenu list-unstyled ms-3">
                      <li>
                        <button className="text-white btn btn-link" onClick={() => handleMenuClick('Individual Loan')}>
                          <FaRegFileAlt /> Individual Loan
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
          <li>
            <a href="#credit" className="text-white" onClick={toggleCreditComiteeMenu}><FaClipboardList /> 
          Credit Committee
          </a>
          {isCreditComiteeMenu && (
              <ul className="submenu list-unstyled ms-3">
                <li>
                  <button className="text-white btn btn-link" onClick={() => handleMenuClick('Assessment Files')}>
                    <MdAssessment /> Assessment Files
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li><a href="#reports" className="text-white"><FaCogs /> Reports</a></li>
          <li><a href="#operation" className="text-white"><FaCogs /> Operational Workflow</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content-area">
        <div className="welcome-section bg-primary text-white p-3 d-flex justify-content-between align-items-center">
          <div className="profile-section" style={{ position: 'relative' }}>
            <div
              className="d-flex align-items-center"
              onClick={toggleProfileMenu} 
              style={{ cursor: 'pointer' }}
              title="Profile Options"
            >
              <FaUserCircle className="profile-icon" size={25} />
              <p className="ml-2 mb-0">{username}!</p>
            </div>

            {/* Profile Menu Dropdown */}
            {isProfileMenuOpen && (
              <div
                className="profile-menu"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  zIndex: 10,
                  minWidth: '150px',
                }}
              >
                <ul className="list-unstyled p-2 mb-0">
                  <li>
                    <button
                      className="btn btn-link text-dark w-100 text-start"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-link text-dark w-100 text-start"
                      onClick={handleChangePassword}
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <p>Yonkopa Micro-Credit Enterprise</p>
          <p>
            {currentTime} | {currentDate}
          </p>
        </div>

        {/* Conditionally Render Components Based on Active Section */}
        <div className="scrollable-content">
          {activeSection === 'Customer Registration' ? (
            <CustomerRegistration />
          ) : activeSection === 'Customer Search' ? (
            <CustomerSearch />
          ) : activeSection === 'Online Application' ? (
            <div className="online-application-message">
              <h3>Hello, Welcome to Online Application</h3>
            </div>
          ) : activeSection === 'Create New Application' ? (
            <CreateNewApplication />
          ) : activeSection === 'Credit Assessment' ? (
            <div>
              <h3>Credit Assessment</h3>
              <p>Details for Credit Assessment...</p>
            </div>
          ) : activeSection === 'Individual Loan' ? (
            <IndividualLoan />
          ) : activeSection === 'Assessment Files' ? (
            <Assessment />
          ) : activeSection === 'Change Password' ? (
            <ChangePassword />
          ) : (
            <div className="centered-content d-flex justify-content-around text-center mt-5">
              <div className="metric-card d-flex flex-column align-items-center p-3">
                <FaMoneyCheckAlt size={30} className="text-primary mb-1" />
                <p className="mb-0" style={{ fontWeight: 'normal' }}>Loan Repayments</p>
              </div>
              <div className="metric-card d-flex flex-column align-items-center p-3">
                <FaHandHoldingUsd size={30} className="text-success mb-1" />
                <p className="mb-0" style={{ fontWeight: 'normal' }}>Cash On Hand</p>
              </div>
              <div className="metric-card d-flex flex-column align-items-center p-3">
                <FaWallet size={30} className="text-warning mb-2" />
                <p className="mb-0" style={{ fontWeight: 'normal' }}>Loans Disbursed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
