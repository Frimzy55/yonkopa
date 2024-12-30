import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

function Disbursed({ disbursedCustomers }) {
  if (!disbursedCustomers || disbursedCustomers.length === 0) {
    return (
      <Typography variant="h6" align="center" color="textSecondary">
        No Disbursed Loans Available
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="disbursed loans">
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Loan Amount</TableCell>
            <TableCell>Disbursement Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {disbursedCustomers.map((customer) => (
            <TableRow key={customer.customer_id}>
              <TableCell>{customer.customer_id}</TableCell>
              <TableCell>{customer.full_name}</TableCell>
              <TableCell>{customer.loanAmount}</TableCell>
              <TableCell>{customer.disbursement_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Disbursed;
