import React, { useState } from 'react';
import axios from 'axios';

const Cash = ({ customer }) => {
  const [cashAmount, setCashAmount] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cashData = {
      customer_id: customer.customer_id,
      cash_amount: cashAmount
    };

    try {
      const response = await axios.post('http://localhost:5000/api/cash', cashData);
      console.log(response.data); // Handle success (e.g., show a success message)
    } catch (error) {
      console.error(error); // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="mb-4 row">
      <h5 className="text-primary">Customer ID: {customer.customer_id}</h5>
      <form onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label htmlFor="cashAmount" className="form-label text-primary">Total Value</label>
          <div className="input-group">
            <div className="input-group-text bg-light text-muted">GH¢</div>
            <input
              type="number"
              className="form-control form-control-sm"
              id="cashAmount"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Cash;
