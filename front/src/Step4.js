import React from 'react';
//import { TextField, Grid, Typography } from '@mui/material';
import { Grid, TextField, MenuItem, Select, InputLabel, FormControl ,Typography, FormHelperText} from '@mui/material';



const Step4 = ({ formData, handleChange }) => (
   
  
    <>
        <Typography variant="h6" gutterBottom>
            GUARANTOR INFORMATION
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={8} sm={4} md={2}>
                <TextField
                    fullWidth
                    label="Guarantor FullName"
                    name="gfullname"
                    margin="normal"
                    value={formData.gfullname}
                    onChange={handleChange}
                />
            </Grid>
           
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Relationship to client"
                    name="grelationshipClient"
                    margin="normal"
                    value={formData.grelationshipClient}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    type='date'
                    label="Date of birth"
                    name="gdateOfBirth"
                    margin="normal"
                    value={formData.gdateOfBirth}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Home Town"
                    name="ghometown"
                    margin="normal"
                    value={formData.ghometown}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                           <FormControl fullWidth margin="normal">
                              <InputLabel id="business-sector-label">Gender</InputLabel>
                               <Select
                             labelId="business-sector-label"
                             id="gender"
                              name="ggender"
                             value={formData.ggender}
                             onChange={handleChange}
                             label="Gender"
                             >
                            <MenuItem value="male">Male</MenuItem>
                             <MenuItem value="female">Female</MenuItem>
                            </Select>
                            </FormControl>
                           </Grid>

            <Grid item xs={12} sm={6} md={2}>
                   <FormControl fullWidth margin="normal">
                     <InputLabel id="business-sector-label">Marital Status</InputLabel>
                      <Select
                      labelId="business-sector-label"
                      id="maritalStatus"
                      name="gmaritalStatus"
                      value={formData.gmaritalStatus}
                      onChange={handleChange}
                      label="Marital status"
                       >
                       <MenuItem value="Single">Single</MenuItem>
                       <MenuItem value="Married">Married</MenuItem>
                       <MenuItem value="Divorced">Divorced</MenuItem>
                       <MenuItem value="Widowed">Widowed</MenuItem>
                       </Select>
                        </FormControl>
                       </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Number of Dependants"
                    name="gnumberOfDependants"
                    margin="normal"
                    value={formData.gnumberOfDependant}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Telephone Number"
                    name="gtelephoneNumber"
                    margin="normal"
                    value={formData.gtelephoneNumber}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Id Type"
                    name="gidType"
                    margin="normal"
                    value={formData.gidType}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Id Number"
                    name="gidNumber"
                    margin="normal"
                    value={formData.gidNumber}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Place Of Worship"
                    name="gplaceOfWorship"
                    margin="normal"
                    value={formData.gplaceOfWorship}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Residential Location"
                    name="gresidentialLocation"
                    margin="normal"
                    value={formData.gresidentialLocation}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Residential Status"
                    name="gresidentialStatus"
                    margin="normal"
                    value={formData.gresidentialStatus}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Residential Gps Address"
                    name="ggpsAddress"
                    margin="normal"
                    value={formData.ggpsAddress}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Major Landmark"
                    name="gmajorLandmark"
                    margin="normal"
                    value={formData.gmajorLandmark}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business Structure"
                    name="gbusinessStructure"
                    margin="normal"
                    value={formData.gbusinessStructure}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business Capital"
                    name="gbusinessCapital"
                    margin="normal"
                    value={formData.gbusinessCapital}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business Stock Value"
                    name="gbusinessStockValue"
                    margin="normal"
                    value={formData.gbusinessStockValue}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business Location"
                    name="gguarantorBusinessLocation"
                    margin="normal"
                    value={formData.gguarantorBusinessLocation}
                    onChange={handleChange}
                    sx={{ height: '50px' }} // Adjust the height here
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Business GPS location"
                    name="gguarantorBusinessGps"
                    margin="normal"
                    value={formData.gguarantorBusinessGps}
                    onChange={handleChange}
                    sx={{ height: '50px' }} // Adjust the height here
                />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                           <FormControl fullWidth margin="normal">
                              <InputLabel id="business-sector-label">Credit Officer</InputLabel>
                               <Select
                             labelId="business-sector-label"
                             id="officer"
                              name="officer"
                             value={formData.officer}
                             onChange={handleChange}
                             label="credit officer"
                             >
                            <MenuItem value="officer 1">Officer 1</MenuItem>
                             <MenuItem value="officer 2">Officer 2</MenuItem>
                             <MenuItem value="officer 3">Officer 3</MenuItem>
                            </Select>
                            </FormControl>
                           </Grid>


    
        </Grid>
    </>
);

export default Step4;
