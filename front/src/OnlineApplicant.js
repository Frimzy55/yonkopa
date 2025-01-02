import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, CircularProgress, Button } from '@mui/material';

function OnlineApplicant() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/online');
        if (response.ok) {
          const data = await response.json();
          setApplicants(data);  // Store the data in state
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );  // Show loading spinner while data is being fetched
  }

  const formatDate = (dateString) => moment(dateString).format("MM/DD/YYYY");

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Online Applicants
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="applicant data table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Place of Birth</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Marital Status</TableCell>
              <TableCell>Spouse Name</TableCell>
              <TableCell>Spouse Contact</TableCell>
              <TableCell>Identification Type</TableCell>
              <TableCell>ID Number</TableCell>
              <TableCell>Date of Issue</TableCell>
              <TableCell>Expiry Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.title}</TableCell>
                <TableCell>{applicant.firstName}</TableCell>
                <TableCell>{applicant.surname}</TableCell>
                <TableCell>{applicant.gender}</TableCell>
                <TableCell>{formatDate(applicant.dateOfBirth)}</TableCell>
                <TableCell>{applicant.placeOfBirth}</TableCell>
                <TableCell>{applicant.telephone}</TableCell>
                <TableCell>{applicant.maritalStatus}</TableCell>
                <TableCell>{applicant.spouseName}</TableCell>
                <TableCell>{applicant.spouseContact}</TableCell>
                <TableCell>{applicant.identificationType}</TableCell>
                <TableCell>{applicant.idNumber}</TableCell>
                <TableCell>{formatDate(applicant.dateOfIssue)}</TableCell>
                <TableCell>{formatDate(applicant.expiryDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Optional: Add an action button to go back or refresh */}
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button variant="contained" color="primary">
          Refresh Data
        </Button>
      </Box>
    </Box>
  );
}

export default OnlineApplicant;
