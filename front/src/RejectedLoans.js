// RejectedLoans.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import moment from "moment";

const RejectedLoans = ({ rejectedCustomers, onBack }) => {
  const formatDate = (dateString) => moment(dateString).format("MM/DD/YYYY");

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Rejected Files
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onBack}
        style={{ marginBottom: "20px" }}
      >
        Back to Approve Customers
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Application Date</TableCell>
              <TableCell>Residential Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rejectedCustomers.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.full_name}</TableCell>
                <TableCell>{customer.telephone_number}</TableCell>
                <TableCell>{formatDate(customer.applicant_date)}</TableCell>
                <TableCell>{customer.residential_address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RejectedLoans;
