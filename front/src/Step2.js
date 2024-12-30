import React from 'react';
//import { TextField, Grid, Typography } from '@mui/material';
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl ,Typography} from '@mui/material';

const Step2 = ({ formData, handleChange }) => (
    <>
        <Typography variant="h6" gutterBottom>
            BUSINESS INFORMATION
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={8} sm={4} md={2}>
                <TextField
                    fullWidth
                    label="Business Name"
                    name="businessName"
                    margin="normal"
                    value={formData.businessName}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
               <FormControl fullWidth margin="normal">
                  <InputLabel id="business-sector-label">Business Sector</InputLabel>
                   <Select
                 labelId="business-sector-label"
                 id="businessSector"
                  name="businessSector"
                 value={formData.businessSector}
                 onChange={handleChange}
                 label="Business Sector"
                 >
                <MenuItem value="trading">Trading</MenuItem>
                 <MenuItem value="service">Service</MenuItem>
                </Select>
                </FormControl>
               </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="BusinessLandmark"
                    name="businessLandmark"
                    margin="normal"
                    value={formData.businessLandmark}
                    onChange={handleChange}
                />
            </Grid>
           
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business Location"
                    name="businessLocation"
                    margin="normal"
                    value={formData.businessLocation}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Type of Business"
                    name="typeOfBusiness"
                    margin="normal"
                    value={formData.typeOfBusiness}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business Gps Address"
                    name="businessGps"
                    margin="normal"
                    value={formData.businessGps}
                    onChange={handleChange}
                />
            </Grid>
          
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business Capital"
                    name="businessCapital"
                    margin="normal"
                    value={formData.businessCapital}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business Stock Value"
                    name="businessStock"
                    margin="normal"
                    value={formData.businessStock}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Cash (in Hand and at Bank)"
                    name="cash"
                    margin="normal"
                    value={formData.cash}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Account Receivables"
                    name="account"
                    margin="normal"
                    value={formData.account}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Account Payables"
                    name="payable"
                    margin="normal"
                    value={formData.payable}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Maximum Sales/Day"
                    name="max"
                    margin="normal"
                    value={formData.max}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Minimum Sales/Day"
                    name="min"
                    margin="normal"
                    value={formData.min}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Number of employees"
                    name="emp"
                    margin="normal"
                    value={formData.emp}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Third Party name"
                    name="thirdParty"
                    margin="normal"
                    value={formData.thirdParty}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Third Party Contact"
                    name="thirdPartyContact"
                    margin="normal"
                    value={formData.thirdPartyContact}
                    onChange={handleChange}
                    sx={{ height: '50px' }} // Adjust the height here
                />
            </Grid>
        </Grid>
    </>
);

export default Step2;
