import React, { useState } from 'react';
import { Button, TextField, Stepper, Step, StepLabel, Box } from '@mui/material';

const MultiStepForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = ["Step 1", "Step 2", "Step 3"];

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField fullWidth label="Form 1" margin="normal" />
                        <TextField fullWidth label="Form 2" margin="normal" />
                        <TextField fullWidth label="Form 3" margin="normal" />
                    </>
                );
            case 1:
                return (
                    <>
                        <TextField fullWidth label="Form 4" margin="normal" />
                        <TextField fullWidth label="Form 5" margin="normal" />
                        <TextField fullWidth label="Form 6" margin="normal" />
                    </>
                );
            case 2:
                return (
                    <>
                        <TextField fullWidth label="Form 7" margin="normal" />
                        <TextField fullWidth label="Form 8" margin="normal" />
                        <TextField fullWidth label="Form 9" margin="normal" />
                        <TextField fullWidth label="Form 10" margin="normal" />
                    </>
                );
            default:
                return "Unknown Step";
        }
    };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ marginTop: 2 }}>
                {renderStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                    >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MultiStepForm;














//import React from 'react';

/*import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  TextField,
  Grid,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

function PersonalLoan() {

 

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        KYC FORM
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={3}>
          {/* Customer ID */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Customer ID"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Popular Name */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Popular Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Contact Number */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Contact Number"
              variant="outlined"
              type="tel"
              fullWidth
              required
            />
          </Grid>

          {/* Type of Identity */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Type of Identity</InputLabel>
              <Select
                label="Type of Identity"
                required
                defaultValue=""
              >
                <MenuItem value="passport">Passport</MenuItem>
                <MenuItem value="nationalId">National ID</MenuItem>
                <MenuItem value="driverLicense">Driver's License</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* ID Number */}
          <Grid item xs={12} md={6}>
            <TextField
              label="ID Number"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Date Issued */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Date Issued"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>

          {/* Expiry Date */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Expiry Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>

          {/* Home Town */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Home Town"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Date of Birth"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>

          {/* Residential Location */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Residential Location"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Residential Address */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Residential Address"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Street Name */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Street Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Residential GPS */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Residential GPS"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Residential Ownership */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Residential Ownership</InputLabel>
              <Select
                label="Residential Ownership"
                required
                defaultValue=""
              >
                <MenuItem value="own">Own</MenuItem>
                <MenuItem value="rented">Rented</MenuItem>
                <MenuItem value="family">Family</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* How Long at This Address */}
          <Grid item xs={12} md={6}>
            <TextField
              label="How Long at This Address"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Years or Months */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Duration</InputLabel>
              <Select
                label="Duration"
                required
                defaultValue=""
              >
                <MenuItem value="years">Years</MenuItem>
                <MenuItem value="months">Months</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Number of Dependants */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Number of Dependants"
              variant="outlined"
              type="number"
              fullWidth
              required
            />
          </Grid>

          {/* Number of Dependants Schooling */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Number of Dependants Schooling"
              variant="outlined"
              type="number"
              fullWidth
              required
            />
          </Grid>

          {/* Religion */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Religion"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Name of Church */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Name of Church"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          {/* Church Location */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Church Location"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Name Of Spouse"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Spouse Occupation"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Spouse Telephone Number"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Name Of Father"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>


          <Grid item xs={12} md={6}>
            <TextField
              label="Name Of Mother"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>

         

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default PersonalLoan;
*/