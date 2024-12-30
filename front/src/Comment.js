import React, { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa'; // Importing a comment icon
import axios from 'axios';

function Comment({ customer, onBack, onNext }) {
  const [comment, setComment] = useState('');
  const [recommendedAmount, setRecommendedAmount] = useState(100); // Initial recommended amount
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAmountChange = (e) => {
    setRecommendedAmount(e.target.value); // Update recommended amount
  };

  // Function to handle submission to both APIs
  const handleSubmit = async () => {
    if (comment.trim() === '') {
      alert('Please enter a comment before proceeding.');
      return;
    }

    try {
      // Send data to the first API endpoint
      const response1 = await axios.post('http://localhost:5001/api/submit', {
        customer_id: customer.customer_id,
        comment,
      });
      console.log('First API response:', response1.data);

      // Send data to the second API endpoint
      const response2 = await axios.post('http://localhost:5001/api/comments', {
        customer_id: customer.customer_id,
        comment,
      });
      console.log('Second API response:', response2.data);

      // Set success status
      setSubmitStatus({ success: true, message: 'Data submitted successfully to both APIs!' });

      // Proceed to the next step
      onNext();
    } catch (error) {
      console.error('Error submitting data:', error);
      setSubmitStatus({ success: false, message: 'Failed to submit the data. Please try again.' });
      alert('Failed to submit data. Please try again.');
    }
  };

  const handleOkClick = () => {
    setSubmitStatus(null);
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-white">Customer ID: {customer.customer_id}</h5> {/* Display customer ID */}
          <h3 className="mb-0">
            <FaRegCommentDots className="me-2" /> General Comments
          </h3>
          <button className="btn btn-secondary btn-sm" onClick={onBack}>
            Back
          </button>
        </div>
        <div className="card-body">
          {/* Recommended Amount Input Section */}
          <div className="mb-3">
            <label htmlFor="recommendedAmount" className="form-label">
              Recommended Amount:
            </label>
            <input
              id="recommendedAmount"
              type="number"
              className="form-control"
              value={recommendedAmount}
              onChange={handleAmountChange} // Handle the change of the recommended amount
            />
          </div>

          {/* Comment Section */}
          <div className="mb-3">
            <label htmlFor="commentInput" className="form-label">
              Comment:
            </label>
            <textarea
              id="commentInput"
              className="form-control"
              rows="5"
              placeholder="Enter your comments here..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={!comment.trim()}
            >
              Submit
            </button>
          </div>

          {submitStatus && (
            <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'} mt-3`}>
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
        </div>
      </div>
    </div>
  );
}

export default Comment;
