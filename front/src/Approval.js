import React, { useState } from 'react';
import axios from 'axios';

const Approval = ({ customer }) => {
  console.log('Customer Data:', customer); // Debugging line

  const [chairComment, setChairComment] = useState('');
  const [chairApproval, setChairApproval] = useState('');
  const [committeeComment, setCommitteeComment] = useState('');
  const [committeeApproval, setCommitteeApproval] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!customer?.id && !customer?.customer_id) {
      alert('Customer information is missing or incomplete!');
      return;
    }

    const formData = {
      customer_id: customer.id || customer.customer_id, // Adjust key based on your backend
      chair: { comment: chairComment, approval: chairApproval },
      committee: { comment: committeeComment, approval: committeeApproval },
    };

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${API_URL}/submit-approval`, formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('There was an error submitting the form.');
    }

    // Clear form fields
    setChairComment('');
    setChairApproval('');
    setCommitteeComment('');
    setCommitteeApproval('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="container">
      <h3>Approval and Comments for Customer ID: {customer?.id || customer?.customer_id || 'N/A'}</h3>
      <div className="row">
        {/* Chair Person Form */}
        <div className="col-md-6">
          <h4>Chair Person</h4>
          <div className="form-group">
            <label htmlFor="chairApproval">Approval</label>
            <input
              id="chairApproval"
              className="form-control"
              type="text"
              value={chairApproval}
              onChange={(e) => setChairApproval(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="chairComment">Comment</label>
            <textarea
              id="chairComment"
              className="form-control"
              value={chairComment}
              onChange={(e) => setChairComment(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
        </div>

        {/* Committee Form */}
        <div className="col-md-6">
          <h4>Other Committee</h4>
          <div className="form-group">
            <label htmlFor="committeeApproval">Approval</label>
            <input
              id="committeeApproval"
              className="form-control"
              type="text"
              value={committeeApproval}
              onChange={(e) => setCommitteeApproval(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="committeeComment">Comment</label>
            <textarea
              id="committeeComment"
              className="form-control"
              value={committeeComment}
              onChange={(e) => setCommitteeComment(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Approval;
