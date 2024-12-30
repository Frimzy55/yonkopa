import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const Step3 = ({ formData, handleChange }) => (
    <>
        <Typography variant="h6" gutterBottom>
            LOAN APPLICATION
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Loan Amount"
                    name="loanAmount"
                    margin="normal"
                    value={formData.loanAmount}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Loan Purpose"
                    name="loanPurpose"
                    margin="normal"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="LoanTerm"
                    name="loanTerm"
                    margin="normal"
                    value={formData.loanTerm}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Monthly Installment"
                    name="monthlyInstallment"
                    margin="normal"
                    value={formData.monthlyInstallment}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Repayment Frequency"
                    name="frequency"
                    margin="normal"
                    value={formData.frequency}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Repayment Amount"
                    name="repaymentAmount"
                    margin="normal"
                    value={formData.repaymentAmount}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Repayment Period"
                    name="period"
                    margin="normal"
                    value={formData.period}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Previous Loan Request"
                    name="request"
                    margin="normal"
                    value={formData.request}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Previous Loan Approved"
                    name="approved"
                    margin="normal"
                    value={formData.approved}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                 <TextField
                    fullWidth
                    type="date"
                    label="Expected Due Date"
                     name="date"
                     margin="normal"
                     value={formData.date}
                     onChange={handleChange}
                    InputLabelProps={{ shrink: true }} // Ensures the label works properly with "date"
                    />
               </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    type="date"
                    label="Actual Due Date"
                    name="actual"
                    margin="normal"
                    value={formData.actual}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

        </Grid>

    

            <Typography variant="h6" gutterBottom>
            REFERENCE
           </Typography>

           <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Fullname"
                    name="refFullname1"
                    margin="normal"
                    value={formData.refFullname1}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="RelationShip"
                    name="refRelation1"
                    margin="normal"
                    value={formData.refRelation1}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Location"
                    name="refLocation1"
                    margin="normal"
                    value={formData.refLocation1}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    fullWidth
                    label="Telephone Number"
                    name="refTelephone1"
                    margin="normal"
                    value={formData.refTelephone1}
                    onChange={handleChange}
                />
            </Grid>
          
          
         </Grid>
    </>
);

export default Step3;
