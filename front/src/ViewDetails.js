import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function ViewDetails({ customer, isOpen, onClose }) {
  if (!customer) return null; // Prevent rendering if no customer is selected

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <strong>Full Name:</strong> {customer.full_name}
        </Typography>
        <Typography variant="body1">
          <strong>Telephone:</strong> {customer.telephone_number}
        </Typography>
        <Typography variant="body1">
          <strong>Residential Address:</strong> {customer.residential_address}
        </Typography>
        <Typography variant="body1">
          <strong>Application Date:</strong> {customer.applicant_date}
        </Typography>
        <Typography variant="body1">
          <strong>Approval Date:</strong> {customer.approval_date}
        </Typography>
        {/* Add more fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewDetails;
