import React from "react";
import moment from "moment";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";

function ViewDetails({ customer, isOpen, onClose }) {
  if (!customer) return null; // Prevent rendering if no customer is selected

  const formatDate = (dateString) => {
    return dateString ? moment(dateString).format("MM/DD/YYYY") : "N/A";
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#3f51b5", color: "#fff", textAlign: "center" }}>
        <Typography variant="h6">Customer Details</Typography>
      </DialogTitle>

      <DialogContent sx={{ padding: "24px" }}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Section: Basic Details */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: "#3f51b5" }}>
              Customer Information
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}><strong>Customer ID:</strong> {customer.customer_id}</Grid>
              <Grid item xs={6}><strong>Full Name:</strong> {customer.full_name}</Grid>
              <Grid item xs={6}><strong>Telephone:</strong> {customer.telephone_number}</Grid>
              <Grid item xs={6}><strong>Date of Birth:</strong> {formatDate(customer.date_of_birth)}</Grid>
              <Grid item xs={6}><strong>Residential Address:</strong> {customer.residential_address}</Grid>
              <Grid item xs={6}><strong>GPS Address:</strong> {customer.gps_address}</Grid>
            </Grid>
          </Box>

          {/* Section: Guarantor Details */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: "#3f51b5" }}>
              Guarantor Information
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}><strong>Name:</strong> {customer.guarantor_name}</Grid>
              <Grid item xs={6}><strong>Date of Birth:</strong> {formatDate(customer.guarantor_date_of_birth)}</Grid>
              <Grid item xs={6}><strong>Contact:</strong> {customer.guarantor_contact}</Grid>
              <Grid item xs={6}><strong>Relationship:</strong> {customer.relationship_with_client}</Grid>
              <Grid item xs={6}><strong>Residential Address:</strong> {customer.guarantor_residential}</Grid>
              <Grid item xs={6}><strong>GPS Address:</strong> {customer.guarantor_gps_address}</Grid>
            </Grid>
          </Box>

          {/* Section: Loan Details */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: "#3f51b5" }}>
              Loan Details
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}><strong>Principal:</strong> ${customer.principal}</Grid>
              <Grid item xs={6}><strong>Rate:</strong> {customer.rate}%</Grid>
              <Grid item xs={6}><strong>Loan Term:</strong> {customer.loanTerm} months</Grid>
              <Grid item xs={6}><strong>Loan Amount:</strong> ${customer.loanAmount}</Grid>
              <Grid item xs={6}><strong>Interest:</strong> ${customer.Interest}</Grid>
              <Grid item xs={6}><strong>Monthly Installment:</strong> ${customer.monthly_installment}</Grid>
            </Grid>
          </Box>

          {/* Section: Financial Analysis */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: "#3f51b5" }}>
              Financial Analysis
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}><strong>Monthly Sales Revenue:</strong> ${customer.monthly_sales_revenue}</Grid>
              <Grid item xs={6}><strong>Gross Profit:</strong> ${customer.gross_profit}</Grid>
              <Grid item xs={6}><strong>Operating Expenses:</strong> ${customer.total_operating_expenses}</Grid>
              <Grid item xs={6}><strong>Net Business Profit:</strong> ${customer.net_business_profit}</Grid>
              <Grid item xs={6}><strong>Household Surplus:</strong> ${customer.household_surplus}</Grid>
              <Grid item xs={6}><strong>Capacity to Pay:</strong> {customer.capacity_to_pay_analysis}</Grid>
            </Grid>
          </Box>

          {/* Section: Property Details */}
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: "#3f51b5" }}>
              Property Details
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}><strong>Building Location:</strong> {customer.building_location}</Grid>
              <Grid item xs={6}><strong>Market Value:</strong> {customer.building_market_value}</Grid>
              <Grid item xs={6}><strong>Vehicle Brand:</strong> {customer.vehicle_brand}</Grid>
              <Grid item xs={6}><strong>Land Location:</strong> {customer.land_location}</Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={onClose} color="primary" variant="contained" fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewDetails;
