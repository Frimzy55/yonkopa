const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//const mysql = require('mysql2');
const pool = require('./db'); // Adjust path as needed


// Create a pool




const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({ limit: '10mb' })); // Allow larger payloads

// Connect to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CSS2244', // Replace with your database password
  database: 'appbank' // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT id, password FROM login WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Directly compare the passwords (no hashing)
    if (password === user.password) {
      res.status(200).json({ message: 'Login successful', username });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});


// Register endpoint for creating customers
app.post('/register', (req, res) => {
  const {
    title,
    firstName,
    otherNames,
    lastName,
    dateOfBirth,
    placeOfBirth,
    gender,
    maritalStatus,
    formId,
    idNumber,
    dateOfIssue,
    idExpiryDate,
    nationality,
    telephoneNumber,
    residentialLocation,
    suburb,
    residentialGpsAddress,
    alternativeNumber,
    employmentStatus,
    refereeFirstName,
    refereeLastName,
    refereeHouseLocation,
    refereeContact,
    relationshipOfficer
  } = req.body;

  // Validate the required fields
  if (!title || !firstName || !lastName) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  // Insert customer into the database (without customer_id)
  const insertQuery = `INSERT INTO customer (
    title, first_name, other_names, last_name, date_of_birth, place_of_birth, gender, marital_status,
    form_of_id, id_number, date_of_issue, id_expiry_date, nationality, telephone_number, residential_location,
    suburb, residential_gps_address, alternative_number, employment_status, referee_first_name, referee_last_name,
    referee_house_location, referee_contact, relationship_officer
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    title, firstName, otherNames, lastName, dateOfBirth, placeOfBirth, gender, maritalStatus,
    formId, idNumber, dateOfIssue, idExpiryDate, nationality, telephoneNumber, residentialLocation,
    suburb, residentialGpsAddress, alternativeNumber, employmentStatus, refereeFirstName, refereeLastName,
    refereeHouseLocation, refereeContact, relationshipOfficer
  ];

  // Step 1: Insert the customer
  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting customer:', err);
      return res.status(500).send({ message: 'Error inserting customer', error: err });
    }

    // Step 2: Get the generated id and create the padded customer_id
    const customerId = result.insertId; // This gets the AUTO_INCREMENTed id
    const customer_id = customerId.toString().padStart(5, '0'); // Pad the id to 5 digits

    // Step 3: Update the customer_id field in the database
    const updateQuery = 'UPDATE customer SET customer_id = ? WHERE id = ?';
    db.query(updateQuery, [customer_id, customerId], (updateErr) => {
      if (updateErr) {
        console.error('Error updating customer_id:', updateErr);
        return res.status(500).send({ message: 'Error updating customer_id', error: updateErr });
      }

      // Step 4: Send the customer details back as a response
      const customer = {
        customer_id,
        title,
        firstName,
        otherNames,
        lastName,
        dateOfBirth,
        placeOfBirth,
        gender,
        maritalStatus,
        formId,
        idNumber,
        dateOfIssue,
        idExpiryDate,
        nationality,
        telephoneNumber,
        residentialLocation,
        suburb,
        residentialGpsAddress,
        alternativeNumber,
        employmentStatus,
        refereeFirstName,
        refereeLastName,
        refereeHouseLocation,
        refereeContact,
        relationshipOfficer
      };

      res.status(201).json({ message: 'Customer registered successfully', customer });
    });
  });
});



// Search customers endpoint
app.get('/search-customers', (req, res) => {
  const searchQuery = req.query.query;

  // Check if the query parameter exists
  if (!searchQuery) {
    return res.status(400).json({ message: 'Search query is missing' });
  }

  // SQL query to search by first_name, last_name, or customer_id
  const query = `
    SELECT id, customer_id, first_name, last_name ,telephone_number,date_of_birth,relationship_officer
    FROM customer
    WHERE first_name LIKE ? OR last_name LIKE ? OR customer_id LIKE ?  
  `;

  const wildcardSearch = `%${searchQuery}%`;

  db.query(query, [wildcardSearch, wildcardSearch, wildcardSearch, wildcardSearch], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No customers found' });
    }

    res.status(200).json(results);
  });
});











app.post('/loan-application', (req, res) => {
  const {
    customerId,
    firstName,
    lastName,
    telephoneNumber,
    loanProduct,
    creditOfficer,
    loanCycle,
    amountRequested,
    loanTerm,
    loanPurpose,
    loanDuration,
    repaymentCycle,
    guarantorName,
    guarantorNationality,
    guarantorGender,
    guarantorDateOfBirth,
    
    relationshipWithClient,
    residentialLocation,
    residentialGpsAddress,
    businessType,
    businessLocation,
    workingCapital,
    yearsOfOperation,
    businessGpsAddress,
    employerName,
    yearsInService,
    monthlyNetIncome,
    dateOfBirth
    
    
    
    
    
  } = req.body;

  // Validate required fields
  if (!loanProduct || !creditOfficer || !amountRequested) {
    return res.status(400).json({ message: 'Missing required fields: loanProduct, creditOfficer, or amountRequested' });
  }

  // Prepare data for insertion
  const query = `
    INSERT INTO loanapplication (
      customer_id,first_name,last_name,telephone_number,loan_product, credit_officer, loan_cycle, amount_requested, loan_term, loan_purpose,
      loan_duration, repayment_cycle, guarantor_name, guarantor_nationality,
      guarantor_gender, guarantor_date_of_birth, relationship_with_client,
      residential_location, residential_gps_address, business_type, business_location,
      working_capital, years_of_operation, business_gps_address, employer_name,
      years_in_service, monthly_net_income,date_of_birth
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)
  `;

  // Handle missing or optional fields like guarantorPhoto and payslip
  const values = [
    customerId,
    firstName,
    lastName,
    telephoneNumber,
    loanProduct ,
    creditOfficer  ,
    loanCycle ,
    amountRequested ,
    loanTerm ,
    loanPurpose ,
    loanDuration ,
    repaymentCycle ,
    guarantorName ,
    guarantorNationality ,
    guarantorGender ,
    guarantorDateOfBirth ,
    
    relationshipWithClient ,
    residentialLocation ,
    residentialGpsAddress ,
    businessType ,
    businessLocation ,
    workingCapital ,
    yearsOfOperation ,
    businessGpsAddress ,
    employerName  ,
    yearsInService ,
    monthlyNetIncome ,
    dateOfBirth
    
    
    
  ];

  // Execute the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Error inserting loan application' });
    }
    res.status(201).json({ message: 'Loan application created', id: result.insertId });
  });
});




app.get('/loan-application', (req, res) => {
  const query = `
    SELECT 
      customer_id, 
      CONCAT(first_name, ' ', last_name) AS applicant_name, 
      telephone_number, 
      credit_officer, 
      created_at, 
      amount_requested,
      date_of_birth,
      amount_requested
      
      
    FROM loanapplication
  `;

  // Perform the query
  db.query(query, (err, result) => {
    if (err) {
      console.error('Database query failed:', err);
      return res.status(500).send('Error fetching loan applications');
    }
    res.json(result); // Send the result back as a JSON response
  });
});







app.post('/select-customer', (req, res) => {
  const customer = req.body;

  // Ensure that all necessary customer fields are present
  if (!customer.id || !customer.first_name || !customer.last_name) {
    return res.status(400).json({ message: 'Missing required customer data' });
  }

  // SQL query to insert or update the selected customer
  const query = `
    INSERT INTO serach_logs (customer_id, first_name, last_name, telephone_number)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    telephone_number = VALUES(telephone_number)
  `;

  db.query(query, [customer.customer_id, customer.first_name, customer.last_name, customer.telephone_number], (err, result) => {
    if (err) {
      console.error('Error saving customer data:', err);
      return res.status(500).json({ message: 'Error saving customer data', error: err });
    }

    res.status(200).json({ success: true });
  });
});



app.get('/get-existing-ids', async (req, res) => {
  try {
    const ids = await User.find({}, 'idNumber'); // Fetch only the `idNumber` field
    res.json(ids.map((item) => item.idNumber));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch existing IDs' });
  }
});

// Endpoint to handle saving customer data


app.post('/customer', (req, res) => {
  const {
    customer_id,
    applicant_name,
    telephone_number,
    credit_officer,
    date_of_birth,
    branch,
    region,
    amount_requested,
  } = req.body;

  // Format the date to MySQL-compatible format
 

  const query = `
    INSERT INTO customer_details 
    (customer_id, applicant_name, telephone_number, credit_officer, date_of_birth, branch, region, amount_requested)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [customer_id, applicant_name, telephone_number, credit_officer, date_of_birth, branch, region, amount_requested],
    (err, result) => {
      if (err) {
        console.error('Error inserting customer details:', err);
        return res.status(500).json({ error: 'Failed to save customer details' });
      }
      res.status(200).json({ message: 'Customer details saved successfully', data: result });
    }
  );
});



app.post('/api/land', (req, res) => {
  const {
    customer_id,
    location,
    landTitle,
    marketValue,
    ltvRatio,
    nearestLandmark,
    digitalAddress,
    forcedSaleValue,
    ltvRatioPlus10,
  } = req.body;

  const query = `
    INSERT INTO land_details 
    (customer_id,location, land_title, market_value, ltv_ratio, nearest_landmark, digital_address, forced_sale_value, ltv_ratio_plus_10)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
  `;

  db.query(
    query,
    [customer_id,location, landTitle, marketValue, ltvRatio, nearestLandmark, digitalAddress, forcedSaleValue, ltvRatioPlus10],
    (err, result) => {
      if (err) {
        console.error('Error inserting land details:', err);
        return res.status(500).json({ error: 'Failed to save land details' });
      }
      res.status(200).json({ message: 'Land details saved successfully', data: result });
    }
  );
});


app.post('/api/vehicle', (req, res) => {
  const { customer_id, vbrand, vchasiss, vmodelyeaar, vmarket, vltvRatio, vmodel, vregister, vmileage, vforcedSaleValue, vltvRatioPlus10 } = req.body;

  const query = `INSERT INTO vehicle_details (customer_id, brand, chassis_number, model_year, market_value, ltv_ratio, model, registration_number, mileage, forced_sale_value, ltv_ratio_plus_10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [customer_id, vbrand, vchasiss, vmodelyeaar, vmarket, vltvRatio, vmodel, vregister, vmileage, vforcedSaleValue, vltvRatioPlus10];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.status(200).send('Vehicle details added successfully');
  });
});


app.post('/api/build', (req, res) => {
  const { customer_id, blocation, blandTitle, bmarketValue, bltvRatio, bnearestLandmark, bdigitalAddress, bforcedSaleValue, bltvRatioPlus10 } = req.body;

  const query = `INSERT INTO build_details (customer_id, location, land_title, market_value, ltv_ratio, nearest_landmark, digital_address, forced_sale_value, ltv_ratio_plus_10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [customer_id, blocation, blandTitle, bmarketValue, bltvRatio, bnearestLandmark, bdigitalAddress, bforcedSaleValue, bltvRatioPlus10];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.status(200).send('Build details added successfully');
  });
});


app.post('/api/cash', (req, res) => {
  const { customer_id, cash_amount } = req.body;

  const query = `INSERT INTO cash_details (customer_id, cash_amount) VALUES (?, ?)`;

  const values = [customer_id, cash_amount];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Database error');
    }
    res.status(200).send('Cash data added successfully');
  });
});



// Server listening on port 5002
app.listen(5001, () => {
  console.log('Server is running on port 5002');
});
