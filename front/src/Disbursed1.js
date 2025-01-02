import React, { useEffect, useState } from "react";
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
import axios from "axios"; // Import axios to make HTTP requests
import Disbursed from "./Disbursed";

const Disbursed1 = ({ onBack }) => {
  const [rejectedCustomers, setRejectedCustomers] = useState([]);

  // Function to format dates
  const formatDate = (dateString) => moment(dateString).format("MM/DD/YYYY");

  // Fetch rejected loans from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5001/disbursed-custom") // Ensure this is the correct URL to your backend
      .then((response) => {
        setRejectedCustomers(response.data); // Set the fetched data to the state
      })
      .catch((error) => {
        console.error("Error fetching rejected loans:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Disbursed Files
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

export default Disbursed1;

