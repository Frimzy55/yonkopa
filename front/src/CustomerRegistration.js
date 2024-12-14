import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { useFormik } from "formik";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ImageUploader from './ImageUploader';
import MaterialImageUploader from './MaterialImageUploader';

const CustomerRegistration = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    otherNames: Yup.string().notRequired(),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    telephoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone number is required"),
    placeOfBirth: Yup.string().required("Place of birth is required"),
    maritalStatus: Yup.string().required("Marital Status is required"),
    formId: Yup.string().required("Form of ID is required"),
    idNumber: Yup.string().required("Id number is required"),
    dateOfIssue: Yup.date().required("Date of issue is required"),
    idExpiryDate: Yup.date().required("Expiry date is required"),
    nationality: Yup.string().required("Nationality is required"),
    residentialLocation: Yup.string().required("residential location is required"),
    suburb: Yup.string().notRequired(),
    residentialGpsAddress: Yup.string().required("GPS address is required"),
    alternativeNumber: Yup.string().required("Alternative number is required"),
    employmentStatus: Yup.string().required("Employ Status is required"),
    refereeFirstName: Yup.string().required(" Referee FirstName is required"),
    refereeLastName: Yup.string().required(" Referee LastName is required"),
    refereeHouseLocation: Yup.string().required(" RefereeLocation is required"),
    refereeContact: Yup.string().required(" Referee contact is required"),
    relationshipOfficer: Yup.string().required(" Officer is required"),
  });



  

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      otherNames: "",
      lastName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      gender: "",
      maritalStatus: "",
      formId: "",
      idNumber: "",
      dateOfIssue: "",
      idExpiryDate: "",
      nationality: "",
      telephoneNumber: "",
      residentialLocation: "",
      suburb: "",
      residentialGpsAddress: "",
      alternativeNumber: "",
      employmentStatus: "",
      refereeFirstName: "",
      refereeLastName: "",
      refereeHouseLocation: "",
      refereeContact: "",
      relationshipOfficer: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Send form data to the backend API
        const response = await axios.post('http://localhost:5001/register', values);
        
        // Update submit status
        setSubmitStatus({ success: true, message: 'Form submitted successfully!' });
        
        // Optionally reset form fields
        formik.resetForm();
    
        // Refresh the page
       // window.location.reload();
      } catch (error) {
        // Update submit status on error
        setSubmitStatus({ success: false, message: 'Error submitting form. Please try again.' });
      }
    },
    
  });

  const handleDismissAlert = () => {
    setSubmitStatus(null); // Hide the alert when the OK button is clicked
  };

  return (
    <form onSubmit={formik.handleSubmit} className="container mt-2">

      <h1 className="mb-4">Customer Registration Form</h1>
       {/* Show submit status message */}

        {/* Image Uploader */}
        <div className="row">
        <div className="col-md-12 mb-3">
          <label>Profile Picture</label>
          <MaterialImageUploader />
        </div>
      </div>
      
       

      <div className="row">
      
        {/* Title */}
        <div className="col-md-2 mb-2">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-danger">{formik.errors.title}</div>
          )}
        </div>

        {/* First Name */}
        <div className="col-md-2 mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-danger">{formik.errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div className="col-md-2 mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-danger">{formik.errors.lastName}</div>
          )}
        </div>
        {/* Title */}
        <div className="col-md-2 mb-3">
          <label>
            Other Names(Optional)
          </label>
          <input
            type="text"
            className="form-control"
            name="otherNames"
            value={formik.values.otherNames}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.otherNames && formik.errors.otherNames && (
            <div className="text-danger">{formik.errors.otherNames}</div>
          )}
        </div>
      </div>

      


      <div className="row">
        {/* Date of Birth */}
        <div className="col-md-2 mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <div className="text-danger">{formik.errors.dateOfBirth}</div>
          )}
        </div>

        {/* Gender */}
        <div className="col-md-2 mb-3">
          <label>Gender</label>
          <select
            className="form-control"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-danger">{formik.errors.gender}</div>
          )}
        </div>

        {/* Telephone Number */}
        <div className="col-md-2 mb-3">
          <label>Telephone Number</label>
          <input
            type="tel"
            className="form-control"
            name="telephoneNumber"
            value={formik.values.telephoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.telephoneNumber && formik.errors.telephoneNumber && (
            <div className="text-danger">{formik.errors.telephoneNumber}</div>
          )}
        </div>
      </div>

      <div className="row">
        {/* Place of Birth */}
        <div className="col-md-2 mb-3">
          <label>Place of Birth</label>
          <input
            type="text"
            className="form-control"
            name="placeOfBirth"
            value={formik.values.placeOfBirth}
            onChange={formik.handleChange}
          />
          {formik.touched.placeOfBirth && formik.errors.placeOfBirth && (
            <div className="text-danger">{formik.errors.placeOfBirth}</div>
          )}
        </div>

        {/* Marital Status */}
        <div className="col-md-2 mb-3">
          <label>Marital Status</label>
          <select
            className="form-control"
            name="maritalStatus"
            value={formik.values.maritalStatus}
            onChange={formik.handleChange}
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          {formik.touched.maritalStatus && formik.errors.maritalStatus && (
            <div className="text-danger">{formik.errors.maritalStatus}</div>
          )}
        </div>

        {/* Form ID */}
        <div className="col-md-2 mb-3">
          <label>Form of ID</label>
          <select
            className="form-control"
            name="formId"
            value={formik.values.formId}
            onChange={formik.handleChange}
          >
            <option value="">Ghana card only</option>
            <option value="Ghanacard">Ghana card</option>
            
          </select>
          {formik.touched.formId && formik.errors.formId && (
            <div className="text-danger">{formik.errors.formId}</div>
          )}
        </div>
      </div>

      <div className="row">
        {/* ID Number */}
        <div className="col-md-2 mb-3">
          <label>ID Number</label>
          <input
            type="text"
            className="form-control"
            name="idNumber"
            placeholder="GHA-1234567890"
            value={formik.values.idNumber}
            onChange={formik.handleChange}
          />
          {formik.touched.idNumber && formik.errors.idNumber && (
            <div className="text-danger">{formik.errors.idNumber}</div>
          )}
        </div>

        {/* Date of Issue */}
        <div className="col-md-2 mb-3">
          <label>Date of Issue</label>
          <input
            type="date"
            className="form-control"
            name="dateOfIssue"
            value={formik.values.dateOfIssue}
            onChange={formik.handleChange}
          />
          {formik.touched.dateOfIssue && formik.errors.dateOfIssue && (
            <div className="text-danger">{formik.errors.dateOfIssue}</div>
          )}
        </div>

        {/* ID Expiry Date */}
        <div className="col-md-2 mb-3">
          <label>ID Expiry Date</label>
          <input
            type="date"
            className="form-control"
            name="idExpiryDate"
            value={formik.values.idExpiryDate}
            onChange={formik.handleChange}
          />
          {formik.touched.idExpiryDate && formik.errors.idExpiryDate && (
            <div className="text-danger">{formik.errors.idExpiryDate}</div>
          )}
        </div>
      </div>

      <div className="row">
        {/* Nationality */}
        <div className="col-md-2 mb-3">
          <label>Nationality</label>
          <input
            type="text"
            className="form-control"
            name="nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
          />
          {formik.touched.nationality && formik.errors.nationality && (
            <div className="text-danger">{formik.errors.nationality}</div>
          )}
        </div>

        {/* Residential Location */}
        <div className="col-md-2 mb-3">
          <label>Residential Location</label>
          <input
            type="text"
            className="form-control"
            name="residentialLocation"
            value={formik.values.residentialLocation}
            onChange={formik.handleChange}
          />
          {formik.touched.residentialLocation && formik.errors.residentialLocation && (
            <div className="text-danger">{formik.errors.residentialLocation}</div>
          )}
        </div>

        {/* Suburb */}
        <div className="col-md-2 mb-3">
          <label>Suburb(Optional)</label>
          <input
            type="text"
            className="form-control"
            name="suburb"
            value={formik.values.suburb}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      

      <div className="row">
        {/* Residential GPS Address */}
        <div className="col-md-2 mb-3">
          <label>Residential GPS Address</label>
          <input
            type="text"
            className="form-control"
            name="residentialGpsAddress"
            value={formik.values.residentialGpsAddress}
            onChange={formik.handleChange}
          />
          {formik.touched.residentialGpsAddress && formik.errors.residentialGpsAddress && (
            <div className="text-danger">{formik.errors.residentialGpsAddress}</div>
          )}
        </div>

        {/* Alternative Number */}
        <div className="col-md-2 mb-3">
          <label>Alternative Number</label>
          <input
            type="tel"
            className="form-control"
            name="alternativeNumber"
            value={formik.values.alternativeNumber}
            onChange={formik.handleChange}
          />
          {formik.touched.alternativeNumber && formik.errors.alternativeNumber && (
            <div className="text-danger">{formik.errors.alternativeNumber}</div>
          )}
        </div>

        {/* Employment Status */}
         {/* Marital Status */}
         <div className="col-md-2 mb-3">
          <label>Employment Status</label>
          <select
            className="form-control"
            name="employmentStatus"
            value={formik.values.employmentStatus}
            onChange={formik.handleChange}
          >
             <option value="">Select Employment Status</option>
                    <option value="Self Employed">Self Employed</option>
                    <option value="Civil Servant">Civil Servant</option>
                    <option value="Private Employee">Private Employee</option>
                    <option value="Other">Other</option>
          </select>
          {formik.touched.employmentStatus && formik.errors.employmentStatus && (
            <div className="text-danger">{formik.errors.employmentStatus}</div>
          )}
        </div>
      </div>

      <div className="row">
        {/* Referee First Name */}
        <div className="col-md-2 mb-3">
          <label>Referee First Name</label>
          <input
            type="text"
            className="form-control"
            name="refereeFirstName"
            value={formik.values.refereeFirstName}
            onChange={formik.handleChange}
          />
          {formik.touched.refereeFirstName && formik.errors.refereeFirstName && (
            <div className="text-danger">{formik.errors.refereeFirstName}</div>
          )}
        </div>

        {/* Referee Last Name */}
        <div className="col-md-2 mb-3">
          <label>Referee Last Name</label>
          <input
            type="text"
            className="form-control"
            name="refereeLastName"
            value={formik.values.refereeLastName}
            onChange={formik.handleChange}
          />
          {formik.touched.refereeLastName && formik.errors.refereeLastName && (
            <div className="text-danger">{formik.errors.refereeLastName}</div>
          )}
          
        </div>

        {/* Referee House Location */}
        <div className="col-md-2 mb-3">
          <label>Referee House Location</label>
          <input
            type="text"
            className="form-control"
            name="refereeHouseLocation"
            value={formik.values.refereeHouseLocation}
            onChange={formik.handleChange}
          />
          {formik.touched.refereeHouseLocation && formik.errors.refereeHouseLocation && (
            <div className="text-danger">{formik.errors.refereeHouseLocation}</div>
          )}
        </div>
      </div>

      <div className="row">
        {/* Referee Contact */}
        <div className="col-md-2 mb-3">
          <label>Referee Contact</label>
          <input
            type="tel"
            className="form-control"
            name="refereeContact"
            value={formik.values.refereeContact}
            onChange={formik.handleChange}
          />
          {formik.touched.refereeContact && formik.errors.refereeContact && (
            <div className="text-danger">{formik.errors.refereeContact}</div>
          )}
        </div>

        {/* Relationship Officer */}
        <div className="col-md-2 mb-3">
          <label>Relationship Officer</label>
          <select
            className="form-control"
            name="relationshipOfficer"
            value={formik.values.relationshipOfficer}
            onChange={formik.handleChange}
          >
            <option value="">Relationship Officer</option>
            <option value="one">Officer 1</option>
            <option value="two">Officer 2</option>
            <option value="three">Officer 3</option>
            
          </select>
          {formik.touched.relationshipOfficer && formik.errors.relationshipOfficer && (
            <div className="text-danger">{formik.errors.relationshipOfficer}</div>
          )}
        </div>
      </div>

       {/* Image Uploader */}
       
         
        
      

      {submitStatus && (
        <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
          {submitStatus.message}
          <button
            type="button"
            className="btn btn-sm btn-link float-end"
            onClick={handleDismissAlert}
          >
            OK
          </button>
        </div>
      )}

      {/* Submit Button */}
      <div className="form-group">
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CustomerRegistration;

