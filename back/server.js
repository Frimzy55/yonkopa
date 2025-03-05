const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//const mysql = require('mysql2');
const pool = require('./db'); // Adjust path as needed
const cron = require('node-cron');
//const { Customer } = require('./models');
const moment = require("moment"); // Make sure moment is imported
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    relationshipOfficer,

     fathersName,
      mothersName,
      spouseOccupation,
      fathersContact,
      mothersContact,
      religion,

      spouseName,
      churchName,
      churchLocation,

      spouseContact,
      numberOfDependants,
      numberOfDependantsSchooling
  } = req.body;

  // Validate the required fields
  if (!title || !firstName || !lastName) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  // Insert customer into the database (without customer_id)
  const insertQuery = `INSERT INTO customer (
    title, first_name, other_names, last_name, date_of_birth, place_of_birth, gender, marital_status,
    form_of_id, id_number, date_of_issue, id_expiry_date, home_town, telephone_number, residential_location,
    street_name, residential_gps_address, residential_address, employment_status, referee_first_name, referee_last_name,
    referee_house_location, referee_contact, relationship_officer ,fathersName, mothersName,spouseOccupation,fathersContact,
     mothersContact, religion,spouseName,churhName,churchLocation,spouseContact, number_of_dependants, number_of_dependants_schooling
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?,?,?,?,?,?  ,?,?,? ,?,?,?)`;

  const values = [
    title, firstName, otherNames, lastName, dateOfBirth, placeOfBirth, gender, maritalStatus,
    formId, idNumber, dateOfIssue, idExpiryDate, nationality, telephoneNumber, residentialLocation,
    suburb, residentialGpsAddress, alternativeNumber, employmentStatus, refereeFirstName, refereeLastName,
    refereeHouseLocation, refereeContact, relationshipOfficer,fathersName, mothersName,spouseOccupation,fathersContact,
     mothersContact, religion, spouseName, churchName,churchLocation,spouseContact,numberOfDependants,
     numberOfDependantsSchooling
    
     
    
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
   SELECT *
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
    guarantorLocation,
    guarantorResidentialGpsAddress,
    businessType,
    businessLocation,
    workingCapital,
    yearsOfOperation,
    businessGpsAddress,
    employerName,
    yearsInService,
    monthlyNetIncome,
    dateOfBirth,
    residentialLocation,
    residentialGpsAddress,
    guarantorContact
    
    
    
    
    
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
      years_in_service, monthly_net_income,date_of_birth,customer_location,customer_gps_address,guarantor_contact 
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)
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
    guarantorLocation ,
    guarantorResidentialGpsAddress ,
    businessType ,
    businessLocation ,
    workingCapital ,
    yearsOfOperation ,
    businessGpsAddress ,
    employerName  ,
    yearsInService ,
    monthlyNetIncome ,
    dateOfBirth,
    residentialLocation,
    residentialGpsAddress,
    guarantorContact
    
    
    
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
      amount_requested,
      customer_location,
      customer_gps_address,

      guarantor_name,
      guarantor_nationality,
      guarantor_gender,
      guarantor_date_of_birth,
      relationship_with_client,
      residential_location,
      residential_gps_address,
      guarantor_contact
      
      
      
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
    customer_location,
    customer_gps_address,
    guarantor_name,
    guarantor_nationality,
    guarantor_gender,
    guarantor_date_of_birth,
    relationship_with_client,
    residential_location,
    residential_gps_address,
    guarantor_contact
  } = req.body;

  // Format the date to MySQL-compatible format
 

  const query = `
    INSERT INTO customer_details 
    (customer_id, applicant_name, telephone_number, credit_officer, date_of_birth, branch, region, 
    amount_requested,customer_location,customer_gps_address,guarantor_name,guarantor_nationality,
    guarantor_gender,guarantor_date_of_birth,relationship_with_client,residential_location,residential_gps_address,guarantor_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    query,
    [customer_id, applicant_name, telephone_number, credit_officer, date_of_birth, branch, 
      region, amount_requested,customer_location,customer_gps_address,guarantor_name,
      guarantor_nationality,guarantor_gender,guarantor_date_of_birth,relationship_with_client,residential_location,residential_gps_address,guarantor_contact],
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
    (customer_id,location, land_title, market_value, Itv_ratio, nearest_landmark, digital_address, forced_sale_value, Itv_ratio_plus_10)
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

  const query = `INSERT INTO vehicle_details (customer_id, brand, chassis_number, model_year, market_value, Itv_ratio, model, registration_number, mileage, forced_sale_value, Itv_ratio_plus_10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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

  const query = `INSERT INTO build_details (customer_id, location, land_title, market_value, Itv_ratio, nearest_landmark, digital_address, forced_sale_value, Itv_ratio_plus_10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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




app.post("/api/credit", (req, res) => {
  const {
    customer_id,
    isCreditworthy,
    businessType,
    businessLocation,
    businessStartDate,
    nearestLandmark,
    businessDescription,
    canPayLoan,
    currentStockValue,
    startedBusinessWith,
    sourceOfFund,
    principal,
    rate,
    loanTerm,
    loanAmount,
    interest,
    monthlyInstallment,
    monthlySalesRevenue,
    grossMarginInput,
    grossProfit,
    costOfGoodsSold,
    totalOperatingExpenses,
    netBusinessProfit,
    householdExpensesInput,
    otherIncomeInput,
    loanRe,
    householdSurplus,
    surplus,
        
    surplusInterpretation
  } = req.body;

  const sql = `
    INSERT INTO business_loans (
      customer_id, isCreditworthy, businessType, businessLocation, businessStartDate, nearestLandmark,
      businessDescription, canPayLoan, currentStockValue, startedBusinessWith, sourceOfFund,
      principal, rate, loanTerm, loanAmount, interest, monthlyInstallment, monthlySalesRevenue,
      grossMarginInput, grossProfit, costOfGoodsSold, totalOperatingExpenses, netBusinessProfit,
      householdExpensesInput, otherIncomeInput, loanRe, householdSurplus,capacity_to_pay_analysis,results
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)
  `;

  const values = [
    customer_id, isCreditworthy, businessType, businessLocation, businessStartDate, nearestLandmark,
    businessDescription, canPayLoan, currentStockValue, startedBusinessWith, sourceOfFund,
    principal, rate, loanTerm, loanAmount, interest, monthlyInstallment, monthlySalesRevenue,
    grossMarginInput, grossProfit, costOfGoodsSold, totalOperatingExpenses, netBusinessProfit,
    householdExpensesInput, otherIncomeInput, loanRe, householdSurplus, surplus, surplusInterpretation
        
    
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Failed to insert data" });
    } else {
      res.status(201).json({ message: "Business loan added successfully", id: result.insertId });
    }
  });
});



app.post('/api/comments', (req, res) => {
  const { customer_id, comment } = req.body;
  if (!customer_id || !comment) {
    return res.status(400).json({ message: 'Customer ID and comment are required.' });
  }
  const query = 'INSERT INTO comments (customer_id, comment) VALUES (?, ?)';
  db.promise().query(query, [customer_id, comment])
    .then(([results]) => {
      console.log('Comment saved:', results);
      res.status(201).json({ message: 'Comment saved successfully!', id: results.insertId });
    })
    .catch((error) => {
      console.error('Error saving comment:', error);
      res.status(500).json({ message: 'Failed to save comment. Please try again.' });
    });
});




app.post('/api/submit', (req, res) => {
  // Step 1: SQL to create the temporary table
  const createTempTableQuery = `
  

SELECT 
  c.customer_id,
  c.applicant_name,
  c.telephone_number,
  c.credit_officer,
  c.amount_requested,
  c.customer_location,
  c.customer_gps_address,
  c.guarantor_name,
  c.residential_location,
  c.relationship_with_client,
  c.residential_gps_address,
  c.guarantor_date_of_birth,
  c.guarantor_contact,
  c.created_at,
  a.cash_amount,  
  b.businessType,
  b.businessLocation,
  co.comment,
  b.monthlyInstallment,
  b.monthlySalesRevenue,
  b.grossProfit,
  b.costOfGoodsSold,
  b.totalOperatingExpenses,
  b.netBusinessProfit,
  b.householdExpensesInput,
  b.otherIncomeInput,
  b.loanRe ,
  b.householdSurplus,
  b.businessStartDate, 
  b.nearestLandmark, 
  b.businessDescription, 
  b.currentStockValue, 
  b.startedBusinessWith, 
  b.sourceOfFund, 
  b.principal,
  b.rate,
  b.grossMarginInput,
  b.grossProfit,
  b.costOfGoodsSold,
  b.totalOperatingExpenses,
  b.netBusinessProfit,
  b.householdExpensesInput,
  b.otherIncomeInput,
  b.loanRe,
  b.householdSurplus,
  b.loanTerm,
  b.loanAmount,
  b.interest,
  b.capacity_to_pay_analysis,
  b.results,
  bu.location,  -- Added build_details columns
  bu.land_title,
  bu.market_value,
  bu.Itv_ratio,
  bu.Itv_ratio_plus_10,
  bu.nearest_landmark,
  bu.digital_address,
  bu.forced_sale_value,
  v.brand,
  v.chassis_number,
  v.model_year,
  v.market_value,
  V.model,
  v.registration_number,
  v.mileage,
  v.forced_sale_value,
  v.Itv_ratio,
  v.Itv_ratio_plus_10,
  l.location,
  l.land_title,
  l.market_value,
  l.Itv_ratio,
  l.Itv_ratio_plus_10,
  l.nearest_landmark,
  l.digital_address,
  l.forced_sale_value
  
FROM 
  customer_details c
  
  INNER JOIN business_loans b ON c.customer_id = b.customer_id
  INNER JOIN comments co ON c.customer_id = co.customer_id
  LEFT JOIN build_details bu ON c.customer_id = bu.customer_id-- Added LEFT JOIN for build_details
  LEFT JOIN vehicle_details v ON c.customer_id = v.customer_id
  LEFT JOIN cash_details a ON c.customer_id = a.customer_id
  LEFT JOIN land_details l ON c.customer_id = l.customer_id
  
  `;


  const selectQuery = `
    SELECT 
      c.customer_id AS customerId,
      c.applicant_name AS fullName,
      c.date_of_birth AS dateOfBirth,
      c.telephone_number AS telephoneNumber,
      c.customer_location AS residentialAddress,
      c.customer_gps_address AS gpsAddress,
       c.amount_requested AS amountRequested,
       c.guarantor_name AS guarantorName,
       c.residential_location AS guarantorResidential,
       c.residential_gps_address AS guarantorGpsAddress,
       c.guarantor_date_of_birth AS guarantorDateOfBirth,
       c.guarantor_contact AS guarantorContact,
      c.relationship_with_client AS relationship,
      c.created_at AS applicantDate,
      b.principal AS principal,
       b.businessType AS businessType,
       b.businessLocation AS businessLocation,
       b.monthlyInstallment AS monthlyInstallment,
       b.monthlySalesRevenue AS monthlySalesRevenue,
        b.businessStartDate AS businessStartDate,
        b.nearestLandmark AS nearestLandmark,
        b.businessDescription AS businessDescription,
         b.currentStockValue AS currentStockValue,
         b.startedBusinessWith AS startedBusinessWith,
         b.sourceOfFund AS sourceOfFund,
         b.rate AS rate,
         b.loanTerm AS loanTerm,
         b.loanAmount AS loanAmount,
         b.interest AS interest,
         b.householdSurplus AS householdSurplus ,
         b.grossMarginInput AS grossMarginInput,
         b.grossProfit AS grossProfit,
         b.costOfGoodsSold AS costOfGoodsSold,
         b.totalOperatingExpenses AS totalOperatingExpenses,
         b.netBusinessProfit AS netBusinessProfit,
         b.householdExpensesInput AS householdExpenseInput,
         b.otherIncomeInput AS otherIncomeInput,
         b.loanRe AS loanRecommendation ,
         co.comment AS comment,
         bu.location AS Buildinglocation,
         bu.land_title AS BuildinglandTitle,
         bu.market_value AS BuildingMarketValue,
         bu.Itv_ratio AS BuildingItv_ratio,
         bu.Itv_ratio_plus_10 AS BuildingItv_ratio_plus_10,
         bu.nearest_landmark AS BuildingNearest_landmark,
        bu.digital_address AS BuldingdigitalAddress,
        bu.forced_sale_value AS forceSale,
         b.capacity_to_pay_analysis AS SurplusOrDeficit,
         b.results AS results,
         a.cash_amount AS cashAmount,
          v.brand AS VehicleBrand,
          v.chassis_number AS Vehicle_Chassis_number,
          v.model_year AS Vehicle_model_year,
          v.market_value AS Vehicle_market_value,
          v.model AS VehicleModel,
          v.registration_number AS Vehicle_registration_number,
          v.mileage AS Vehiclemileage,
          v.forced_sale_value AS Vehicle_forced_sale_value,
          v.Itv_ratio AS Vehicle_ltv_ratio,
          v.Itv_ratio_plus_10 AS Vehicle_ltv_ratio_plus_10,
          l.location AS Landlocation,
          l.land_title AS title,
          l.market_value AS LandmarketValue,
          l.Itv_ratio AS LandItv_ratio,
          l.Itv_ratio_plus_10 AS LandItv_ratio_plus_10,
          l.nearest_landmark AS Landnearest_landmark,
          l.digital_address AS Landdigital_address,
          l.forced_sale_value AS Landforced_sale_value
         
    FROM 
      customer_details c
      LEFT JOIN cash_details a ON c.customer_id = a.customer_id
      INNER JOIN business_loans b ON c.customer_id = b.customer_id
      INNER JOIN comments co ON c.customer_id = co.customer_id
      LEFT JOIN vehicle_details v ON c.customer_id = v.customer_id
      LEFT JOIN build_details bu ON c.customer_id = bu.customer_id 
       LEFT JOIN land_details l ON c.customer_id = l.customer_id
      
  `;

  // Execute the first query to create the temporary table
  db.query(createTempTableQuery, (err) => {
    if (err) {
      console.error('Error creating temporary table:', err);
      return res.status(500).send('Error creating temporary table');
    }

    // Execute the second query to fetch data from the temporary table
    db.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching data from temporary table:', err);
        return res.status(500).send('Error fetching data from temporary table');
      }

      // Send the results back to the frontend
      res.status(200).json(results);
    });
  });
});




app.post('/check-id-number', (req, res) => {
  const { idNumber } = req.body;

  const query = `SELECT id FROM customer WHERE id_number = ?`;
  
  db.execute(query, [idNumber], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length > 0) {
      return res.json({ isUnique: false });  // ID is already in use
    }

    return res.json({ isUnique: true });  // ID is unique
  });
});


app.get('/get-loan-cycle-count/:customerId', (req, res) => {
  const customerId = req.params.customerId;

  // Logic to retrieve loan cycle count from the database
  const query = `SELECT COUNT(*) AS loanCycleCount FROM loanapplication WHERE customer_id = ?`;
  
  db.query(query, [customerId], (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Error retrieving loan cycle count' });
    }

    let loanCycleCount = result[0].loanCycleCount || 0; // Default to 1 if no cycles found

    // Increase the loan cycle count by 1
    loanCycleCount++;

    res.send({ loanCycleCount });
  });
});



app.get('/total-registrants', (req, res) => {
  // Query to get the total number of registrants
  db.query('SELECT COUNT(*) AS totalCount FROM customer', (err, results) => {
    if (err) {
      console.error('Error fetching total registrants:', err);
      return res.status(500).send('Error fetching total registrants');
    }
    
    // Return the total registrants count as JSON
    res.json({ totalCount: results[0].totalCount });
  });
});




app.post('/save-custom', (req, res) => {
  const {
    customerId,
   
    fullName,
    telephoneNumber,
    dateOfBirth,
    residentialAddress,
    gpsAddress,
    chairComment,
    chairApproval,
    guarantorName,
    guarantorDateOfBirth,
    guarantorContact,
    relationship,
    guarantorResidential,
    guarantorGpsAddress,
    principal,
    rate,
    loanTerm,
    loanAmount,
    interest,
    monthlyInstallment,
    grossMarginInput,
    monthlySalesRevenue,
    costOfGoodsSold,
    grossProfit,
    totalOperatingExpenses,
    netBusinessProfit,
    householdExpenseInput,
    otherIncomeInput,
    householdSurplus,
    loanRecommendation,
    SurplusOrDeficit,
    results,
    Buildinglocation,
    BuildingItv_ratio,
    BuildingItv_ratio_plus_10,
    BuildinglandTitle,
    BuildingMarketValue,
    BuildingNearest_landmark,

    BuldingdigitalAddress,
    forceSale,
    cashAmount,
    applicantDate,
    VehicleBrand,
    Vehicle_Chassis_number,
    Vehicle_model_year,
    Vehicle_market_value,
    VehicleModel,

    Vehicle_registration_number,
    Vehiclemileage,
    Vehicle_forced_sale_value,
    Vehicle_ltv_ratio,
    Vehicle_ltv_ratio_plus_10,

    Landlocation,
    title,
    LandmarketValue,
    LandItv_ratio,
    LandItv_ratio_plus_10,
    Landnearest_landmark,
    Landdigital_address,
    Landforced_sale_value


  

  } = req.body;

  const query = `
    INSERT INTO approval1
    (customer_id, full_name, telephone_number, date_of_birth, residential_address,
    gps_address, chair_comment, chair_approval ,gurantor_name,guarantor_date_of_birth, 
    guarantor_contact,relationship_with_client,guarantor_residential,guarantor_gps_address,principal,rate,loanTerm,
    loanAmount,interest,monthly_installment,gross_margin, monthly_sales_revenue,cost_of_goods_sold ,gross_profit,
     total_operating_expenses ,net_business_profit,  household_expenses,other_income,household_surplus , loan_recommendation,
     capacity_to_pay_analysis,results,building_location,building_itv_ratio,building_itv_ratio_10,building_land_title,
      building_market_value,building_nearest_landmark,building_digital_address,building_force_salevalue,cash_amount,applicant_date,
      vehicle_brand, vehicle_chassis_number, vehicle_model_year, vehicle_market_value,vehicle_model, vehicle_registration_number,
      vehicle_mileage,vehicle_force_sale_value, vehicle_Itv_ratio,vehicle_Itv_ratio_plus_10 ,
      land_location,land_title, land_market_value, land_nearest_landmark, land_digital_address ,land_sale_value, land_Itv_ratio,
      land_Itv_ratio_plus_10 ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?  ,?,?,?,?,?  ,?,?,?,?,?,  ?,?,?,?,?,?,?,?)
  `;

  db.query(query, [
    customerId,
    fullName,
    telephoneNumber,
    dateOfBirth,
    residentialAddress,
    gpsAddress,
    
    chairComment,
    chairApproval,
    guarantorName,
    guarantorDateOfBirth,
    guarantorContact,
    relationship,
    guarantorResidential,
    guarantorGpsAddress,
    principal,
    rate,
    loanTerm,
    loanAmount,
    interest,
    monthlyInstallment,
    grossMarginInput,
    monthlySalesRevenue,
    costOfGoodsSold,
    grossProfit,
    totalOperatingExpenses,
    netBusinessProfit,
    householdExpenseInput,
    otherIncomeInput,
    householdSurplus,
    loanRecommendation,
    SurplusOrDeficit,
    results,
    Buildinglocation,
    BuildingItv_ratio,
    BuildingItv_ratio_plus_10,
    BuildinglandTitle,
    BuildingMarketValue,
    BuildingNearest_landmark,
     BuldingdigitalAddress,
     forceSale,
     cashAmount,
     applicantDate,
     VehicleBrand,
    Vehicle_Chassis_number,
    Vehicle_model_year,
    Vehicle_market_value,
    VehicleModel,

    Vehicle_registration_number,
    Vehiclemileage,
    Vehicle_forced_sale_value,
    Vehicle_ltv_ratio,
    Vehicle_ltv_ratio_plus_10,


    Landlocation,
    title,
    LandmarketValue,
    LandItv_ratio,
    LandItv_ratio_plus_10,
    Landnearest_landmark,
    Landdigital_address,
    Landforced_sale_value
     


  ], (error, results) => {
    if (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ message: 'Failed to save data' });
    } else {
      res.status(200).json({ message: 'Data saved successfully!' });
    }
  });
});





app.get('/save-custom', (req, res) => {
  const query = `
    SELECT *
     
      
    FROM approval1
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


const promiseConnection = db.promise();


app.delete('/customers/:id', (req, res) => {
  const customerId = req.params.id;

  // Start a transaction
  promiseConnection.beginTransaction()
    .then(() => {
      // Insert customer data from approval1 into new_table
      const insertQuery = `
        INSERT INTO dibursed
        SELECT * FROM approval1 WHERE customer_id = ?;
      `;
      return promiseConnection.query(insertQuery, [customerId]);
    })
    .then((insertResult) => {
      // If the insert was successful, delete the customer from approval1
      const deleteQuery = 'DELETE FROM approval1 WHERE customer_id = ?';
      return promiseConnection.query(deleteQuery, [customerId]);
    })
    .then((deleteResult) => {
      if (deleteResult.affectedRows === 0) {
        // If no rows were deleted, the customer was not found
        return promiseConnection.rollback().then(() => {
          res.status(404).json({ message: 'Customer not found' });
        });
      }

      // Commit the transaction
      return promiseConnection.commit().then(() => {
        res.status(200).json({ message: 'Customer data moved and deleted successfully' });
      });
    })
    .catch((error) => {
      // Rollback the transaction if any error occurs
      promiseConnection.rollback().then(() => {
        console.error('Error during transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
    });
});



/*app.get("/disbursed-customers", (req, res) => {
  const query = "SELECT * FROM dibursed"; // Adjust your table and query as needed
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: ", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(results);
    }
  });
}); */

app.get("/disbursed-customers", (req, res) => {
  const { dateFrom, dateTo, productType } = req.query; // Get the productType parameter

  // Ensure from and to dates are in 'YYYY-MM-DD' format
  const formattedFrom = moment(dateFrom).startOf("day").format("YYYY-MM-DD HH:mm:ss");
  const formattedTo = moment(dateTo).endOf("day").format("YYYY-MM-DD HH:mm:ss");

  // Start building the query
  let query = `
    SELECT * FROM dibursed
    WHERE disbursed_at BETWEEN ? AND ? 
  `;

  // Add product type filter if it is specified
  const queryParams = [formattedFrom, formattedTo];

  if (productType) {
    query += ` AND loan_type = ?`;  // Assuming the column for loan type in your table is "loan_type"
    queryParams.push(productType);
  }

  // Execute the query
  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching data" });
    }
    res.json(results);
  });
});

app.get("/disbursed-custom", (req, res) => {
  const query = "SELECT * FROM dibursed"; // Adjust your table and query as needed
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: ", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(results);
    }
  });
}); 




/*app.get("/disbursed-customers", (req, res) => {
  const { fromDate, toDate, productType, filterBy } = req.query;

  let query = `SELECT * FROM dibursed WHERE ${filterBy === "disbursed_date" ? "disbursed_at" : "applicant_date"} BETWEEN '${fromDate}' AND '${toDate}'`;

  // Apply product type filter if provided
  if (productType) {
    query += ` AND product_type = '${productType}'`;
  }

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
}); */

app.delete('/customers1/:id', (req, res) => {
  const customerId = req.params.id;

  // Start a transaction
  promiseConnection.beginTransaction()
    .then(() => {
      // Insert customer data from approval1 into new_table
      const insertQuery = `
        INSERT INTO reject
        SELECT * FROM approval1 WHERE customer_id = ?;
      `;
      return promiseConnection.query(insertQuery, [customerId]);
    })
    .then((insertResult) => {
      // If the insert was successful, delete the customer from approval1
      const deleteQuery = 'DELETE FROM approval1 WHERE customer_id = ?';
      return promiseConnection.query(deleteQuery, [customerId]);
    })
    .then((deleteResult) => {
      if (deleteResult.affectedRows === 0) {
        // If no rows were deleted, the customer was not found
        return promiseConnection.rollback().then(() => {
          res.status(404).json({ message: 'Customer not found' });
        });
      }

      // Commit the transaction
      return promiseConnection.commit().then(() => {
        res.status(200).json({ message: 'Customer data moved and deleted successfully' });
      });
    })
    .catch((error) => {
      // Rollback the transaction if any error occurs
      promiseConnection.rollback().then(() => {
        console.error('Error during transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
    });
});


// server.js
app.get("/rejected-loans", (req, res) => {
  const query = "SELECT * FROM reject"; // Adjust this query to match your database structure
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching rejected loans: ", err);
      res.status(500).json({ error: "Failed to fetch rejected loans" });
    } else {
      res.json(results);
    }
  });
});





app.delete('/delete-customer-data/:customerId', async (req, res) => {
  const customerId = req.params.customerId;

  const queries = [
    'DELETE FROM customer_details WHERE customer_id = ?',
    'DELETE FROM business_loans WHERE customer_id = ?',
    'DELETE FROM cash_details WHERE customer_id = ?',
    'DELETE FROM build_details WHERE customer_id = ?',
    'DELETE FROM vehicle_details WHERE customer_id = ?',
    'DELETE FROM land_details WHERE customer_id = ?',
    'DELETE FROM comments WHERE customer_id = ?',
  ];

  try {
    // Start a transaction
    await db.promise().beginTransaction();

    // Execute all delete queries concurrently using Promise.all
    const deletePromises = queries.map(query => db.promise().query(query, [customerId]));

    // Wait for all delete operations to finish
    await Promise.all(deletePromises);

    // Commit the transaction
    await db.promise().commit();

    // Send response to the client
    res.status(200).send('Rows deleted successfully');
  } catch (error) {
    // Rollback in case of an error
    await db.promise().rollback();
    console.error('Error deleting rows:', error);
    res.status(500).send('Failed to delete rows');
  }
  // Do NOT close the connection here (no db.end())
});



app.post('/loans-application', (req, res) => {
  const formData = req.body;

  // Ensure no undefined values are passed, replace undefined with null
  const sanitize = (value) => (value === undefined ? null : value);

  const query = `
      INSERT INTO loan
      (customer_id, first_name, last_name, date_of_birth, telephone_number, form_of_id, id_number, date_of_issue,
       id_expiry_date, street_name, residential_gps_address, 
      residential_location, residential_address, home_town, name_of_church, church_location, name_of_spouse, 
      spouse_contact, number_of_dependants, number_of_dependants_schooling,
       religion, name_of_father, father_phone_number, name_of_mother, mother_phone_number,
       BusinessName,BusinessSector,BusinessLandmark,BusinessLocation,TypeOfBusiness,Businessgps,BusinessCapital,BusinessStockValue,cash,
       AccountReceivables,AccountPayables,MaxSalesPerDay,MinSalesPerDay,NumberOfEmployees,ThirdPartyName,ThirdPartyContact,
       loan_amount, loan_purpose, loan_term, monthly_installment,
      repayment_frequency, repayment_amount, repayment_period,
      previous_loan_request, previous_loan_approved, expected_due_date,
      actual_due_date, ref_fullname1, ref_relationship1, ref_location1, ref_telephone1,
      gfullname,grelationshipClient,gdateOfBirth,ghometown,ggender,gmaritalStatus,
      gnumberOfDependants,
    gtelephoneNumber,
    gidType,
    gidNumber,
    gplaceOfWorship,
    gresidentialLocation,
    gresidentialStatus,
    ggpsAddress,
    gmajorLandmark,
    gbusinessStructure,
    gbusinessCapital,
    gbusinessStockValue,
    gguarantorBusinessLocation,
    gguarantorBusinessGps,
    credit_officer
      


      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,  ?,  ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?  ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?  ,?,?,? ,?,?,?   ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `;

  const values = [
      sanitize(formData.customerId), sanitize(formData.firstName), sanitize(formData.lastName), sanitize(formData.dateOfBirth),
      sanitize(formData.telephoneNumber), sanitize(formData.typeOfId), sanitize(formData.idNumber), sanitize(formData.dateOfIssue),
      sanitize(formData.expiryDate), sanitize(formData.streetName), sanitize(formData.residentialGps), sanitize(formData.residentialLocation),
      sanitize(formData.residentialAddress), sanitize(formData.homeTown), sanitize(formData.nameOfChurch), sanitize(formData.ChurchLocation),
      sanitize(formData.nameOfSpouse), sanitize(formData.spouseContact), sanitize(formData.number_of_dependants), sanitize(formData.number_of_dependants_schooling),
      sanitize(formData.religion), sanitize(formData.fathersName), sanitize(formData.fathersContact), sanitize(formData.mothersName), sanitize(formData.mothersContact),
      sanitize(formData.businessName), 
      sanitize(formData.businessSector), 
      sanitize(formData.businessLandmark), 
      sanitize(formData.businessLocation),
      sanitize(formData.typeOfBusiness), 
      sanitize(formData.businessGps), 
      sanitize(formData.businessCapital), 
      sanitize(formData.businessStock), 
      sanitize(formData.cash), 
      sanitize(formData.account), 
      sanitize(formData.payable), 
      sanitize(formData.max), 
      sanitize(formData.min),
      sanitize(formData.emp), 
      sanitize(formData.thirdParty),
      sanitize(formData.thirdPartyContact),
    sanitize(formData.loanAmount),
      sanitize(formData.loanPurpose),
      sanitize(formData.loanTerm),
      sanitize(formData.monthlyInstallment),
      sanitize(formData.frequency),
      sanitize(formData.repaymentAmount),
      sanitize(formData.period),
      sanitize(formData.request),
      sanitize(formData.approved),
      sanitize(formData.date),
      sanitize(formData.actual),
      sanitize(formData.refFullname1),
      sanitize(formData.refRelation1),
      sanitize(formData.refLocation1),
      sanitize(formData.refTelephone1),
      sanitize(formData.gfullname),
      sanitize(formData.grelationshipClient),
         sanitize(formData.gdateOfBirth),
        sanitize(formData.ghometown),
       sanitize(formData.ggender),
       sanitize(formData.gmaritalStatus),
        sanitize(formData.gnumberOfDependants),
        sanitize(formData.gtelephoneNumber),
        sanitize(formData.gidType),
        sanitize(formData.gidNumber),
       sanitize(formData.gplaceOfWorship),
        sanitize(formData.gresidentialLocation),
         sanitize(formData.gresidentialStatus),
         sanitize(formData.ggpsAddress),
         sanitize(formData.gmajorLandmark),
         sanitize(formData.gbusinessStructure),
        sanitize(formData.gbusinessCapital),
         sanitize(formData.gbusinessStockValue),
         sanitize(formData.gguarantorBusinessLocation),
         sanitize(formData.gguarantorBusinessGps),
         sanitize(formData.officer),


      

      
  ];

  // Use promise-based connection
  db.promise().execute(query, values)
      .then(() => {
          res.status(200).json({ message: 'Form data saved successfully!' });
      })
      .catch((error) => {
          res.status(500).json({ error: 'Database error: ' + error.message });
      });
});


// GET endpoint to fetch all applicants' data
app.get('/api/online', (req, res) => {
  const sql = 'SELECT * FROM online_applicant';
  
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching customer data:', err);
      return res.status(500).json({ error: 'Failed to fetch customer data' });
    }
    res.status(200).json(result);
  });
});




// Server listening on port 5002
app.listen(5001, () => {
  console.log('Server is running on port 5002');
});