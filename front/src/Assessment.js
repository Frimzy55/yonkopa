// Assessment.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App1.css';
import { FaUser } from 'react-icons/fa';
import CustomerInfo from './CustomerInfo';
//import Approval from './Approval'; 

const Assessment = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('bio');

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
    { key: 'coll', label: 'Collateral Information' },
    { key: 'app', label: 'Approval and Comment' },
    { key: 'print', label: 'Print' },
  ];

  //const handlePrint = () => {
    // Implement print logic...
// };

const handlePrint = () => {
  const printableContent = document.createElement('div');

  // Add a header to the printable content
  printableContent.innerHTML = '<h2>Customer Assessment Report</h2>';

  menuItems.forEach((item) => {
    printableContent.innerHTML += `<h3>${item.label}</h3>`;

    if (item.key === 'app') {
      // For the Approval component, include its specific content
      printableContent.innerHTML += document.querySelector('.card-body').innerHTML;
    } else if (customers.length > 0) {
      customers.forEach((customer) => {
        printableContent.innerHTML += `<div style="margin-bottom: 20px;">`;

        // Safely check and include fields for each category
        if (item.key === 'bio') {
          printableContent.innerHTML += `<p>Name: ${customer.name || 'N/A'}</p>`;
          printableContent.innerHTML += `<p>Date of Birth: ${customer.dob ? formatDate(customer.dob) : 'N/A'}</p>`;
        } else if (item.key === 'loan') {
          printableContent.innerHTML += `<p>Loan Amount: ${customer.loanAmount || 'N/A'}</p>`;
          printableContent.innerHTML += `<p>Loan Purpose: ${customer.loanPurpose || 'N/A'}</p>`;
        } else if (item.key === 'info') {
          printableContent.innerHTML += `<p>Guarantor Name: ${customer.guarantorName || 'N/A'}</p>`;
          printableContent.innerHTML += `<p>Guarantor Contact: ${customer.guarantorContact || 'N/A'}</p>`;
        } else if (item.key === 'credit') {
          printableContent.innerHTML += `<p>Credit Score: ${customer.creditScore || 'N/A'}</p>`;
          printableContent.innerHTML += `<p>Credit History: ${customer.creditHistory || 'N/A'}</p>`;
        } else if (item.key === 'coll') {
          printableContent.innerHTML += `<p>Collateral Type: ${customer.collateralType || 'N/A'}</p>`;
          printableContent.innerHTML += `<p>Collateral Value: ${customer.collateralValue || 'N/A'}</p>`;
        }

        printableContent.innerHTML += `</div>`;
      });
    } else {
      printableContent.innerHTML += `<p>No data available for ${item.label}.</p>`;
    }
  });

  // Create a printable window and print the content
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write('<html><head><title>Print</title></head><body>');
  printWindow.document.write(printableContent.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
};


 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container-fluid mt-4" style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
      {/* Horizontal Menu */}
      <div className="container-fluid bg-light">
        <ul className="nav nav-pills justify-content-center py-2">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.key}>
              <a
                className={`nav-link ${selectedCategory === item.key ? 'active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.key === 'print') {
                    handlePrint();
                  } else {
                    setSelectedCategory(item.key);
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="row">
        <div className="col-12">
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
            
                customers.map((customer, index) => (
                  <div key={index} className="container my-4">
                    <CustomerInfo selectedCategory={selectedCategory} customer={customer} formatDate={formatDate} />
                    

                  
                  
                    
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
