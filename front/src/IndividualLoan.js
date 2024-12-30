import React, { useState, useEffect } from 'react';
import './IndividualLoan.css';
import CustomerDetails from './CustomerDetails';
import CollateralDetails from './CollateralDetails';
import CreditWorthDetail from './CreditWorthDetail';
import Comment from './Comment';
//import CreateNewApplication from './CreateNewApplication';
import PersonalLoan from './PersonalLoan';  // Import the new submenu component
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './App.css';
import {
  Menu,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  InputAdornment
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const IndividualLoan = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [stage, setStage] = useState('customer'); // Track current stage
  const [anchorEl, setAnchorEl] = useState(null); // For the action dropdown menu
  const [actionCustomerIndex, setActionCustomerIndex] = useState(null);

  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Entries per page

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await fetch('http://localhost:5001/loan-application');
        const data = await response.json();
        setLoanApplications(data);
        setFilteredApplications(data);
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      }
    };

    fetchLoanApplications();
  }, []);

  const handleSearch = () => {
    const filtered = loanApplications.filter((application) =>
      ['customer_id', 'applicant_name', 'telephone_number', 'credit_officer', 'created_at', 'amount_requested', 'residential_location'].some((field) =>
        application[field]
          ? application[field].toString().replace(/[\$,]/g, '').toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    );
    setFilteredApplications(filtered);
  };

  const handleActionClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setActionCustomerIndex(index);
  };

  const handleActionSelect = (action) => {
    switch (action) {
      case 'Proceed':
        setSelectedCustomerIndex(actionCustomerIndex);
        setStage('customer');
        break;
      case 'Skip Assessment':
        alert(`Skipping assessment for customer ID: ${loanApplications[actionCustomerIndex].customer_id}`);
        break;
      case 'Reprocess':
        setSelectedCustomerIndex(actionCustomerIndex); // Store the customer index for reprocessing
        setStage('createNewApplication'); // Switch to the create new application stage
        break;
      default:
        break;
    }
    setAnchorEl(null); // Close the dropdown menu after selection
  };

  const handleNext = () => {
    if (stage === 'customer') {
      setStage('collateral');
    } else if (stage === 'collateral') {
      setStage('creditWorth');
    } else if (stage === 'creditWorth') {
      setStage('comment');
    } else {
      alert('You are at the final stage');
    }
  };

  const handleBack = () => {
    if (stage === 'collateral') {
      setStage('customer');
    } else if (stage === 'creditWorth') {
      setStage('collateral');
    } else if (stage === 'comment') {
      setStage('creditWorth');
    } else if (stage === 'createNewApplication') {
      setStage('customer'); // Return to customer details stage
    } else {
      setSelectedCustomerIndex(null); // Return to table view
      setStage('customer');  // Ensure you're back at the loan list stage
    }
  };

  const handleEntriesChange = (e) => setEntriesPerPage(Number(e.target.value));

  const formatDate = (dateString) => moment(dateString).format('MM/DD/YYYY');

  const displayedApplications = filteredApplications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <div className="individual-loan-section" style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
      <h3>Credit Assessment</h3>
      <p>Pending Assessment Credit</p>
      <div className="search-section">
        {/* Material-UI Search Input */}
        <TextField
          variant="outlined"
          placeholder="Search by Customer ID, Name, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on enter key press
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Button onClick={handleSearch} variant="contained" color="primary">
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="main-content">
        {selectedCustomerIndex !== null && stage !== 'createNewApplication' && (
          <>
            {stage === 'customer' && (
              <CustomerDetails
                customer={loanApplications[selectedCustomerIndex]}
                onNext={handleNext}
                onBack={handleBack}
                hasNext={true}
              />
            )}

            {stage === 'collateral' && (
              <CollateralDetails
                customer={loanApplications[selectedCustomerIndex]}
                onNext={handleNext}
                onBack={handleBack}
                hasNext={true}
              />
            )}

            {stage === 'creditWorth' && (
              <CreditWorthDetail
                customer={loanApplications[selectedCustomerIndex]}
                onNext={handleNext}
                onBack={handleBack}
                hasNext={true}
              />
            )}

            {stage === 'comment' && (
              <Comment
                customer={loanApplications[selectedCustomerIndex]}
                onNext={handleNext}
                onBack={handleBack}
                hasNext={false}
              />
            )}
          </>
        )}

        {/* Render CreateNewApplication as a submenu */}
        {stage === 'createNewApplication' && (
          <PersonalLoan
            customerId={loanApplications[selectedCustomerIndex].customer_id}
            onBack={handleBack}
          />
        )}

        {selectedCustomerIndex === null && stage !== 'createNewApplication' && (
          <div className="loan-table-section">
            <div className="entries-per-page-section mb-3">
              <label htmlFor="entriesPerPage" className="form-label">
                Show
              </label>
              <select
                id="entriesPerPage"
                className="form-select form-select-sm w-auto"
                value={entriesPerPage}
                onChange={handleEntriesChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span> entries</span>
            </div>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Customer ID</TableCell>
                    <TableCell>Applicant Name</TableCell>
                    <TableCell>Contact Number</TableCell>
                    <TableCell>Credit Officer</TableCell>
                    <TableCell>Application Date</TableCell>
                    <TableCell>Loan Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedApplications.length > 0 ? (
                    displayedApplications.map((application, index) => (
                      <TableRow key={application.customer_id}>
                        <TableCell>
                          <Tooltip title="Actions">
                            <IconButton onClick={(e) => handleActionClick(e, index)}>
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                          <Menu
                            anchorEl={anchorEl}
                            open={anchorEl && actionCustomerIndex === index}
                            onClose={() => setAnchorEl(null)}
                          >
                            <MenuItem onClick={() => handleActionSelect('Proceed')}>Proceed</MenuItem>
                            <MenuItem onClick={() => handleActionSelect('Skip Assessment')}>Skip Assessment</MenuItem>
                            <MenuItem onClick={() => handleActionSelect('Reprocess')}>Reprocess</MenuItem>
                          </Menu>
                        </TableCell>
                        <TableCell>{application.customer_id}</TableCell>
                        <TableCell>{application.applicant_name}</TableCell>
                        <TableCell>{application.telephone_number}</TableCell>
                        <TableCell>{application.credit_officer}</TableCell>
                        <TableCell>{formatDate(application.created_at)}</TableCell>
                        <TableCell>{application.amount_requested}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>No records found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 50]}
              component="div"
              count={filteredApplications.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualLoan;
