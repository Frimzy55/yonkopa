
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerSearch1 from './CustomerSearch1';
import { useFormik } from "formik";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateNewApplication = () => {

  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const validationSchema=Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    telephoneNumber: Yup.string().required('Telephone Number is required'),
    loanProduct: Yup.string().required('Loan Product is required'),
    creditOfficer: Yup.string().required('Credit Officer is required'),
    loanCycle: Yup.number().required('Loan Cycle is required'),
    amountRequested: Yup.number().required('Amount Requested is required'),
    loanTerm:Yup.string().required('Loan Term required'),
    loanPurpose: Yup.string().required('Loan Purpose is required'),
    loanDuration: Yup.number().required('Loan Duration is required'),
    repaymentCycle: Yup.string().required('Repayment Cycle is required'),
    guarantorName: Yup.string().required('Gurantor name is required'),
    guarantorNationality: Yup.string().required('Gurantor nationaltiy is required'),
    guarantorGender: Yup.string().required('Gurantor gender is required'),
    guarantorDateOfBirth: Yup.date().required('Gurantor date of birth is required'),
    relationshipWithClient: Yup.string().required('relationship with client is required'),
    guarantorLocation: Yup.string().required('residential location  is required'),
    residentialGpsAddress: Yup.string().required('residential address is required'),
    businessType: Yup.string().required('business type  is required'),
    businessLocation: Yup.string().required('business loaction  is required'),
    workingCapital: Yup.number().required('working capital is required'),
    yearsOfOperation: Yup.number().required('years of operation is required'),
    businessGpsAddress: Yup.string().required('business gps address is required'),
    employerName: Yup.string().required('employername is required'),
    yearsInService: Yup.number().required('years in service is required'),
    monthlyNetIncome: Yup.number().required('monthly net salary is required'),
    dateOfBirth: Yup.date().required('date of birth is required'),
    

  });



  const formik = useFormik({
    initialValues: {
      customerId: '',
      firstName: '',
      lastName: '',
      telephoneNumber: '',
      loanProduct: '',
      creditOfficer: '',
      loanCycle: '',
      amountRequested: '',
      loanTerm: '',
      loanPurpose: '',
      loanDuration: '',
      repaymentCycle: '',
      guarantorName: '',
      guarantorNationality: '',
      guarantorGender: '',
      guarantorDateOfBirth: '',
      guarantorPhoto: null,
      relationshipWithClient: '',
      guarantorLocation: '',
      residentialGpsAddress: '',
      businessType: '',
      businessLocation: '',
      workingCapital: '',
      yearsOfOperation: '',
      businessGpsAddress: '',
      employerName: '',
      yearsInService: '',
      monthlyNetIncome: '',
      payslip: null,
      dateOfBirth:'',
      residentialLocation:''
      
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Send form data to the backend API
        const response = await axios.post('http://localhost:5001/loan-application', values);
        
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


  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);

    
    formik.setFieldValue('customerId', customer.customer_id);
    formik.setFieldValue('firstName', customer.first_name);
    formik.setFieldValue('lastName', customer.last_name);
    formik.setFieldValue('telephoneNumber', customer.telephone_number);
    formik.setFieldValue('dateOfBirth', formatDate(customer.date_of_birth));  // Add this line
    formik.setFieldValue('residentialLocation',customer.residential_location);
    formik.setFieldValue('residentialGpsAddress',customer.residential_gps_address);
  };


  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
  };

  
  const handleDismissAlert = () => {
    setSubmitStatus(null); // Hide the alert when the OK button is clicked
  };

  return (
    <div>

       {/* Customer Search Component */}
       <CustomerSearch1 onSelectCustomer={handleSelectCustomer} />

       <form  onSubmit={formik.handleSubmit}>
        <fieldset   disabled={!selectedCustomer}>
          <div className="container">
             <div className="row">
              <div  className="col-md-3">
                <div  className="form-group"> 
                 <label>Customer ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="customerId"
                    value={formik.values.customerId}
                    readOnly
                  />

                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-danger">{formik.errors.firstName}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-danger">{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Telephone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="telephoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.telephoneNumber}
                  />
                  {formik.touched.telephoneNumber && formik.errors.telephoneNumber ? (
                    <div className="text-danger">{formik.errors.telephoneNumber}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className="text-danger">{formik.errors.dateOfBirth}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Customer Residential Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="residentialLocation"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.residentialLocation}
                  />
                  {formik.touched.residentialLocation && formik.errors.residentialLocation ? (
                    <div className="text-danger">{formik.errors.residentialLocation}</div>
                  ) : null}
                </div>
              </div>


              <div className="col-md-3">
                <div className="form-group">
                  <label>Loan Product</label>
                  <select
                    id="loanProduct"
                    className="form-control"
                    name="loanProduct"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.loanProduct}
                  >
                   <option value="" disabled>Select a product</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Plan</option>
                  <option value="group">Group Loan</option>
                  <option value="enterprise">Enterprise Loan</option>
                  <option value="salary_support">Salary Support</option>
                    </select>
                  {formik.touched.loanProduct && formik.errors.loanProduct ? (
                    <div className="text-danger">{formik.errors.loanProduct}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Credit Officer</label>
                  <select
                    id="creditOfficer"
                    className="form-control"
                    name="creditOfficer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.creditOfficer}
                  >
                    <option value="" disabled>Select a officer</option>
                  <option value="personal">officer1</option>
                  <option value="business">officer2</option>
                  <option value="group">officer3</option>
                    </select>
                  {formik.touched.creditOfficer && formik.errors.creditOfficer ? (
                    <div className="text-danger">{formik.errors.creditOfficer}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Loan Cycle</label>
                  <input
                    type="text"
                    className="form-control"
                    name="loanCycle"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.loanCycle}
                  />
                  {formik.touched.loanCycle && formik.errors.loanCycle ? (
                    <div className="text-danger">{formik.errors.loanCycle}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Amount Requested</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amountRequested"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amountRequested}
                  />
                  {formik.touched.amountRequested && formik.errors.amountRequested ? (
                    <div className="text-danger">{formik.errors.amountRequested}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Loan Term</label>
                  <input
                    type="number"
                    className="form-control"
                    name="loanTerm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.loanTerm}
                  />
                  {formik.touched.loanTerm && formik.errors.loanTerm ? (
                    <div className="text-danger">{formik.errors.loanTerm}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Loan Purpose</label>
                  <select
                    id="loanPurpose"
                    className="form-control"
                    name="loanPurpose"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.loanPurpose}
                  >
                  <option value="" disabled>Select a Purpose</option>
                <option value="additional_capital">Additional Capital</option>
                <option value="personal_use">Personal Use</option>
                <option value="assets_acquisition">Assets Acquisition</option>
                <option value="building_project">Building Project</option>
                <option value="others">Others</option>
                </select>
                  {formik.touched.loanPurpose && formik.errors.loanPurpose ? (
                    <div className="text-danger">{formik.errors.loanPurpose}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Loan Duration</label>
                  <input
                    type="number"
                    className="form-control"
                    name="loanDuration"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.loanDuration}
                  />
                  {formik.touched.loanDuration && formik.errors.loanDuration ? (
                    <div className="text-danger">{formik.errors.loanDuration}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Repayment Cycle</label>
                  <input
                    type="text"
                    className="form-control"
                    name="repaymentCycle"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.repaymentCycle}
                  />
                  {formik.touched.repaymentCycle && formik.errors.repaymentCycle ? (
                    <div className="text-danger">{formik.errors.repaymentCycle}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Guarantor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="guarantorName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.guarantorName}
                  />
                  {formik.touched.guarantorName && formik.errors.guarantorName ? (
                    <div className="text-danger">{formik.errors.guarantorName}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Guarantor Nationality</label>
                  <input
                    type="text"
                    className="form-control"
                    name="guarantorNationality"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.guarantorNationality}
                  />
                  {formik.touched.guarantorNationality && formik.errors.guarantorNationality ? (
                    <div className="text-danger">{formik.errors.guarantorNationality}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label> Guarantor Gender</label>
                  <select
                    
                    className="form-control"
                    name="guarantorGender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.guarantorGender}
                  >
                  <option value="" disabled>Select Gender</option>
                  <option value="personal">male</option>
                  <option value="business">female</option>
                  
                    </select>
                  {formik.touched.guarantorGender && formik.errors.guarantorGender ? (
                    <div className="text-danger">{formik.errors.guarantorGender}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Guarantor Date Of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="guarantorDateOfBirth"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.guarantorDateOfBirth}
                  />
                  {formik.touched.guarantorDateOfBirth && formik.errors.guarantorDateOfBirth ? (
                    <div className="text-danger">{formik.errors.guarantorDateOfBirth}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Relationship With Client</label>
                  <input
                    type="text"
                    className="form-control"
                    name="relationshipWithClient"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.relationshipWithClient}
                  />
                  {formik.touched.relationshipWithClient && formik.errors.relationshipWithClient ? (
                    <div className="text-danger">{formik.errors.relationshipWithClient}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Gurantor Residential Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="guarantorLocation"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.guarantorLocation}
                  />
                  {formik.touched.guarantorLocation && formik.errors.guarantorLocation ? (
                    <div className="text-danger">{formik.errors.guarantorLocation}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Residential Gps Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="residentialGpsAddress"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.residentialGpsAddress}
                  />
                  {formik.touched.residentialGpsAddress && formik.errors.residentialGpsAddress ? (
                    <div className="text-danger">{formik.errors.residentialGpsAddress}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Business Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="businessType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessType}
                  />
                  {formik.touched.businessType && formik.errors.businessType ? (
                    <div className="text-danger">{formik.errors.businessType}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label> Business Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="businessLocation"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessLocation}
                  />
                  {formik.touched.businessLocation && formik.errors.businessLocation ? (
                    <div className="text-danger">{formik.errors.businessLocation}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Working Capital</label>
                  <input
                    type="number"
                    className="form-control"
                    name="workingCapital"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.workingCapital}
                  />
                  {formik.touched.workingCapital && formik.errors.workingCapital ? (
                    <div className="text-danger">{formik.errors.workingCapital}</div>
                  ) : null}
                </div>
              </div>

              
              <div className="col-md-3">
                <div className="form-group">
                  <label> Years Of Operation</label>
                  <input
                    type="number"
                    className="form-control"
                    name="yearsOfOperation"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.yearsOfOperation}
                  />
                  {formik.touched.yearsOfOperation && formik.errors.yearsOfOperation ? (
                    <div className="text-danger">{formik.errors.yearsOfOperation}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Business Gps Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="businessGpsAddress"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.businessGpsAddress}
                  />
                  {formik.touched.businessGpsAddress && formik.errors.businessGpsAddress ? (
                    <div className="text-danger">{formik.errors.businessGpsAddress}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label> Employer Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="employerName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.employerName}
                  />
                  {formik.touched.employerName && formik.errors.employerName ? (
                    <div className="text-danger">{formik.errors.employerName}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Years In Service</label>
                  <input
                    type="number"
                    className="form-control"
                    name="yearsInService"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.yearsInService}
                  />
                  {formik.touched.yearsInService && formik.errors.yearsInService ? (
                    <div className="text-danger">{formik.errors.yearsInService}</div>
                  ) : null}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label>Monthly Net Income</label>
                  <input
                    type="number"
                    className="form-control"
                    name="monthlyNetIncome"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.monthlyNetIncome}
                  />
                  {formik.touched.monthlyNetIncome && formik.errors.monthlyNetIncome ? (
                    <div className="text-danger">{formik.errors.monthlyNetIncome}</div>
                  ) : null}
                </div>
              </div>







            </div>
          </div>

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

        </fieldset>
      

       </form>
    </div>
  )
}

export default CreateNewApplication