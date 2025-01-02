import React, { useState } from "react";
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
  TextField,
  Grid,
  TablePagination,
  Box,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import moment from "moment";
import * as XLSX from "xlsx"; // Import the library for Excel export
import axios from "axios"; // Make sure to install axios with npm

const Rejects = ({ onBack }) => {
  const [customers, setCustomers] = useState([]);
  const [dateFrom, setDateFrom] = useState(""); // State for "From" date
  const [dateTo, setDateTo] = useState(""); // State for "To" date
  const [productType, setProductType] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const productTypes = ["Personal Loan", "Business loan", "Salary Support",'Consolidated']; // Example product types

  const filteredCustomers = customers.filter((customer) => {
    if (!customer.disbursed_at) return false; // skip customers without a valid disbursed_at
  
    return (
      (dateFrom ? moment(customer.disbursed_at).isSameOrAfter(dateFrom) : true) &&
      (dateTo ? moment(customer.disbursed_at).isSameOrBefore(dateTo) : true)
    );
  });
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Print functionality
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Disbursed Loans</title></head><body>");
    printWindow.document.write(document.getElementById("disbursed-loans-table").outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Copy functionality
  const handleCopy = () => {
    const table = document.getElementById("disbursed-loans-table");
    const range = document.createRange();
    range.selectNode(table);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    alert("Table copied to clipboard!");
  };

  // Save to Excel functionality
  const handleSaveExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredCustomers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Disbursed Loans");
    XLSX.writeFile(wb, "Disbursed_Loans.xlsx");
  };

  // Fetch data when Generate Report is clicked
  const handleGenerateReport = () => {
    if (!dateFrom || !dateTo) {
      alert("Please select both 'From' and 'To' dates.");
      return;
    }
  
    const formattedDateFrom = moment(dateFrom).startOf('day').format("YYYY-MM-DD HH:mm:ss");
    const formattedDateTo = moment(dateTo).endOf('day').format("YYYY-MM-DD HH:mm:ss");
  
    console.log("Fetching data with params:", { dateFrom: formattedDateFrom, dateTo: formattedDateTo, productType });
  
    axios
      .get("http://localhost:5001/disbursed-customers", {
        params: { dateFrom: formattedDateFrom, dateTo: formattedDateTo, productType },
      })
      .then((response) => {
        console.log("Data fetched:", response.data);
        setCustomers(response.data); // Update state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to generate report. Please try again.");
      });
  };
  
  return (
    <div  style={{ transform: 'scale(0.9)', transformOrigin: 'top center', padding: "20px" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Disbursed Loans Report
      </Typography>

      {/* Card for Buttons */}
      <Card sx={{ marginBottom: "20px", padding: "10px" }}>
        <CardContent>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Button
                variant="contained"
                color="default"
                onClick={onBack}
                style={{ marginRight: "10px" }}
              >
                Back
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrint}
                style={{ marginRight: "10px" }}
              >
                Print
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCopy}
                style={{ marginRight: "10px" }}
              >
                Copy
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSaveExcel}
              >
                Save to Excel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Card for Input Fields */}
      <Card sx={{ marginBottom: "20px" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <TextField
                label="From"
                variant="outlined"
                fullWidth
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

         <Grid item xs={12} sm={3}>
            <TextField
              label="To"
              variant="outlined"
              fullWidth
             value={dateTo}
             onChange={(e) => setDateTo(e.target.value)}
             type="date"
              InputLabelProps={{
              shrink: true,
            }}
           sx={{
             width: '100%', // Adjust the width as needed
             height: '10px', // Adjust the height as needed
            }}
           />
        </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Loan Type</InputLabel>
                <Select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  label="Product Type"
                >
                  {productTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Generate Report Button */}
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateReport}
                fullWidth
              >
                Generate Report
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Show Entries Dropdown */}
      <Box mb={2}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredCustomers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Table Container */}
      <TableContainer component={Paper}>
        <Table id="disbursed-loans-table" aria-label="disbursed loans">
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Application Date</TableCell>
              <TableCell>Approval Date</TableCell>
              <TableCell>Disbursed Amount</TableCell>
              <TableCell>Loan Type</TableCell>
              <TableCell>Loan Term</TableCell>
              <TableCell>Disbursed Loan Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="h6" color="textSecondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow key={customer.customer_id}>
                    <TableCell>{customer.customer_id}</TableCell>
                    <TableCell>{customer.full_name}</TableCell>
                    <TableCell>{customer.telephone_number}</TableCell>
                    <TableCell>
                      {moment(customer.applicant_date).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>
                      {moment(customer.approval_date).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>GH¢{customer.chair_approval}.00</TableCell>
                    <TableCell>{customer.loan_type}</TableCell>
                    <TableCell>{customer.loanTerm}</TableCell>
                    <TableCell>
                      {moment(customer.disbursed_at).format("MM/DD/YYYY")}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Rejects;            
