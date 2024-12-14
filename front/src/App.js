

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage'; // Import your LoginPage component
import DashboardPage from './DashboardPage'; // The page to navigate after login
import LoanDetails from './LoanDetails'; //
//import ProfilePicture from './ProfilePicture';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/loan-details/:customerId" element={<LoanDetails />} />
      </Routes>
    </Router>
  );
};


export default App;

