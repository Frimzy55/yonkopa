import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";

function ViewCustomerDetails({ customer, open, onClose }) {
  if (!customer) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Personal Information</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Customer ID:</strong> {customer.customer_id}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Full Name:</strong> {customer.full_name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Telephone:</strong> {customer.telephone_number}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Residential Address:</strong> {customer.residential_address}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" style={{ marginTop: 16 }}>Application Information</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Application Date:</strong> {customer.applicant_date}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Approval Date:</strong> {customer.approval_date}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Approved Amount:</strong> {customer.approved_amount || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Credit Officer:</strong> {customer.credit_officer}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Chair Approval:</strong> {customer.chair_approval ? "Yes" : "No"}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewCustomerDetails;
