import React, { useState } from 'react';

function VehicleForm() {
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

  return (
    <div className="container">
      <div className="row">
        {/* Row 1 */}
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
        {/* Row 2 */}
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
        {/* Row 3 */}
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
        {/* Row 4 (Optional) */}
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
    </div>
  );
}

export default VehicleForm;
