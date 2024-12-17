import React, { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa'; // Importing a comment icon
import axios from 'axios';

function Comment({ customer, onBack, onNext, hasNext }) {
  const [comment, setComment] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Function to handle comment submission
  const handleSubmit = async (apiEndpoint) => {
    if (comment.trim() === '') {
      alert('Please enter a comment before proceeding.');
      return;
    }

    try {
      const response = await axios.post(apiEndpoint, {
        customer_id: customer.customer_id, // Ensure `customer` is correctly defined and has `customer_id`
        comment,
      });

      console.log('Comment saved:', response.data);
      setSubmitStatus({ success: true, message: 'Comment submitted successfully!' });
      onNext(); // Proceed to the next step
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSubmitStatus({ success: false, message: 'Failed to submit the comment. Please try again later.' });
      alert('Failed to submit comment. Please try again.');
    }
  };

  const handleOkClick = () => {
    setSubmitStatus(null);
  };

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Customer ID: {customer.customer_id}</h5> {/* Display customer ID */}
          <h3 className="mb-0">
            <FaRegCommentDots className="me-2" /> General Comments
          </h3>
          <div>
            <button className="btn btn-secondary btn-sm me-2" onClick={onBack}>
              Back
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleSubmit('http://localhost:5001/api/submit')}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="card-body">
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
          <button
            className="btn btn-primary"
            onClick={() => handleSubmit('http://localhost:5001/api/comments')}
            disabled={!comment.trim()}
          >
            Save and Proceed
          </button>

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
        </div>
      </div>
    </div>
  );
}

export default Comment;
