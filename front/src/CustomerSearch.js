import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle search request
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5001/search-customers?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Error fetching search results');
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
      } else {
        setError('No customers found');
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error fetching customer data:', err);
      setError('No customers found.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      {/* Search Header */}
      <div className="text-center mb-4">
        <h3 className="fw-bold">Customer Search</h3>
        <p className="text-muted">Find customers by name or ID</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="d-flex justify-content-center mb-5">
        <div className="input-group shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm text-light" role="status" />
            ) : (
              <FaSearch />
            )}
          </button>
        </div>
      </form>

      {/* Search Results */}
      <div className="search-results">
        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Results */}
        {searchResults.length > 0 ? (
          <div className="row">
            {searchResults.map((customer, index) => (
              <div key={customer.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">Customer ID: {customer.customer_id}</h5>
                    <p className="card-text">
                      <strong>First Name:</strong> {customer.first_name || 'Not available'} <br />
                      <strong>Last Name:</strong> {customer.last_name || 'Not available'} <br />
                      <strong>Contact:</strong> {customer.telephone_number || 'Not available'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <p className="text-center text-muted">
              No customers found. Try a different search query.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default CustomerSearch;
