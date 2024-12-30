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
  IconButton,
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
import { Delete } from "@mui/icons-material";
import moment from "moment";
import * as XLSX from "xlsx"; // Import the library for Excel export

const Disbursed = ({ disbursedCustomers, onBack }) => {
  const [savedCustomers, setSavedCustomers] = useState(disbursedCustomers);
  const [date, setDate] = useState("");
  const [productType, setProductType] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const productTypes = ["Loan", "Mortgage", "Auto Loan"]; // Example product types

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("disbursedCustomers") || "[]");
    setSavedCustomers(savedData);
  }, []);

  const handleSave = () => {
    localStorage.setItem("disbursedCustomers", JSON.stringify(savedCustomers));
    alert("Disbursed customers saved successfully!");
  };

  const handleDelete = (customerId) => {
    const updatedCustomers = savedCustomers.filter(
      (customer) => customer.customer_id !== customerId
    );
    setSavedCustomers(updatedCustomers);
    localStorage.setItem("disbursedCustomers", JSON.stringify(updatedCustomers));
    alert("Customer removed successfully!");
  };

  const filteredCustomers = savedCustomers.filter((customer) => {
    return (
      (date ? moment(customer.applicant_date).format("MM/DD/YYYY").includes(date) : true) &&
      (productType ? customer.product_type === productType : true) &&
      (applicationDate ? moment(customer.applicant_date).format("MM/DD/YYYY").includes(applicationDate) : true)
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

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Disbursed Loan Reports
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Product Type</InputLabel>
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
              <TableCell>Product Type</TableCell> {/* Changed from Principal to Product Type */}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers
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
                  <TableCell>{customer.product_type}</TableCell> {/* Changed to Product Type */}
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(customer.customer_id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Disbursed;
