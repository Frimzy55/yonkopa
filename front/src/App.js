

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage'; // Import your LoginPage component
import DashboardPage from './DashboardPage'; // The page to navigate after login
import LoanDetails from './LoanDetails'; //
import ApproveFile from './ApproveFile'
import PrivateRoute from './PrivateRoute';
import AdminPage from './AdminPage';
//import ProfilePicture from './ProfilePicture';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<PrivateRoute />}></Route>
        <Route path="/loan-details/:customerId" element={<LoanDetails />} />
        <Route path="/approve-file" element={<ApproveFile />} />
      </Routes>
    </Router>
  );
};


export default App;

