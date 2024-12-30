import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import { IconButton,TextField, Grid, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button, InputAdornment } from '@mui/material';
//import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import { PhotoCamera } from '@mui/icons-material';


import { useFormik } from "formik";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ImageUploader from './ImageUploader';
import MaterialImageUploader from './MaterialImageUploader';

const CustomerRegistration = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [totalRegistrants, setTotalRegistrants] = useState(null); 
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
    //idNumber: Yup.string().required("Id number is required"),
    formId: Yup.string().required("Form of ID is required"),
    idNumber: Yup.string()
    .required("Id number is required")
    .test('unique-id', 'This ID number is already in use', async (value) => {
      if (value) {
        try {
          // Send the ID number to your backend for validation
          const response = await axios.post('http://localhost:5001/check-id-number', { idNumber: value });
          return response.data.isUnique; // Assuming the backend returns { isUnique: true/false }
        } catch (error) {
          console.error('Error checking ID number:', error);
          return false;
        }
      }
      return true;
    }),
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
    //profilePicture: Yup.mixed().required("Profile picture is required"),

    fathersName: Yup.string().notRequired(),
    mothersName: Yup.string().notRequired(),
    spouseOccupation: Yup.string().notRequired(),
    fathersContact: Yup.string().notRequired(),
    mothersContact: Yup.string().notRequired(),
    religion: Yup.string().notRequired(),
    spouseName:Yup.string().notRequired(),
    spouseContact:Yup.string().notRequired(),
    numberOfDependants:Yup.string().notRequired(),
    numberOfDependantsSchooling:Yup.string().notRequired(),
    

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

      fathersName:"",
      mothersName:"",
      spouseOccupation:"",
      fathersContact:"",
      mothersContact:"",
      religion:"",

      spouseName:"",
      churchName:"",
      churchLocation:"",

      spouseContact:"",
      numberOfDependants:"",
      numberOfDependantsSchooling:""
    },
    validationSchema,
    onSubmit: async (values) => {
      
      try {
        // Send form data to the backend API
        await axios.post('http://localhost:5001/register', values);


       const response = await axios.get('http://localhost:5001/total-registrants');
        
        // Update the total registrants state
       setTotalRegistrants(response.data.totalCount);
        
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
      <h1 className="mb-4">KYC FORM</h1>

      {/* Profile Picture */}
      <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* Using an IconButton instead of text */}
        <InputLabel htmlFor="profilePicture">
          <IconButton color="primary" component="span">
            <PhotoCamera />
          </IconButton>
          Upload Profile Picture
        </InputLabel>
        <MaterialImageUploader
          id="profilePicture"
          name="profilePicture"
          onChange={(file) => formik.setFieldValue('profilePicture', file)}
        />
        {formik.touched.profilePicture && formik.errors.profilePicture && (
          <FormHelperText error>{formik.errors.profilePicture}</FormHelperText>
        )}
      </Grid>
    </Grid>

      {totalRegistrants !== null && (
        <div className="alert alert-info mt-3">
          <strong>Total Registrants: </strong>{totalRegistrants}
        </div>
      )}

      {/* Form Fields */}
      <Grid container spacing={3}>
        {/* Title */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            fullWidth
          />
        </Grid>

        {/* First Name */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>


        {/* Last Name */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            fullWidth
          />
        </Grid>

        {/* Other Names */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Other Names (Optional)"
            name="otherNames"
            value={formik.values.otherNames}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otherNames && Boolean(formik.errors.otherNames)}
            helperText={formik.touched.otherNames && formik.errors.otherNames}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            type="date"
            label="Date of Birth"
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Telephone Number"
            name="telephoneNumber"
            type="tel"
            value={formik.values.telephoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.telephoneNumber && Boolean(formik.errors.telephoneNumber)}
            helperText={formik.touched.telephoneNumber && formik.errors.telephoneNumber}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
           <TextField
             label="Place of Birth"
              name="placeOfBirth"
              value={formik.values.placeOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.placeOfBirth && Boolean(formik.errors.placeOfBirth)}
              helperText={formik.touched.placeOfBirth && formik.errors.placeOfBirth}
               fullWidth
              />
          </Grid>

<Grid item xs={12} sm={6} md={4}>
  <FormControl
    fullWidth
    error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}
  >
    <InputLabel>Marital Status</InputLabel>
    <Select
      name="maritalStatus"
      value={formik.values.maritalStatus}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <MenuItem value="">
        <em>Select Status</em>
      </MenuItem>
      <MenuItem value="Single">Single</MenuItem>
      <MenuItem value="Married">Married</MenuItem>
    </Select>
    {formik.touched.maritalStatus && formik.errors.maritalStatus && (
      <FormHelperText>{formik.errors.maritalStatus}</FormHelperText>
    )}
  </FormControl>
</Grid>
<Grid item xs={12} sm={6} md={4}>
  <FormControl
    fullWidth
    error={formik.touched.formId && Boolean(formik.errors.formId)}
  >
    <InputLabel>Form of ID</InputLabel>
    <Select
      name="formId"
      value={formik.values.formId}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <MenuItem value="">
        <em>Ghana card only</em>
      </MenuItem>
      <MenuItem value="Ghanacard">Ghana card</MenuItem>
    </Select>
    {formik.touched.formId && formik.errors.formId && (
      <FormHelperText>{formik.errors.formId}</FormHelperText>
    )}
  </FormControl>
</Grid>
<Grid item xs={12} sm={6} md={4}>
  <TextField
    label="ID Number"
    name="idNumber"
    value={formik.values.idNumber}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    placeholder="GHA-1234567890"
    fullWidth
    error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
    helperText={formik.touched.idNumber && formik.errors.idNumber}
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Date of Issue"
    type="date"
    name="dateOfIssue"
    value={formik.values.dateOfIssue}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    InputLabelProps={{
      shrink: true, // Ensures the label stays above the input field
    }}
    error={formik.touched.dateOfIssue && Boolean(formik.errors.dateOfIssue)}
    helperText={formik.touched.dateOfIssue && formik.errors.dateOfIssue}
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    label="ID Expiry Date"
    type="date"
    name="idExpiryDate"
    value={formik.values.idExpiryDate}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    InputLabelProps={{
      shrink: true, // Ensures the label stays above the input field
    }}
    error={formik.touched.idExpiryDate && Boolean(formik.errors.idExpiryDate)}
    helperText={formik.touched.idExpiryDate && formik.errors.idExpiryDate}
  />
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Home Town"
    type="text"
    name="nationality"
    value={formik.values.nationality}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={formik.touched.nationality && Boolean(formik.errors.nationality)}
    helperText={formik.touched.nationality && formik.errors.nationality}
  />
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Residential Location"
    type="text"
    name="residentialLocation"
    value={formik.values.residentialLocation}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={formik.touched.residentialLocation && Boolean(formik.errors.residentialLocation)}
    helperText={formik.touched.residentialLocation && formik.errors.residentialLocation}
  />
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Street Name"
    type="text"
    name="suburb"
    value={formik.values.suburb}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={formik.touched.suburb && Boolean(formik.errors.suburb)}
    helperText={formik.touched.suburb && formik.errors.suburb}
  />
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Residential GPS Address"
    type="text"
    name="residentialGpsAddress"
    value={formik.values.residentialGpsAddress}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={
      formik.touched.residentialGpsAddress &&
      Boolean(formik.errors.residentialGpsAddress)
    }
    helperText={
      formik.touched.residentialGpsAddress && formik.errors.residentialGpsAddress
    }
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Residential Address"
    type="tel"
    name="alternativeNumber"
    value={formik.values.alternativeNumber}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    fullWidth
    error={
      formik.touched.alternativeNumber &&
      Boolean(formik.errors.alternativeNumber)
    }
    helperText={
      formik.touched.alternativeNumber && formik.errors.alternativeNumber
    }
  />
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <FormControl fullWidth error={formik.touched.employmentStatus && Boolean(formik.errors.employmentStatus)}>
    <InputLabel id="employmentStatus-label">Employment Status</InputLabel>
    <Select
      labelId="employmentStatus-label"
      id="employmentStatus"
      name="employmentStatus"
      value={formik.values.employmentStatus}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <MenuItem value="">Select Employment Status</MenuItem>
      <MenuItem value="Self Employed">Self Employed</MenuItem>
      <MenuItem value="Civil Servant">Civil Servant</MenuItem>
      <MenuItem value="Private Employee">Private Employee</MenuItem>
      <MenuItem value="Other">Other</MenuItem>
    </Select>
    {formik.touched.employmentStatus && (
      <FormHelperText>{formik.errors.employmentStatus}</FormHelperText>
    )}
  </FormControl>
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="refereeFirstName"
    name="refereeFirstName"
    label="Referee First Name"
    value={formik.values.refereeFirstName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.refereeFirstName && Boolean(formik.errors.refereeFirstName)}
    helperText={formik.touched.refereeFirstName && formik.errors.refereeFirstName}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="refereeLastName"
    name="refereeLastName"
    label="Referee Last Name"
    value={formik.values.refereeLastName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.refereeLastName && Boolean(formik.errors.refereeLastName)}
    helperText={formik.touched.refereeLastName && formik.errors.refereeLastName}
    variant="outlined"
  />
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="refereeHouseLocation"
    name="refereeHouseLocation"
    label="Referee House Location"
    value={formik.values.refereeHouseLocation}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.refereeHouseLocation && Boolean(formik.errors.refereeHouseLocation)}
    helperText={formik.touched.refereeHouseLocation && formik.errors.refereeHouseLocation}
    variant="outlined"
  />
</Grid>



<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="refereeContact"
    name="refereeContact"
    label="Referee Contact"
    type="tel"
    value={formik.values.refereeContact}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.refereeContact && Boolean(formik.errors.refereeContact)}
    helperText={formik.touched.refereeContact && formik.errors.refereeContact}
    variant="outlined"
  />
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="numberOfDependants"
    name="numberOfDependants"
    label="Number of Dependants"
    
    value={formik.values.numberOfDependants}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.numberOfDependants && Boolean(formik.errors.numberOfDependants)}
    helperText={formik.touched.numberOfDependants && formik.errors.numberOfDependants}
    variant="outlined"
  />
</Grid>


<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="numberOfDependantsSchooling"
    name="numberOfDependantsSchooling"
    label="Number of Dependants Schooling"
    
    value={formik.values.numberOfDependantsSchooling}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.numberOfDependantsSchooling && Boolean(formik.errors.numberOfDependantsSchooling)}
    helperText={formik.touched.numberOfDependantsSchooling && formik.errors.numberOfDependantsSchooling}
    variant="outlined"
  />
</Grid>



<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="fathersName"
    name="fathersName"
    label="Father's name "
    value={formik.values.fathersName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.fathersName && Boolean(formik.errors.fathersName)}
    helperText={formik.touched.fathersName && formik.errors.fathersName}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="mothersName"
    name="mothersName"
    label="Mother's name"
    value={formik.values.mothersName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.mothersName && Boolean(formik.errors.mothersName)}
    helperText={formik.touched.mothersName && formik.errors.mothersName}
    variant="outlined"
  />
</Grid>
<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="spouseName"
    name="spouseName"
    label="Spouse Name"
    value={formik.values.spouseName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.spouseName&& Boolean(formik.errors.spouseName)}
    helperText={formik.touched.spouseName && formik.errors.spouseName}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="spouseContact"
    name="spouseContact"
    label="Spouse Contact"
    value={formik.values.spouseContact}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.spouseContact&& Boolean(formik.errors.spouseContact)}
    helperText={formik.touched.spouseContact && formik.errors.spouseContact}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="spouseOccupation"
    name="spouseOccupation"
    label="Spouse Occupation"
    value={formik.values.spouseOccupation}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.spouseOccupation && Boolean(formik.errors.spouseOccupation)}
    helperText={formik.touched.spouseOccupation && formik.errors.spouseOccupation}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="fathersContact"
    name="fathersContact"
    label="Father's Tel.Number"
    value={formik.values.fathersContact}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.fathersContact && Boolean(formik.errors.fathersContact)}
    helperText={formik.touched.fathersContact && formik.errors.fathersContact}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="mothersContact"
    name="mothersContact"
    label="Mother's Tel.Number"
    value={formik.values.mothersContact}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.mothersContact && Boolean(formik.errors.mothersContact)}
    helperText={formik.touched.mothersContact && formik.errors.mothersContact}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="religion"
    name="religion"
    label="Religion"
    value={formik.values.religion}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.religion && Boolean(formik.errors.religion)}
    helperText={formik.touched.religion && formik.religion}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="churchName"
    name="churchName"
    label="Name of Church"
    value={formik.values.churchName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.churchName && Boolean(formik.errors.churchName)}
    helperText={formik.touched.churchName && formik.churchName}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <TextField
    fullWidth
    id="churchLocation"
    name="churchLocation"
    label="Church Location"
    value={formik.values.churchLocation}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.churchLocation && Boolean(formik.errors.churchLocation)}
    helperText={formik.touched.churchLocation && formik.churchLocation}
    variant="outlined"
  />
</Grid>

<Grid item xs={12} sm={6} md={4}>
  <FormControl fullWidth variant="outlined" error={formik.touched.relationshipOfficer && Boolean(formik.errors.relationshipOfficer)}>
    <InputLabel>Relationship Officer</InputLabel>
    <Select
      label="Relationship Officer"
      name="relationshipOfficer"
      value={formik.values.relationshipOfficer}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    >
      <MenuItem value="">Relationship Officer</MenuItem>
      <MenuItem value="Officer 1">Officer 1</MenuItem>
      <MenuItem value="Officer 2">Officer 2</MenuItem>
      <MenuItem value="Officer 3">Officer 3</MenuItem>
    </Select>
    <FormHelperText>{formik.touched.relationshipOfficer && formik.errors.relationshipOfficer}</FormHelperText>
  </FormControl>
</Grid>






      </Grid>

      {/* Date of Birth */}
      
        

        {/* Gender */}
        

        {/* Telephone Number */}
        
      

      {/* Add more fields as necessary... */}

      {/* Submit Button */}
      <Grid container spacing={3} justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>

      {/* Submit Status */}
      {submitStatus && (
        <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
          {submitStatus.message}
          <button
            type="button"
            className="btn btn-sm btn-link float-end"
            onClick={handleDismissAlert}
          >
            Dismiss
          </button>
        </div>
      )}
    </form>
  );
};

export default CustomerRegistration;