import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import './LoanDetails.css'; // Import CSS file for styling

const LoanDetails = () => {
  const { customerId } = useParams(); // Get the customer ID from the route
  const [loanDetails, setLoanDetails] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/loan-application/${customerId}`);
        const data = await response.json();
        setLoanDetails(data);
      } catch (error) {
        console.error('Error fetching loan details:', error);
      }
    };

    fetchLoanDetails();
  }, [customerId]);

  if (!loanDetails) {
    return <p>Loading loan details...</p>;
  }

  return (
    <div className="loan-details-container">
      <h3>Loan Details for Customer ID: {customerId}</h3>
      <table className="details-table">
        <tbody>
          <tr>
            <th>Customer ID</th>
            <td>{loanDetails.customer_id}</td>
          </tr>
          <tr>
            <th>Full Name</th>
            <td>{loanDetails.applicant_name}</td>
          </tr>
          <tr>
            <th>Telephone Number</th>
            <td>{loanDetails.telephone_number}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoanDetails;
