import React, { useState } from 'react';
import moment from 'moment';

const CustomerSearch1 = ({ onSelectCustomer }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTable, setShowTable] = useState(false); // State to toggle table visibility

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowTable(false); // Reset table visibility

    try {
      const response = await fetch(`http://localhost:5001/search-customers?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Error fetching search results');
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
        setShowTable(true); // Show table if results are found
      } else {
        setError('No customers found');
        setSearchResults([]);
      }
    } catch (err) {
      setError('No customer found.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCustomer = (customer) => {
    try {
      onSelectCustomer(customer);
      //alert('Customer selected successfully');
      setSubmitStatus({ success: true, message: 'Customer selected successfully!' });
    } catch (err) {
      console.error('Error selecting customer:', err);
      setSubmitStatus({ success: false, message: 'Error submitting form. Please try again.' });
      //alert('There was an error processing your selection');
    }
  };

  const formatDate = (dateString) => moment(dateString).format('MM/DD/YYYY');
  const calculateElapsedTime = (dateString) => {
    const now = moment();
    const recordDate = moment(dateString);
    return recordDate.isValid() ? recordDate.fromNow() : 'Unknown';
  };

  const handleOkClick = () => {
    setSubmitStatus(null);
  };

  return (
    <div className="container my-5" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
      <div className="card border-0 shadow-lg">
        <div className="card-header bg-white text-primary">
          <h4 className="mb-0 text-center">Customer Search</h4>
        </div>
        <div className="card-body p-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
                className="form-control"
                placeholder="Enter name or ID to search"
              />
              <button type="submit" className="btn btn-outline-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Search Results */}
          {showTable && (
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="text-primary">Search Results</h5>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => setShowTable(false)}
                >
                  Close
                </button>
              </div>
              <table className="table table-striped table-hover mt-3">
                <thead
                  style={{
                    backgroundColor: '#d0ebff',
                    color: '#212529',
                    textAlign: 'center',
                  }}
                >
                  <tr>
                    <th>#</th>
                    <th>Customer ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contact</th>
                    <th>Date of Birth</th>
                    <th>Elapsed Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((customer, index) => (
                    <tr key={customer.id}>
                      <td>{index + 1}</td>
                      <td>{customer.customer_id || 'N/A'}</td>
                      <td>{customer.first_name || 'N/A'}</td>
                      <td>{customer.last_name || 'N/A'}</td>
                      <td>{customer.telephone_number || 'N/A'}</td>
                      <td>{formatDate(customer.date_of_birth) || 'N/A'}</td>
                      <td>{calculateElapsedTime(customer.updated_at) || 'N/A'}</td>
                      <td>
                        <button
                          onClick={() => handleSelectCustomer(customer)}
                          className="btn btn-success btn-sm"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!showTable && !error && (
            <div className="text-muted text-center">No customers found. Try another search query.</div>
          )}
          {submitStatus && (
        <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
          {submitStatus.message}
          <button
            type="button"
            className="btn btn-sm btn-link float-end"
            onClick={handleOkClick}
          >
            OK
          </button>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSearch1;
