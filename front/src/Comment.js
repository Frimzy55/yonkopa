import React, { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa'; // Importing a comment icon
import axios from 'axios';

function Comment({ customer, onBack, onNext, hasNext }) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (comment.trim() === '') {
      alert('Please enter a comment before proceeding.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5001/api/comments', {
        customer_id: customer.customer_id, // Assuming `customer` has an `id` property
        comment,
      });
  
      if (response.status === 201) {
        console.log('Comment saved:', response.data);
        onNext(); // Proceed to the next step
      }
    } catch (error) {
      console.error('Error saving comment:', error);
      alert('Failed to save comment. Please try again.');
    }
  };
  

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
        <h5 className="text-primary">Customer ID: {customer.customer_id}</h5> {/* Display customer ID */}
          <h3 className="mb-0">
            <FaRegCommentDots className="me-2" /> General Comments
          </h3>
          <div>
            <button className="btn btn-secondary btn-sm me-2" onClick={onBack}>
              Back to CreditWorth Details 
            </button>
            <button className="btn btn-success btn-sm" onClick={handleSubmit}>
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
            onClick={handleSubmit}
            disabled={!comment.trim()}
          >
            Save and Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
