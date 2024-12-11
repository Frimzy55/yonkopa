import React, { useState } from 'react';
import axios from 'axios';

const BuildForm = ({ customer }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [blocation, bsetLocation] = useState('');
  const [blandTitle, bsetLandTitle] = useState('');
  const [bmarketValue, bsetMarketValue] = useState('');
  const [bltvRatio, bsetLtvRatio] = useState('');
  const [bnearestLandmark, bsetNearestLandmark] = useState('');
  const [bdigitalAddress, bsetDigitalAddress] = useState('');
  const [bforcedSaleValue, bsetForcedSaleValue] = useState('');
  const [bltvRatioPlus10, bsetLtvRatioPlus10] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const buildData = {
      customer_id: customer.customer_id,
      blocation,
      blandTitle,
      bmarketValue,
      bltvRatio,
      bnearestLandmark,
      bdigitalAddress,
      bforcedSaleValue,
      bltvRatioPlus10
    };

    try {
      const response = await axios.post('http://localhost:5001/api/build', buildData);
      console.log(response.data); // Handle success, e.g., show a success message
      setSubmitStatus({ success: true, message: 'Form submitted successfully!' });
    } catch (error) {
      console.error(error); // Handle error
      setSubmitStatus({ danger: false, message: 'Error submitting form. Please try again.' });
    }
  };


  const handleOkClick = () => {
    setSubmitStatus(null);
  };

  return (
    <div className="container">
      <h5 className="text-white">Customer ID: {customer.customer_id}</h5>
      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="location" className="form-label text-primary">Location</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="location"
              value={blocation}
              onChange={(e) => bsetLocation(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="landTitle" className="form-label text-primary">Land Title</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="landTitle"
              value={blandTitle}
              onChange={(e) => bsetLandTitle(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="marketValue" className="form-label text-primary">Market Value</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="marketValue"
              value={bmarketValue}
              onChange={(e) => bsetMarketValue(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="ltvRatio" className="form-label text-primary">LTV Ratio</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="ltvRatio"
              value={bltvRatio}
              onChange={(e) => bsetLtvRatio(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="nearestLandmark" className="form-label text-primary">Nearest Landmark</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="nearestLandmark"
              value={bnearestLandmark}
              onChange={(e) => bsetNearestLandmark(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="digitalAddress" className="form-label text-primary">Digital Address</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="digitalAddress"
              value={bdigitalAddress}
              onChange={(e) => bsetDigitalAddress(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="forcedSaleValue" className="form-label text-primary">Forced Sale Value</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="forcedSaleValue"
              value={bforcedSaleValue}
              onChange={(e) => bsetForcedSaleValue(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="ltvRatioPlus10" className="form-label text-primary">LTV Ratio (P+10)</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="ltvRatioPlus10"
              value={bltvRatioPlus10}
              onChange={(e) => bsetLtvRatioPlus10(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">Submit</button>
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
      </form>
    </div>
  );
};

export default BuildForm;
