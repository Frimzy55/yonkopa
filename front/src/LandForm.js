import React, { useState } from 'react';
import axios from 'axios';

const LandForm = ({ customer }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [location, setLocation] = useState('');
  const [landTitle, setLandTitle] = useState('');
  const [marketValue, setMarketValue] = useState('');
  const [ltvRatio, setLtvRatio] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');
  const [digitalAddress, setDigitalAddress] = useState('');
  const [forcedSaleValue, setForcedSaleValue] = useState('');
  const [ltvRatioPlus10, setLtvRatioPlus10] = useState('');

 

  const handleSave = async () => {
    
    const landData = {
      customer_id: customer.customer_id, // Include customerId in the payload
      location,
      landTitle,
      marketValue,
      ltvRatio,
      nearestLandmark,
      digitalAddress,
      forcedSaleValue,
      ltvRatioPlus10,
    };

    try {
      const response = await axios.post('http://localhost:5001/api/land', landData);
     // alert(response.data.message);
      setSubmitStatus({ success: true, message: 'Form submitted successfully!' });
      // Reset form fields after successful save
      setLocation('');
      setLandTitle('');
      setMarketValue('');
      setLtvRatio('');
      setNearestLandmark('');
      setDigitalAddress('');
      setForcedSaleValue('');
      setLtvRatioPlus10('');
    } catch (error) {
      console.error('Error saving land details:', error);
      setSubmitStatus({ success: false, message: 'Error submitting form. Please try again.' });
     // alert('Failed to save land details. Please try again.');
    }
  };

  const handleOkClick = () => {
    setSubmitStatus(null);
  };

  return (
    <div className="container">
      <h5 className="text-white">Customer ID: {customer.customer_id}</h5> {/* Display customer ID */}
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="location" className="form-label text-primary">Location</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="landTitle" className="form-label text-primary">Land Title</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="landTitle"
            value={landTitle}
            onChange={(e) => setLandTitle(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="marketValue" className="form-label text-primary">Market Value</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="marketValue"
            value={marketValue}
            onChange={(e) => setMarketValue(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <label htmlFor="ltvRatio" className="form-label text-primary">LTV Ratio</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="ltvRatio"
            value={ltvRatio}
            onChange={(e) => setLtvRatio(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="nearestLandmark" className="form-label text-primary">Nearest Landmark</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="nearestLandmark"
            value={nearestLandmark}
            onChange={(e) => setNearestLandmark(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="digitalAddress" className="form-label text-primary">Digital Address</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="digitalAddress"
            value={digitalAddress}
            onChange={(e) => setDigitalAddress(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4">
          <label htmlFor="forcedSaleValue" className="form-label text-primary">Forced Sale Value</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="forcedSaleValue"
            value={forcedSaleValue}
            onChange={(e) => setForcedSaleValue(e.target.value)}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="ltvRatioPlus10" className="form-label text-primary">LTV Ratio (P+10)</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="ltvRatioPlus10"
            value={ltvRatioPlus10}
            onChange={(e) => setLtvRatioPlus10(e.target.value)}
            required
          />
        </div>
      </div>
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
      <button className="btn btn-primary mt-4" onClick={handleSave}>
        Save Land Details
      </button>
    </div>
  );
};

export default LandForm;
