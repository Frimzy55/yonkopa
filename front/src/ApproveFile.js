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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { Cancel, Visibility, AccountBalance, Comment } from "@mui/icons-material";
import moment from "moment";
import RejectedLoans from "./RejectedLoans";
import Disbursed from "./Disbursed";
import ViewDetails from "./ViewDetails";

function ApproveFile() {
  const [customers, setCustomers] = useState([]);
  const [disbursedCustomers, setDisbursedCustomers] = useState([]);
  const [rejectedCustomers, setRejectedCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRejectedView, setShowRejectedView] = useState(false);
  const [showDisbursedView, setShowDisbursedView] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchCustomerData() {
      try {
        const response = await fetch("http://localhost:5001/save-custom");
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomerData();

    const storedDisbursed =
      JSON.parse(localStorage.getItem("disbursedCustomers")) || [];
    setDisbursedCustomers(storedDisbursed);
  }, []);

  const handleAction = async (action, customer) => {
    if (action === "reject") {
      setRejectedCustomers((prev) => [...prev, customer]);
      setCustomers((prev) =>
        prev.filter((c) => c.customer_id !== customer.customer_id)
      );
    } else if (action === "DisbursedLoan") {
      try {
        const response = await fetch(`http://localhost:5001/customers/${customer.customer_id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete customer from the database");
        }

        const updatedCustomers = customers.filter(
          (c) => c.customer_id !== customer.customer_id
        );
        setCustomers(updatedCustomers);

        const updatedDisbursedCustomers = [...disbursedCustomers, customer];
        setDisbursedCustomers(updatedDisbursedCustomers);

        localStorage.setItem(
          "disbursedCustomers",
          JSON.stringify(updatedDisbursedCustomers)
        );

        alert("Customer disbursed and removed from the database.");
      } catch (error) {
        console.error(error);
        alert("An error occurred while processing the action.");
      }
    } else if (action === "view-details") {
      setSelectedCustomer(customer);
      setIsDetailsDialogOpen(true);
    } else if (action === "view-comment") {
      alert(`Comment for ${customer.full_name}: ${customer.comment || "No comment available"}`);
    }
  };

  const handleCloseDetailsDialog = () => {
    setSelectedCustomer(null);
    setIsDetailsDialogOpen(false);
  };

  const formatDate = (dateString) => moment(dateString).format("MM/DD/YYYY");

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  if (showRejectedView) {
    return (
      <RejectedLoans
        rejectedCustomers={rejectedCustomers}
        onBack={() => setShowRejectedView(false)}
      />
    );
  }

  if (showDisbursedView) {
    return (
      <Disbursed
        disbursedCustomers={disbursedCustomers}
        onBack={() => setShowDisbursedView(false)}
      />
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Approve Customer Files
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setShowRejectedView(true)}
        style={{ marginBottom: "20px" }}
      >
        View Rejected Loans
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowDisbursedView(true)}
        style={{ marginBottom: "20px", marginLeft: "10px" }}
      >
        View Disbursed Loans
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="approve customer files">
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Application Date</TableCell>
              <TableCell>Approval Date</TableCell>
              <TableCell>Residential Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.full_name}</TableCell>
                <TableCell>{customer.telephone_number}</TableCell>
                <TableCell>{formatDate(customer.applicant_date)}</TableCell>
                <TableCell>{formatDate(customer.approval_date)}</TableCell>
                <TableCell>{customer.residential_address}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" style={{ minWidth: 150 }}>
                    <InputLabel>Action</InputLabel>
                    <Select
                      onChange={(e) => handleAction(e.target.value, customer)}
                      label="Action"
                    >
                      <MenuItem value="reject">
                        <ListItemIcon>
                          <Cancel color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Reject" />
                      </MenuItem>
                      <MenuItem value="view-details">
                        <ListItemIcon>
                          <Visibility color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="View Details" />
                      </MenuItem>
                      <MenuItem value="DisbursedLoan">
                        <ListItemIcon>
                          <AccountBalance color="action" />
                        </ListItemIcon>
                        <ListItemText primary="Disbursed Loan" />
                      </MenuItem>
                      <MenuItem value="view-comment">
                        <ListItemIcon>
                          <Comment color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="View Comment" />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ViewDetails
        customer={selectedCustomer}
        isOpen={isDetailsDialogOpen}
        onClose={handleCloseDetailsDialog}
      />
    </div>
  );
}

export default ApproveFile;
