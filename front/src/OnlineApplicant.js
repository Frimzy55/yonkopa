import React, { useEffect, useState } from 'react';
import moment from 'moment';

const OnlineApplicant = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/online');
        if (response.ok) {
          const data = await response.json();
          setApplicants(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => moment(dateString).format('MM/DD/YYYY');

  const handleViewClick = (applicant) => {
    setSelectedApplicant(applicant);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplicant(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <h2 className="text-center mb-4" style={{ fontWeight: '600', fontSize: '32px', color: '#FF7043' }}>
        Online Applicants
      </h2>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="bg-light">
            <tr>
              <th style={{ color: '#FF7043', fontWeight: 'bold' }}>FIRST NAME</th>
              <th style={{ color: '#FF7043', fontWeight: 'bold' }}>SURNAME</th>
              <th style={{ color: '#FF7043', fontWeight: 'bold' }}>GENDER</th>
              <th style={{ color: '#FF7043', fontWeight: 'bold' }}>DATE OF BIRTH</th>
              <th style={{ color: '#FF7043', fontWeight: 'bold' }}>PLACE OF BIRTH</th>
              <th style={{ color: '#FF7043', fontWeight: 'bold' }}>TELEPHONE</th>
              <th style={{ color: '#FF7043', fontWeight: 'bold' }}>MARITAL STATUS</th>
              <th style={{ color: '#FF7043', fontWeight: 'bold' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant) => (
              <tr key={applicant.id}>
                <td>{applicant.firstName}</td>
                <td>{applicant.surname}</td>
                <td>{applicant.gender}</td>
                <td>{formatDate(applicant.dateOfBirth)}</td>
                <td>{applicant.placeOfBirth}</td>
                <td>{applicant.telephone}</td>
                <td>{applicant.maritalStatus}</td>
                <td>
                  <button className="btn btn-outline-primary" onClick={() => handleViewClick(applicant)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying applicant details */}
      {showModal && selectedApplicant && (
        <div className="modal show" style={{ display: 'block', zIndex: 1050 }}>
          <div className="modal-dialog">
            <div className="modal-content" style={{ borderRadius: '10px' }}>
              <div className="modal-header">
                <h5 className="modal-title">Applicant Details</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>First Name:</strong> {selectedApplicant.firstName}</p>
                <p><strong>Surname:</strong> {selectedApplicant.surname}</p>
                <p><strong>Gender:</strong> {selectedApplicant.gender}</p>
                <p><strong>Date of Birth:</strong> {formatDate(selectedApplicant.dateOfBirth)}</p>
                <p><strong>Place of Birth:</strong> {selectedApplicant.placeOfBirth}</p>
                <p><strong>Telephone:</strong> {selectedApplicant.telephone}</p>
                <p><strong>Marital Status:</strong> {selectedApplicant.maritalStatus}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineApplicant;
