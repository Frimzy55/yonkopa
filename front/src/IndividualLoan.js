import React, { useState, useEffect } from 'react';
import './IndividualLoan.css';
import CustomerDetails from './CustomerDetails';
import CollateralDetails from './CollateralDetails';
import CreditWorthDetail from './CreditWorthDetail';
import Comment from './Comment';
import CreateNewApplication from './CreateNewApplication';  // Import the new submenu component
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './App.css';

const IndividualLoan = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [stage, setStage] = useState('customer'); // Track current stage

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await fetch('http://localhost:5001/loan-application');
        const data = await response.json();
        setLoanApplications(data);
        setFilteredApplications(data);
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      }
    };

    fetchLoanApplications();
  }, []);

  const handleSearch = () => {
    const filtered = loanApplications.filter((application) =>
      ['customer_id', 'applicant_name', 'telephone_number', 'credit_officer', 'created_at', 'amount_requested','residential_location'].some((field) =>
        application[field]
          ? application[field].toString().replace(/[\$,]/g, '').toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    );
    setFilteredApplications(filtered);
  };

  const handleAction = (customerIndex, action) => {
    switch (action) {
      case 'Proceed':
        setSelectedCustomerIndex(customerIndex);
        setStage('customer');
        break;
      case 'Skip Assessment':
        alert(`Skipping assessment for customer ID: ${loanApplications[customerIndex].customer_id}`);
        break;
      case 'Reprocess':
        setSelectedCustomerIndex(customerIndex); // Store the customer index for reprocessing
        setStage('createNewApplication'); // Switch to the create new application stage
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    if (stage === 'customer') {
      setStage('collateral');
    } else if (stage === 'collateral') {
      setStage('creditWorth');
    } else if (stage === 'creditWorth') {
      setStage('comment');
    } else {
      alert('You are at the final stage');
    }
  };

  const handleBack = () => {
    if (stage === 'collateral') {
      setStage('customer');
    } else if (stage === 'creditWorth') {
      setStage('collateral');
    } else if (stage === 'comment') {
      setStage('creditWorth');
    } else if (stage === 'createNewApplication') {
      setStage('customer'); // Return to customer details stage
    } else {
      setSelectedCustomerIndex(null); // Return to table view
      setStage('customer');  // Ensure you're back at the loan list stage
    }
  };

  const handleEntriesChange = (e) => setEntriesPerPage(Number(e.target.value));

  const formatDate = (dateString) => moment(dateString).format('MM/DD/YYYY');

  const displayedApplications = filteredApplications.slice(0, entriesPerPage);

  return (
    <div className="individual-loan-section"  style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
      <h3>Credit Assessment</h3>
      <p>Pending Assessment Credit</p>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by Customer ID, Name, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input form-control"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="main-content">
        {selectedCustomerIndex !== null && stage !== 'createNewApplication' && (
          <>
            {stage === 'customer' && (
              <CustomerDetails
                customer={loanApplications[selectedCustomerIndex]}
                onNext={handleNext}
                onBack={handleBack}
                hasNext={true}
              />
            )}

            {stage === 'collateral' && (
              <CollateralDetails
                customer={loanApplications[selectedCustomerIndex]}
                onNext={handleNext}
                onBack={handleBack}
                hasNext={true}
              />
            )}

            {stage === 'creditWorth' && (
              <CreditWorthDetail
                customer={loanApplications[selectedCustomerIndex]}
                onNext={handleNext}
                onBack={handleBack}
                hasNext={true}
              />
            )}

            {stage === 'comment' && (
              <Comment
                customer={loanApplications[selectedCustomerIndex]}
                onNext={handleNext}
                onBack={handleBack}
                hasNext={false}
              />
            )}
          </>
        )}

        {/* Render CreateNewApplication as a submenu */}
        {stage === 'createNewApplication' && (
          <CreateNewApplication
            customerId={loanApplications[selectedCustomerIndex].customer_id}
            onBack={handleBack}
          />
        )}

        {selectedCustomerIndex === null && stage !== 'createNewApplication' && (
          <div className="loan-table-section">
            <div className="entries-per-page-section mb-3">
              <label htmlFor="entriesPerPage" className="form-label">
                Show
              </label>
              <select
                id="entriesPerPage"
                className="form-select form-select-sm w-auto"
                value={entriesPerPage}
                onChange={handleEntriesChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span> entries</span>
            </div>

            <table className="loan-table">
              <thead>
                <tr>
                  <th className="text-primary">Action</th>
                  <th className="text-primary">Customer ID</th>
                  <th className="text-primary">Applicant Name</th>
                  <th className="text-primary">Contact Number</th>
                  <th className="text-primary">Credit Officer</th>
                  <th className="text-primary">Application Date</th>
                  <th className="text-primary">Loan Amount</th>
                  
                </tr>
              </thead>
              <tbody>
                {displayedApplications.length > 0 ? (
                  displayedApplications.map((application, index) => (
                    <tr key={application.customer_id} className="table-row-hover">
                      <td>
                        <select
                          className="action-dropdown form-control"
                          onChange={(e) => handleAction(index, e.target.value)}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select Action
                          </option>
                          <option value="Proceed">Proceed</option>
                          <option value="Skip Assessment">Skip Assessment</option>
                          <option value="Reprocess">Reprocess</option>
                        </select>
                      </td>
                      <td>{application.customer_id}</td>
                      <td>{application.applicant_name}</td>
                      <td>{application.telephone_number}</td>
                      <td>{application.credit_officer}</td>
                      <td>{formatDate(application.created_at)}</td>
                      <td>{application.amount_requested}</td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualLoan;