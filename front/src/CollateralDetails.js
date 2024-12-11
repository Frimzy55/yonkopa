import React, { useState } from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa'; // Import the icon
import LandForm from './LandForm'; // Import the LandForm component
import BuildForm from './BuildForm';
import VehicleForm from './VehicleForm';
import Cash from './Cash';

const CollateralDetails = ({ customer, onBack, onNext, hasNext }) => {
  const [lendingType, setLendingType] = useState('unsecure'); // State to track lending type
  const [securityType, setSecurityType] = useState(''); // State to track security type

  // State variables for the "Cash/Fixed Deposit" fields
  const [cashAmount, setCashAmount] = useState('');

  // Handle the change in lending type (secure or unsecure)
  const handleLendingTypeChange = (event) => {
    setLendingType(event.target.value);
  };

  // Handle the change in security type (to conditionally show the fields for "Land" or "Cash/Fixed Deposit")
  const handleSecurityTypeChange = (event) => {
    setSecurityType(event.target.value);
  };

  return (
    <div className="container my-4">
      <div className="card shadow-lg rounded">
        <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
          <h3 className="mb-0">
            <FaMoneyCheckAlt className="me-2" /> Collateral Details
          </h3>
          <div>
            <button className="btn btn-secondary btn-sm me-2" onClick={onBack}>Back to Customer Profile</button>
            <button className="btn btn-success btn-sm" onClick={onNext} disabled={!hasNext}>Next</button>
          </div>
        </div>
        <div className="card-body">
          <div className="mb-4">
         
            <h5 className="text-primary">Lending Type</h5>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="secureLending"
                value="secure"
                checked={lendingType === 'secure'}
                onChange={handleLendingTypeChange}
              />
              <label className="form-check-label" htmlFor="secureLending">
                Secure Lending
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="unsecureLending"
                value="unsecure"
                checked={lendingType === 'unsecure'}
                onChange={handleLendingTypeChange}
              />
              <label className="form-check-label" htmlFor="unsecureLending">
                Unsecure Lending
              </label>
            </div>
          </div>

          {lendingType === 'secure' && (
            <>
              <div className="mb-4 row">
                <div className="col-md-6">
                  <label htmlFor="securityType" className="form-label text-primary">Type of Security</label>
                  <select
                    className="form-select form-select-sm"
                    id="securityType"
                    value={securityType}
                    onChange={handleSecurityTypeChange}
                    required
                  >
                    <option value="">Select Security Type</option>
                    <option value="Property">Land</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Shares">Building</option>
                    <option value="Gold">Cash/Fixed Deposit</option>
                  </select>
                </div>
              </div>

              {securityType === 'Property' && <LandForm customer={customer} />}
              {securityType === 'Shares' && <BuildForm customer={customer} />}
              {securityType === 'Vehicle' && <VehicleForm customer={customer} />}
              {securityType === 'Gold' && <Cash customer={customer} />}

          
            </>
          )}
        </div>
        <div className="card-footer text-muted">
          View more details or take an action on this customer.
        </div>
      </div>
    </div>
  );
};

export default CollateralDetails;
