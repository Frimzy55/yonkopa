import React, { useState } from 'react';
import axios from 'axios';

const VehicleForm = ({ customer }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [vbrand, vsetBrand] = useState('');
  const [vchasiss, vsetChasis] = useState('');
  const [vmodelyeaar, vsetModelyear] = useState('');
  const [vmarket, vsetMarket] = useState('');
  const [vltvRatio, vsetLtvRatio] = useState('');
  const [vmodel, vsetModel] = useState('');
  const [vregister, vsetRegister] = useState('');
  const [vmileage, vsetMileage] = useState('');
  const [vforcedSaleValue, vsetForcedSaleValue] = useState('');
  const [vltvRatioPlus10, vsetLtvRatioPlus10] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicleData = {
      customer_id: customer.customer_id,
      vbrand,
      vchasiss,
      vmodelyeaar,
      vmarket,
      vltvRatio,
      vmodel,
      vregister,
      vmileage,
      vforcedSaleValue,
      vltvRatioPlus10
    };

    try {
      const response = await axios.post('http://localhost:5001/api/vehicle', vehicleData);
      console.log(response.data); 
      setSubmitStatus({ success: true, message: 'Form submitted successfully!' });// You can handle success here
    } catch (error) {
      console.error(error); // Handle error here
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
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="vbrand" className="form-label text-primary">Brand Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="vbrand"
              value={vbrand}
              onChange={(e) => vsetBrand(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="vchasiss" className="form-label text-primary">Chassis Number</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="vchasiss"
              value={vchasiss}
              onChange={(e) => vsetChasis(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="vmodelyeaar" className="form-label text-primary">Model Year</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="vmodelyeaar"
              value={vmodelyeaar}
              onChange={(e) => vsetModelyear(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label htmlFor="vmarket" className="form-label text-primary">Market Value</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="vmarket"
              value={vmarket}
              onChange={(e) => vsetMarket(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="vltvRatio" className="form-label text-primary">LTV Ratio</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="vltvRatio"
              value={vltvRatio}
              onChange={(e) => vsetLtvRatio(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="vmodel" className="form-label text-primary">Model</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="vmodel"
              value={vmodel}
              onChange={(e) => vsetModel(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label htmlFor="vregister" className="form-label text-primary">Registration Number</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="vregister"
              value={vregister}
              onChange={(e) => vsetRegister(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="vmileage" className="form-label text-primary">Mileage (km)</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="vmileage"
              value={vmileage}
              onChange={(e) => vsetMileage(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="vforcedSaleValue" className="form-label text-primary">Forced Sale Value</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="vforcedSaleValue"
              value={vforcedSaleValue}
              onChange={(e) => vsetForcedSaleValue(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label htmlFor="vltvRatioPlus10" className="form-label text-primary">LTV Ratio (P+10)</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="vltvRatioPlus10"
              value={vltvRatioPlus10}
              onChange={(e) => vsetLtvRatioPlus10(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">Save Vehicle Details</button>
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

export default VehicleForm;
