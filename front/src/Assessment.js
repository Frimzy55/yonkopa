import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App1.css';

const Assessment = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('bio'); // Default to 'bio'

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const menuItems = [
    { key: 'bio', label: 'Bio Information' },
    { key: 'loan', label: 'Loan Information' },
    { key: 'info', label: 'Guarantor Information' },
    { key: 'credit', label: 'Credit Assessment' },
    { key: 'app', label: 'Approval and Comment' },
  ];

  const getCategoryColumns = () => {
    switch (selectedCategory) {
      case 'bio':
        return ['customerId', 'fullName', 'dateOfBirth', 'telephoneNumber', 'residentialAddress'];
      case 'loan':
        return ['businessStartDate','nearestLandMark', 'businessDescription','currentStockValue', 'startedBusinessWith', 'sourcefund', 'principal','rate','loanTerm','loanAmount','interest'];
      case 'info':
        return ['guarantorName', 'relationship', 'guarantorTelephone', 'guarantorAddress'];
      case 'credit':
        return ['creditOfficer', 'monthlyInstallment', 'grossProfit', 'netBusinessProfit'];
      case 'app':
        return ['comment'];
      default:
        return [];
    }
  };

  const filteredColumns = getCategoryColumns();

  return (
    <div className="container-fluid mt-4" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-header bg-white text-primary">
              <h5 className="mb-0">Menu</h5>
            </div>
            <ul className="list-group list-group-flush">
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  className={`list-group-item ${selectedCategory === item.key ? 'active text-white bg-secondary' : ''} 
                              ${selectedCategory !== item.key ? 'list-group-item-action' : ''}`}
                  onClick={() => setSelectedCategory(item.key)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card">
            <div className="card-header bg-white text-primary">
              <h5 className="mb-0">{menuItems.find((item) => item.key === selectedCategory)?.label}</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="alert alert-info text-center">Loading customer data...</div>
              ) : customers.length === 0 ? (
                <div className="alert alert-warning text-center">No customer data available</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                      <tr>
                        {filteredColumns.map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, index) => (
                        <tr key={index} className="table-row-hover">
                          {filteredColumns.map((col) => (
                            <td key={col}>{customer[col]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
