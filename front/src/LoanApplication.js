import React, { useState } from 'react';
import CustomerSearch1 from './CustomerSearch1';

const LoanApplication = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!selectedCustomer) {
      setMessage('Please search and select a valid customer first.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/add-loan-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: selectedCustomer.customer_id,
          fullName: `${selectedCustomer.first_name} ${selectedCustomer.last_name}`,
          branch: 'Kumasi', // Default branch
          contactNumber: selectedCustomer.contactNumber, // Assuming contactNumber is available
          applicationDate: new Date().toISOString(),
          loanAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit loan application');
      }

      setMessage('Loan application submitted successfully!');
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error submitting loan application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loan-application">
      <h3>Loan Application</h3>
      <CustomerSearch1 onCustomerValidated={setSelectedCustomer} />
      
      <form onSubmit={handleLoanSubmit} className="mt-4">
        <div className="form-group">
          <label>Loan Amount</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="form-control"
            placeholder="Enter loan amount"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={loading || !selectedCustomer}>
          {loading ? 'Submitting...' : 'Submit Loan Application'}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default LoanApplication;
