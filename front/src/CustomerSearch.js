import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TextField, Button, CircularProgress, Card, CardContent, Typography, Grid, Alert } from '@mui/material';
import { styled } from '@mui/system';

const Root = styled('div')({
  padding: '2rem',
});

const SearchBox = styled('form')({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
});

const SearchButton = styled(Button)({
  marginLeft: '1rem',
});

const CardStyled = styled(Card)({
  marginBottom: '1rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
});

const ResultsContainer = styled('div')({
  marginTop: '2rem',
});

const NoResults = styled(Typography)({
  textAlign: 'center',
  color: 'grey',
});

const CustomerSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle search request
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5001/search-customers?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Error fetching search results');
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setSearchResults(data);
      } else {
        setError('No customers found');
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error fetching customer data:', err);
      setError('No customers found.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Root>
      {/* Search Header */}
      <div className="text-center mb-4">
        <Typography variant="h4" gutterBottom>
          Customer Search
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Find customers by name or ID
        </Typography>
      </div>

      {/* Search Form */}
      <SearchBox onSubmit={handleSearch}>
        <TextField
          label="Search by name or ID"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
        />
        <SearchButton
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : <FaSearch />}
        </SearchButton>
      </SearchBox>

      {/* Search Results */}
      <ResultsContainer>
        {/* Error Message */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Results */}
        {searchResults.length > 0 ? (
          <Grid container spacing={3}>
            {searchResults.map((customer) => (
              <Grid item xs={12} sm={6} md={4} key={customer.id}>
                <CardStyled>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      Customer ID: {customer.customer_id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>First Name:</strong> {customer.first_name || 'Not available'} <br />
                      <strong>Last Name:</strong> {customer.last_name || 'Not available'} <br />
                      <strong>Contact:</strong> {customer.telephone_number || 'Not available'}
                    </Typography>
                  </CardContent>
                </CardStyled>
              </Grid>
            ))}
          </Grid>
        ) : (
          !error && (
            <NoResults variant="body1" color="textSecondary">
              No customers found. Try a different search query.
            </NoResults>
          )
        )}
      </ResultsContainer>
    </Root>
  );
};

export default CustomerSearch;
