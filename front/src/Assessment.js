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
    { key: 'print', label: 'Print' }, // Add print option
  ];

  const getCategoryColumns = (category) => {
    switch (category) {
      case 'bio':
        return ['customerId', 'fullName', 'dateOfBirth', 'telephoneNumber', 'residentialAddress', 'gpsAddress'];
      case 'loan':
        return [
          'amountRequested', 'businessType', 'businessLocation', 'businessStartDate', 'nearestLandmark',
          'businessDescription', 'currentStockValue', 'startedBusinessWith', 'sourceOfFund', 'principal',
          'rate', 'loanTerm', 'loanAmount', 'interest', 'monthlyInstallment', 'monthlySalesRevenue',
          'cashAmount', 'householdSurplus', 'grossMarginInput', 'grossProfit', 'costOfGoodsSold',
          'totalOperatingExpenses', 'netBusinessProfit', 'householdExpenseInput', 'otherIncomeInput',
          'loanReccomendation', 'location', 'landTitle', 'marketValue', 'Itv_ratio', 'Itv_ratio_plus_10',
          'digitalAddress', 'forceSale', 'comment',
        ];
      case 'info':
        return ['guarantorName', 'relationship', 'guarantorResidential', 'guarantorGpsAddress'];
      case 'credit':
        return ['creditOfficer', 'monthlyInstallment', 'grossProfit', 'netBusinessProfit'];
      case 'app':
        return ['comment'];
      default:
        return [];
    }
  };

  const handlePrint = () => {
    const allCategories = ['bio', 'loan', 'info', 'credit', 'app'];
    const combinedData = allCategories.reduce((result, category) => {
      const columns = getCategoryColumns(category);
      result[category] = columns;
      return result;
    }, {});

    // Prepare print window
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Print Customer Data</title>');
    printWindow.document.write(
      '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">'
    );
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1 class="text-center">Customer Data</h1>');

    // Render each category's data
    allCategories.forEach((category) => {
      const columns = combinedData[category];
      printWindow.document.write(`<h3>${menuItems.find((item) => item.key === category)?.label}</h3>`);
      printWindow.document.write('<table class="table table-bordered table-striped">');
      printWindow.document.write('<thead><tr>');

      // Add headers
      columns.forEach((col) => {
        printWindow.document.write(`<th>${col}</th>`);
      });
      printWindow.document.write('</tr></thead><tbody>');

      // Add rows for customers
      customers.forEach((customer) => {
        printWindow.document.write('<tr>');
        columns.forEach((col) => {
          let cellValue = customer[col];
          if (col === 'dateOfBirth' && cellValue) {
            const date = new Date(cellValue);
            cellValue = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          }
          printWindow.document.write(`<td>${cellValue || 'N/A'}</td>`);
        });
        printWindow.document.write('</tr>');
      });

      printWindow.document.write('</tbody></table>');
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
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
                    handlePrint(); // Trigger print when print option is clicked
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
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                      <tr>
                        {getCategoryColumns(selectedCategory).map((col) => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, index) => (
                        <tr key={index}>
                          {getCategoryColumns(selectedCategory).map((col) => {
                            let cellValue = customer[col];
                            if ((col === 'dateOfBirth' || col === 'businessStartDate') && cellValue) {
                              const date = new Date(cellValue);
                              cellValue = date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              });
                            }
                            return <td key={col}>{cellValue || 'N/A'}</td>;
                          })}
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
