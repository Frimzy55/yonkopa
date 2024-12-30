import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

function ViewDet({ open, onClose, customer }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent>
        <div>
          <p><strong>Customer ID:</strong> {customer.customer_id}</p>
          <p><strong>Full Name:</strong> {customer.full_name}</p>
          <p><strong>Telephone:</strong> {customer.telephone_number}</p>
          <p><strong>Application Date:</strong> {customer.applicant_date}</p>
          <p><strong>Approval Date:</strong> {customer.approval_date}</p>
          <p><strong>Residential Address:</strong> {customer.residential_address}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewDet;
