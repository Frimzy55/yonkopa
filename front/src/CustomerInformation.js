import React, { useState } from 'react';

const CustomerInformation = ({ onChange }) => {
  const [customer, setCustomer] = useState({
    id: '',
    name: '',
    branch: '',
    contactNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
    onChange(customer); // Passing data back to parent
  };

  return (
    <div className="customer-information-form">
      <h3>Customer Information</h3>
      <div className="form-group mt-3">
        <label htmlFor="id">Customer ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={customer.id}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="name">Customer Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={customer.name}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="branch">Customer Branch:</label>
        <input
          type="text"
          id="branch"
          name="branch"
          value={customer.branch}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          value={customer.contactNumber}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>
    </div>
  );
};

export default CustomerInformation;
