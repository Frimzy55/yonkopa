import React, { useState, useEffect } from 'react';

const Assessment = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state

  // Fetch customer data from an external API or source
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('https://api.example.com/customers'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched customer data:', data); // Log data to check if it was fetched correctly
        setCustomers(data); // Set the fetched data into state
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCustomerData();
  }, []); // Empty dependency array means this will run once when the component mounts

  console.log('Customers state:', customers); // Log the customers state to check if data is set

  return (
    <div className="container mt-4" style={{ transform: 'scale(0.6)', transformOrigin: 'top center' }}>
      <h3>Customer Assessment</h3>
      {/* If loading, show loading message */}
      {loading ? (
        <div className="alert alert-info">Loading customer data...</div>
      ) : (
        <>
          {/* Table always visible */}
          <div className="table-responsive">
            <table className="table table-bordered table-striped mt-4">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Telephone Number</th>
                </tr>
              </thead>
              <tbody>
                {/* Check if there is customer data */}
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No customer data available
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.customerId}>
                      <td>{customer.customerId}</td>
                      <td>{customer.firstName}</td>
                      <td>{customer.lastName}</td>
                      <td>{customer.dateOfBirth}</td>
                      <td>{customer.telephoneNumber}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Assessment;
