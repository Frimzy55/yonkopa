import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';


const Step1 = ({ formData, handleChange }) => (
    <>
        <Typography variant="h6" gutterBottom>
            KYC FORMS
        </Typography>

        
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="customer_id"
                    name="customerId"
                    margin="normal"
                    value={formData.customerId || ''}
                    onChange={handleChange}
                    InputProps={{ readOnly: true }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="first_name"
                    name="firstName"
                    margin="normal"
                    value={formData.firstName || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="last_name"
                    name="lastName"
                    margin="normal"
                    value={formData.lastName || ''}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="date_of_birth"
                    name="dateOfBirth"
                    margin="normal"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="telephone_number"
                    name="telephoneNumber"
                    margin="normal"
                    value={formData.telephoneNumber}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="form_of_id"
                    name="typeOfId"
                    margin="normal"
                    value={formData.typeOfId}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="id_number"
                    name="idNumber"
                    margin="normal"
                    value={formData.idNumber}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="date_of_issue"
                    name="dateOfIssue"
                    margin="normal"
                    value={formData.dateOfIssue}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="id_expiry_date"
                    name="expiryDate"
                    margin="normal"
                    value={formData.expiryDate}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="street_name"
                    name="streetName"
                    margin="normal"
                    value={formData.streetName}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="residential_gps_address"
                    name="residentialGps"
                    margin="normal"
                    value={formData.residentialGps}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="residential_location"
                    name="residentialLocation"
                    margin="normal"
                    value={formData.residentialLocation}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="residential_address"
                    name="residentialAddress"
                    margin="normal"
                    value={formData.residentialAddress}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="home_town"
                    name="homeTown"
                    margin="normal"
                    value={formData.homeTown ||" "}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="churhName"
                    name="nameOfChurch"
                    margin="normal"
                    value={formData.nameOfChurch}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="churchLocation"
                    name="ChurchLocation"
                    margin="normal"
                    value={formData.ChurchLocation}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="spouseName"
                    name="nameOfSpouse"
                    margin="normal"
                    value={formData.nameOfSpouse}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Spouse Contact"
                    name="spouseContact"
                    margin="normal"
                    value={formData.spouseContact}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Number of Dependants"
                    name="number_of_dependants"
                    margin="normal"
                    value={formData.number_of_dependants}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    fullWidth
                    label="Number of Dependants Schooling"
                    name="number_of_dependants_schooling"
                    margin="normal"
                    value={formData.number_of_dependants_schooling}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="religion"
                    name="religion"
                    margin="normal"
                    value={formData.religion}
                    onChange={handleChange}
                />
            </Grid>
            {/* New fields for parents */}
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="fathersName"
                    name="fathersName"
                    margin="normal"
                    value={formData.fathersName}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="fathersContact"
                    name="fathersContact"
                    margin="normal"
                    value={formData.fathersContact}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="mothersName"
                    name="mothersName"
                    margin="normal"
                    value={formData.mothersName}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="mothersContact"
                    name="mothersContact"
                    margin="normal"
                    value={formData.mothersContact}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    </>
);

export default Step1;
