import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { FaUser } from 'react-icons/fa'; // Import the user icon from react-icons

const CustomerDetails = ({ customer, onNext, onBack, hasNext, hasPrevious }) => {
  if (!customer) {
    return null; // Don't render anything if no customer is selected
  }

  const formatDate = (dateString) => {
    return moment(dateString).format('MM/DD/YYYY');
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
          <h3 className="mb-0 d-flex align-items-center">
            <FaUser className="me-2" /> {/* Icon added here */}
            Loan Applicant Profile
          </h3>
          <div>
            {/* Back and Next Buttons */}
            <button
              className="btn btn-secondary btn-sm me-2"
              onClick={onBack} // Trigger the onBack callback
            >
              Back to Table
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={onNext}
              disabled={!hasNext}
            >
              Next
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            {/* Left Column */}
            <div className="col-sm-6">
              <div className="row mb-2">
                <div className="col-sm-6 font-weight-bold">Customer ID:</div>
                <div className="col-sm-6">{customer.customer_id}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-6 font-weight-bold">Full Name:</div>
                <div className="col-sm-6">{customer.applicant_name}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-6 font-weight-bold">Telephone Number:</div>
                <div className="col-sm-6">{customer.telephone_number}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-6 font-weight-bold">Credit Officer:</div>
                <div className="col-sm-6">{customer.credit_officer}</div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-sm-6">
              <div className="row mb-2">
                <div className="col-sm-6 font-weight-bold">Date of Birth:</div>
                <div className="col-sm-6">{formatDate(customer.date_of_birth)}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-6 font-weight-bold">Branch:</div>
                <div className="col-sm-6">{customer.branch}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-6 font-weight-bold">Region:</div>
                <div className="col-sm-6">{customer.region}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-6 font-weight-bold">Amount Requested:</div>
                <div className="col-sm-6">{customer.amount_requested}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-muted">
          View more details or take an action on this customer.
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
