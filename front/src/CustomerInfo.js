import React, { useState } from 'react';
import { FaUser, FaUserFriends ,FaChartLine,FaKey} from 'react-icons/fa';
import { BsBank } from 'react-icons/bs';
import axios from 'axios';

const CustomerInfo = ({ selectedCategory, customer, formatDate }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);
 // const [chairComment, setChairComment] = useState('');
 // const [chairApproval, setChairApproval] = useState('');
 // const [committeeComment, setCommitteeComment] = useState('');
 // const [committeeApproval, setCommitteeApproval] = useState('');
 // const [committeeComment1, setCommitteeComment1] = useState('');
 // const [committeeApproval1, setCommitteeApproval1] = useState('');


  /*const [savedChairData, setSavedChairData] = useState(null);
const [savedCommitteeData, setSavedCommitteeData] = useState(null);
const [savedCommitteeData1, setSavedCommitteeData1] = useState(null);



const saveChairData = () => {
    setSavedChairData({ chairApproval, chairComment });
    alert("Chair data saved!");
  };
  
  const saveCommitteeData = () => {
    setSavedCommitteeData({ committeeApproval, committeeComment });
    alert("Committee 1 data saved!");
  };
  
  const saveCommitteeData1 = () => {
    setSavedCommitteeData1({ committeeApproval1, committeeComment1 });
    alert("Committee 2 data saved!");
  };
  */
  // Initialize state variables with local storage values if they exist
  const [chairApproval, setChairApproval] = useState(
    localStorage.getItem("chairApproval") || ""
  );
  const [chairComment, setChairComment] = useState(
    localStorage.getItem("chairComment") || ""
  );
  const [committeeApproval, setCommitteeApproval] = useState(
    localStorage.getItem("committeeApproval") || ""
  );
  const [committeeComment, setCommitteeComment] = useState(
    localStorage.getItem("committeeComment") || ""
  );
  const [committeeApproval1, setCommitteeApproval1] = useState(
    localStorage.getItem("committeeApproval1") || ""
  );
  const [committeeComment1, setCommitteeComment1] = useState(
    localStorage.getItem("committeeComment1") || ""
  );
  
  const [savedChairData, setSavedChairData] = useState(
    JSON.parse(localStorage.getItem("savedChairData")) || null
  );
  const [savedCommitteeData, setSavedCommitteeData] = useState(
    JSON.parse(localStorage.getItem("savedCommitteeData")) || null
  );
  const [savedCommitteeData1, setSavedCommitteeData1] = useState(
    JSON.parse(localStorage.getItem("savedCommitteeData1")) || null
  );
  
  // Save functions with validation
  const saveChairData = () => {
    if (!chairApproval || !chairComment) {
      alert("Please fill in both Chair Approval and Chair Comment before saving.");
      return;
    }
    const data = { chairApproval, chairComment };
    setSavedChairData(data);
    localStorage.setItem("chairApproval", chairApproval);
    localStorage.setItem("chairComment", chairComment);
    localStorage.setItem("savedChairData", JSON.stringify(data));
    alert("Chair data saved!");
  };
  
  const saveCommitteeData = () => {
    if (!committeeApproval || !committeeComment) {
      alert(
        "Please fill in both Committee 1 Approval and Committee 1 Comment before saving."
      );
      return;
    }
    const data = { committeeApproval, committeeComment };
    setSavedCommitteeData(data);
    localStorage.setItem("committeeApproval", committeeApproval);
    localStorage.setItem("committeeComment", committeeComment);
    localStorage.setItem("savedCommitteeData", JSON.stringify(data));
    alert("Committee 1 data saved!");
  };
  
  const saveCommitteeData1 = () => {
    if (!committeeApproval1 || !committeeComment1) {
      alert(
        "Please fill in both Committee 2 Approval and Committee 2 Comment before saving."
      );
      return;
    }
    const data = { committeeApproval1, committeeComment1 };
    setSavedCommitteeData1(data);
    localStorage.setItem("committeeApproval1", committeeApproval1);
    localStorage.setItem("committeeComment1", committeeComment1);
    localStorage.setItem("savedCommitteeData1", JSON.stringify(data));
    alert("Committee 2 data saved!");
  };
  
  // Final Submit Function
  
  // Collecting all the data into one object for submission
  const [customerData, setCustomerData] = useState({
    customerId: customer.customerId,
    fullName: customer.fullName,
    telephoneNumber: customer.telephoneNumber,
    dateOfBirth: customer.dateOfBirth,
    residentialAddress: customer.residentialAddress,
    gpsAddress: customer.gpsAddress,
    amountRequested: customer.amountRequested,
    loanCycle: customer.loanCycle,
    loanTerm: customer.loanTerm,
    repaymentCycle: customer.repaymentCycle,
    guarantorName: customer.guarantorName,
    guarantorDateOfBirth: customer.guarantorDateOfBirth,
    guarantorContact: customer.guarantorContact,
    relationship: customer.relationship,
    guarantorResidential: customer.guarantorResidential,
    guarantorGpsAddress: customer.guarantorGpsAddress,
    principal: customer.principal,
    rate: customer.rate,
    loanAmount: customer.loanAmount,
    interest: customer.interest,
    monthlyInstallment: customer.monthlyInstallment,
    grossMarginInput: customer.grossMarginInput,
    monthlySalesRevenue: customer.monthlySalesRevenue,
    costOfGoodsSold: customer.costOfGoodsSold,
    grossProfit: customer.grossProfit,
    totalOperatingExpenses: customer.totalOperatingExpenses,
    netBusinessProfit: customer.netBusinessProfit,
    householdExpenseInput: customer.householdExpenseInput,
    otherIncomeInput: customer.otherIncomeInput,
    householdSurplus: customer.householdSurplus,
    loanRecommendation: customer.loanRecommendation,
    SurplusOrDeficit: customer.SurplusOrDeficit,
    results: customer.results,
     Buildinglocation:customer.Buildinglocation,
     BuildinglandTitle:customer.BuildinglandTitle,
     BuildingMarketValue:customer.BuildingMarketValue,
     BuildingItv_ratio:customer.BuildingItv_ratio,
     BuildingItv_ratio_plus_10:customer.BuildingItv_ratio_plus_10,
     BuildingNearest_landmark:customer.BuildingNearest_landmark,
     BuldingdigitalAddress:customer.BuldingdigitalAddress,
     forceSale:customer.forceSale,
     cashAmount:customer.cashAmount,
     VehicleBrand:customer.VehicleBrand,
      Vehicle_Chassis_number:customer.Vehicle_Chassis_number,
      Vehicle_model_year:customer.Vehicle_model_year,
      Vehicle_market_value:customer.Vehicle_market_value,
      VehicleModel:customer.VehicleModel,
      Vehicle_registration_number:customer.Vehicle_registration_number,
      Vehiclemileage:customer.Vehiclemileage,
      Vehicle_forced_sale_value:customer.Vehicle_forced_sale_value,
      Vehicle_ltv_ratio:customer.Vehicle_ltv_ratio,
     Vehicle_ltv_ratio_plus_10:customer.Vehicle_ltv_ratio_plus_10,
      Landlocation:customer.Landlocation,
      title:customer.title,
     LandmarketValue:customer.LandmarketValue,
      LandItv_ratio:customer.LandItv_ratio,
      LandItv_ratio_plus_10:customer.LandItv_ratio_plus_10,
      Landnearest_landmark:customer.Landnearest_landmark,
     Landdigital_address:customer.Landdigital_address,
     Landforced_sale_value:customer.Landforced_sale_value,
     applicantDate:customer.applicantDate,
     businessLocation:customer. businessLocation,
     businessStartDate :customer. businessStartDate,
     nearestLandmark :customer. nearestLandmark,
     businessDescription:customer.businessDescription,

      currentStockValue:customer.currentStockValue,
      startedBusinessWith:customer.startedBusinessWith,
      sourceOfFund:customer.sourceOfFund
    
   
  });

  // Handle form submission
  const finalSubmit = async () => {

    if (
      (!chairApproval && !chairComment) &&
      (!committeeApproval && !committeeComment) &&
      (!committeeApproval1 && !committeeComment1)
    ) {
      alert("Please fill in at least one field in each section before submitting.");
      return;
    }
      
      // Proceed with form submission if validation passes
      // (Your previous code here for form clearing and data submission)
    
    
    // Clear form fields
    setChairApproval("");
    setChairComment("");
    setCommitteeApproval("");
    setCommitteeComment("");
    setCommitteeApproval1("");
    setCommitteeComment1("");
  
    // Clear saved data from localStorage
    localStorage.removeItem("chairApproval");
    localStorage.removeItem("chairComment");
    localStorage.removeItem("committeeApproval");
    localStorage.removeItem("committeeComment");
    localStorage.removeItem("committeeApproval1");
    localStorage.removeItem("committeeComment1");
    localStorage.removeItem("savedChairData");
    localStorage.removeItem("savedCommitteeData");
    localStorage.removeItem("savedCommitteeData1");
  
    // Reset saved data states
    setSavedChairData(null);
    setSavedCommitteeData(null);
    setSavedCommitteeData1(null);
  
    // Set final submission state
    setIsFinalSubmitted(true);
  
    // Optionally, notify the user that data has been cleared
    alert("All form data cleared and final submit complete!");
  
    // Combine customerData and chair data
    const dataToSubmit = {
      ...customerData, // All customer information
      chairComment,    // Chair comment
      chairApproval,   // Chair 
      committeeComment,
      committeeComment1,
      committeeApproval,
      committeeApproval1,
    };
  
    try {
      // Submit data to your backend
      const submitResponse = await axios.post('http://localhost:5001/save-custom', dataToSubmit);
      if (submitResponse.status === 200) {
        console.log('Data submitted successfully!');
  
        // Delete rows from the four tables based on customerId
        const deleteResponse = await axios.delete(`http://localhost:5001/delete-customer-data/${customerData.customerId}`);
        if (deleteResponse.status === 200) {
          setSubmitStatus('Data submitted  and save successfully!');
          console.log('Rows deleted successfully from all tables.');
        } else {
          setSubmitStatus('Data submitted, but deletion failed.');
          console.error('Failed to delete rows from tables.');
        }
      } else {
        setSubmitStatus('Data submission failed!');
        console.error('Data submission failed.');
      }
    } catch (error) {
      console.error('Error submitting data or deleting rows:', error);
      setSubmitStatus('Submission and deletion failed!');
    }
  };
  
  
  
  
  const renderBioInfo = () => (
    <div className="card shadow">
      <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
        <h3 className="mb-0 d-flex align-items-center">
          <FaUser className="me-2" />
          Bio Information
        </h3>
      </div>
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-sm-6">
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Customer ID:</div>
              <div className="col-sm-6">{customerData.customerId}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Applicant Name:</div>
              <div className="col-sm-6">{customerData.fullName}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Telephone Number:</div>
              <div className="col-sm-6">{customerData.telephoneNumber}</div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Date of Birth:</div>
              <div className="col-sm-6">{formatDate(customerData.dateOfBirth)}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Applicant Date:</div>
              <div className="col-sm-6">{formatDate(customerData.applicantDate)}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Residential Address:</div>
              <div className="col-sm-6">{customerData.residentialAddress}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>GPS Address:</div>
              <div className="col-sm-6">{customerData.gpsAddress}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoanInfo = () => (
    <div className="card shadow">
      <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
        <h3 className="mb-0 d-flex align-items-center">
          <BsBank className="me-2" />
          Loan Information
        </h3>
      </div>
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-sm-6">
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Amount Requested:</div>
              <div className="col-sm-6">{customerData.amountRequested}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Loan cycle:</div>
              <div className="col-sm-6">{customerData.loanCycle}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Number of Installment:</div>
              <div className="col-sm-6">{}</div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Loan Term:</div>
              <div className="col-sm-6">{customerData.loanTerm}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Repayment Cycle:</div>
              <div className="col-sm-6">{customerData.repaymentCycle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  // Guarantor Information Section
  const renderAppInfo = () => (
    <div className="card shadow p-4">
      <h2 className="text-center mb-4">Application Information</h2>
      <div className="row">
        {/* Chair Person Section */}
        <div className="col-md-4 mb-3">
          <h3>Chair Person</h3>
          <div className="form-group">
            <label htmlFor="chairApproval1">Approve Amount</label>
            <input
              id="chairApproval1"
              className="form-control"
              type="text"
              value={chairApproval}
              onChange={(e) => setChairApproval(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="chairComment1">Comment</label>
            <textarea
              id="chairComment1"
              className="form-control"
              value={chairComment}
              onChange={(e) => setChairComment(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <button className="btn btn-primary mt-3" onClick={saveChairData}>
            Save Chair Data
          </button>
          {savedChairData && (
            <div className="mt-3">
              <strong>Saved Chair Data:</strong>
              <p>Approval: {savedChairData.chairApproval}</p>
              <p>Comment: {savedChairData.chairComment}</p>
            </div>
          )}
        </div>
  
        {/* Other Committee Section */}
        <div className="col-md-4 mb-3">
          <h3>Other Committee</h3>
          <div className="form-group">
            <label htmlFor="chairApproval2">Approve Amount</label>
            <input
              id="chairApproval2"
              className="form-control"
              type="text"
              value={committeeApproval}
              onChange={(e) => setCommitteeApproval(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="chairComment2">Comment</label>
            <textarea
              id="chairComment2"
              className="form-control"
              value={committeeComment}
              onChange={(e) => setCommitteeComment(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <button className="btn btn-primary mt-3" onClick={saveCommitteeData}>
            Save Committee Data
          </button>
          {savedCommitteeData && (
            <div className="mt-3">
              <strong>Saved Committee Data:</strong>
              <p>Approval: {savedCommitteeData.committeeApproval}</p>
              <p>Comment: {savedCommitteeData.committeeComment}</p>
            </div>
          )}
        </div>
  
        {/* Other Committee Section */}
        <div className="col-md-4 mb-3">
          <h3>Other Committee</h3>
          <div className="form-group">
            <label htmlFor="chairApproval3">Approve Amount</label>
            <input
              id="chairApproval3"
              className="form-control"
              type="text"
              value={committeeApproval1}
              onChange={(e) => setCommitteeApproval1(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="chairComment3">Comment</label>
            <textarea
              id="chairComment3"
              className="form-control"
              value={committeeComment1}
              onChange={(e) => setCommitteeComment1(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <button className="btn btn-primary mt-3" onClick={saveCommitteeData1}>
            Save Committee Data
          </button>
          {savedCommitteeData1 && (
            <div className="mt-3">
              <strong>Saved Committee Data:</strong>
              <p>Approval: {savedCommitteeData1.committeeApproval1}</p>
              <p>Comment: {savedCommitteeData1.committeeComment1}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  
  
  const renderGuarantorInfo = () => (
    <div className="card shadow">
      <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
        <h3 className="mb-0 d-flex align-items-center">
          <FaUserFriends className="me-2" />
          Guarantor Information
        </h3>
      </div>
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-sm-6">
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Guarantor Name:</div>
              <div className="col-sm-6">{customerData.guarantorName}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Guarantor Date of Birth:</div>
              <div className="col-sm-6">{formatDate(customerData.guarantorDateOfBirth)}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Guarantor Contact:</div>
              <div className="col-sm-6">{customerData.guarantorContact}</div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Relationship with client:</div>
              <div className="col-sm-6">{customerData.relationship}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Guarantor Residential:</div>
              <div className="col-sm-6">{customerData.guarantorResidential}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Guarantor Gps Address:</div>
              <div className="col-sm-6">{customerData.guarantorGpsAddress}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  const renderCreditInfo = () => (
    <div className="card shadow">
      <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
        <h3 className="mb-0 d-flex align-items-center">
          <FaChartLine className="me-2" />
          creditworthiness Information
        </h3>
      </div>

   <div className="row">

      <div className="col-md-6 mb-4">
      <label htmlFor="businessLocation" className="form-label text-primary">Business Location</label>
      <input
          type="text"
            className="form-control form-control-sm"
              id="businessLocation"
              value={customerData.businessLocation} // Populate the field with data
              placeholder="Enter business location"
               readOnly // Prevent editing
             />

      </div>

      <div className="col-md-6 mb-4">
      <label htmlFor="businessStartDate" className="form-label text-primary">Business Start Date</label>
      <input
          type="text"
            className="form-control form-control-sm"
              id="businessLocation"
              value={formatDate(customerData.businessStartDate)} // Populate the field with data
              placeholder="Enter business location"
               readOnly // Prevent editing
             />

      </div>



      <div className="col-md-6 mb-4">
      <label htmlFor="businessStartDate" className="form-label text-primary">Nearest Land Mark</label>
      <input
          type="text"
            className="form-control form-control-sm"
              id="businessLocation"
              value={customerData.nearestLandmark} // Populate the field with data
              placeholder="Enter business location"
               readOnly // Prevent editing
             />
      </div>

      <div className="col-md-6 mb-4">
      <label htmlFor="businessStartDate" className="form-label text-primary">Business Description</label>
      <textarea
          type="text"
            className="form-control form-control-sm"
              id="businessLocation"
              value={customerData.businessDescription} // Populate the field with data
              placeholder="Enter business location"
               readOnly // Prevent editing
             />
      </div>

      <div className="col-md-6 mb-4">
      <label htmlFor="businessStartDate" className="form-label text-primary">Current Stock Value</label>
      <div className="input-group">
           <div className="input-group-text bg-light text-muted">GH¢</div>
            <input
              type="text"
              className="form-control form-control-sm"
              id="businessLocation"
              value={customerData.currentStockValue} // Populate the field with data
              placeholder="Enter business location"
               readOnly // Prevent editing
             />

          </div>   
      </div>

      <div className="col-md-6 mb-4">
      <label htmlFor="businessStartDate" className="form-label text-primary">Started Business With</label>
      <div className="input-group">
           <div className="input-group-text bg-light text-muted">GH¢</div>
            <input
              type="text"
              className="form-control form-control-sm"
              id="businessLocation"
              value={customerData.startedBusinessWith} // Populate the field with data
              placeholder="Enter business location"
               readOnly // Prevent editing
             />

          </div>   
      </div>

      <div className="col-md-6 mb-4">
      <h5 className="text-primary">Source of Fund</h5>
      <div className="form-check form-check-inline">
           
            <input
              type="text"
              className="form-control form-control-sm"
              id="businessLocation"
              value={customerData.sourceOfFund} // Populate the field with data
              placeholder="Enter business location"
               readOnly // Prevent editing
             />

          </div>   
      </div>

   </div>

      
      <div className="row"> 
      <div className="col-md-6 mb-4">
      
        <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Principal</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <div className="col-sm-6">{customerData.principal}</div>
          
        </div>
      </div>

      <div className="col-md-6 mb-4">
      
        <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Rate</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">%</div>
          <div className="col-sm-6">{customerData.rate}</div>
          
        </div>
      </div>

      <div className="col-md-6 mb-4">
      
        <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Loan Term</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <div className="col-sm-6">{customerData.loanTerm}</div>
          
        </div>
      </div>
      <div className="col-md-6 mb-4">
      
        <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Loan Amount</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <div className="col-sm-6">{customerData.loanAmount}</div>
          
        </div>
      </div>
      <div className="col-md-6 mb-4">
      
        <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Interest</label>
        <div className="input-group">
          <div className="input-group-text bg-light text-muted">GH¢</div>
          <div className="col-sm-6">{customerData.interest}</div>
          
        </div>
      </div>
      <div className="col-md-6 mb-4">
      
        <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>MonthlyInstallment</label>
        <div className="input-group">
        <div className="input-group-text text-dark" style={{ backgroundColor: 'yellow' }}>GH¢</div>
          <div className="col-sm-6">{customerData.monthlyInstallment}</div>
          
        </div>
      </div>

      <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}> Gross Margin Percentage</label>
      <div className="input-group">
      <div className="input-group-text bg-success text-white">%</div>
        <div className="col-sm-6">{customerData.grossMarginInput}</div>
        
      </div>
    </div>

    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Monthly Sale Revenue</label>
      <div className="input-group">
      <div className="input-group-text bg-success text-white">GH¢</div>
        <div className="col-sm-6">{customerData.monthlySalesRevenue}</div>
        
      </div>
    </div>

    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Cost Of Goods Sold</label>
      <div className="input-group">
      <div className="input-group-text text-dark" >GH¢</div>
        <div className="col-sm-6">{customerData.costOfGoodsSold}</div>
        
      </div>
    </div>

    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Gross Profit</label>
      <div className="input-group">
      <div className="input-group-text text-dark">GH¢</div>
        <div className="col-sm-6">{customerData.grossProfit}</div>
        
      </div>
    </div>

    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Total Operating Expenses</label>
      <div className="input-group">
      <div className="input-group-text text-dark" >GH¢</div>
        <div className="col-sm-6">{customerData.totalOperatingExpenses}</div>
        
      </div>
    </div>


    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Net Business Profit</label>
      <div className="input-group">
      <div className="input-group-text text-dark" >GH¢</div>
        <div className="col-sm-6">{customerData.netBusinessProfit}</div>
        
      </div>
    </div>


    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>House Hold Expenses</label>
      <div className="input-group">
      <div className="input-group-text bg-success text-white">GH¢</div>
        <div className="col-sm-6">{customerData.householdExpenseInput}</div>
        
      </div>
    </div>

    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Other Income</label>
      <div className="input-group">
      <div className="input-group-text bg-success text-white">GH¢</div>
        <div className="col-sm-6">{customerData.otherIncomeInput}</div>
        
      </div>
    </div>


    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Household Surplus</label>
      <div className="input-group">
      <div className="input-group-text text-dark" >GH¢</div>
        <div className="col-sm-6">{customerData.householdSurplus}</div>
        
      </div>
    </div>

    <div className="col-md-6 mb-4">
      
      <label htmlFor="principal" className="form-label "  style={{ fontWeight: 'bold' }}>Loan Recommendation</label>
      <div className="input-group">
      <div className="input-group-text text-dark" style={{ backgroundColor: 'yellow' }}>GH¢</div>
        <div className="col-sm-6">{customerData.loanRecommendation}</div>
        
      </div>
    </div>

    <div className="col-md-6 mb-4">
          <label htmlFor="surplus" className="form-label ">
            Surplus/Deficit
          </label>
          <div className="input-group">
            <div className="input-group-text bg-light text-muted">GH¢</div>
            <div className="col-sm-6">{customerData.SurplusOrDeficit}</div>
           
          </div>
        </div>

        <div className="col-md-6 mb-4 bg-white">
                <label htmlFor="surplus" className="form-label text-dark">
                 Surplus Interpretation
               </label>
               <div className="input-group">
               <div className="col-sm-6">{customerData.results}</div>
               <div className="input-group-text bg-white text-white">
                GH¢
              </div>
            
           </div>
          </div>


      </div>
      
    </div>
  );


  const renderCollateralInfo = () => (
    <div className="card shadow">
      <div className="card-header bg-white text-primary d-flex justify-content-between align-items-center">
        <h3 className="mb-0 d-flex align-items-center">
          <FaKey className="me-2" />
          Collateral Information
        </h3>
      </div>
      <div className="card-body">
        <div className="row mb-2">
          <div className="col-sm-6">
            {customerData.cashAmount && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Cash Amount:</div>
                <div className="col-sm-6">{customerData.cashAmount}</div>
              </div>
            )}
            {customerData.Buildinglocation && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Building Location:</div>
                <div className="col-sm-6">{customerData.Buildinglocation}</div>
              </div>
            )}
            {customerData.BuildingItv_ratio && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Building Itv_ratio:</div>
                <div className="col-sm-6">{customerData.BuildingItv_ratio}</div>
              </div>
            )}
            {customerData.BuildingItv_ratio_plus_10 && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Building Itv_ratio_plus_10:</div>
                <div className="col-sm-6">{customerData.BuildingItv_ratio_plus_10}</div>
              </div>
            )}
            {customerData.location && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Building forceSale:</div>
                <div className="col-sm-6">{customerData.location}</div>
              </div>
            )}
          </div>
          <div className="col-sm-6">
            {customerData.BuildinglandTitle && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Building Land Title:</div>
                <div className="col-sm-6">{customerData.BuildinglandTitle}</div>
              </div>
            )}
            {customerData.BuildingMarketValue && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Building Market Value:</div>
                <div className="col-sm-6">{customerData.BuildingMarketValue}</div>
              </div>
            )}
            {customerData.BuildingNearest_landmark && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Building Nearest_landmark:</div>
                <div className="col-sm-6">{customerData.BuildingNearest_landmark}</div>
              </div>
            )}
            {customerData.BuldingdigitalAddress && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Building DigitalAddress:</div>
                <div className="col-sm-6">{customerData.BuldingdigitalAddress}</div>
              </div>
            )}
            {customerData.VehicleBrand && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle Brand:</div>
                <div className="col-sm-6">{customerData.VehicleBrand}</div>
              </div>
            )}
            {customerData.Vehicle_Chassis_number && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle chassis number:</div>
                <div className="col-sm-6">{customerData.Vehicle_Chassis_number}</div>
              </div>
            )}
            {customerData.Vehicle_model_year && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle Model year:</div>
                <div className="col-sm-6">{customerData.Vehicle_model_year}</div>
              </div>
            )}
            {customerData.Vehicle_market_value && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle Market value:</div>
                <div className="col-sm-6">{customerData.Vehicle_market_value}</div>
              </div>
            )}
            {customerData.VehicleModel && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle Model:</div>
                <div className="col-sm-6">{customerData.VehicleModel}</div>
              </div>
            )}
            {customerData.Vehicle_registration_number && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle Registration Number:</div>
                <div className="col-sm-6">{customerData.Vehicle_registration_number}</div>
              </div>
            )}
            {customerData.Vehiclemileage && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle mileage:</div>
                <div className="col-sm-6">{customerData.Vehiclemileage}</div>
              </div>
            )}
            {customerData.Vehicle_forced_sale_value && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle Forced Sale Value:</div>
                <div className="col-sm-6">{customerData.Vehicle_forced_sale_value}</div>
              </div>
            )}
            {customerData.Vehicle_ltv_ratio && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle Itv Ratio:</div>
                <div className="col-sm-6">{customerData.Vehicle_ltv_ratio}</div>
              </div>
            )}
             {customerData.Vehicle_ltv_ratio_plus_10 && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Vehicle Itv Ratio Plus 10:</div>
                <div className="col-sm-6">{customerData.Vehicle_ltv_ratio_plus_10}</div>
              </div>
            )}

{customerData.Landlocation && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Land location:</div>
                <div className="col-sm-6">{customerData.Landlocation}</div>
              </div>
            )} 


{customerData.title && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Land title:</div>
                <div className="col-sm-6">{customerData.title}</div>
              </div>
            )}


{customerData.LandmarketValue && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Land Market Value:</div>
                <div className="col-sm-6">{customerData.LandmarketValue}</div>
              </div>
            )}

{customerData.LandItv_ratio && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Land ltv ratio:</div>
                <div className="col-sm-6">{customerData.LandItv_ratio}</div>
              </div>
            )}

{customerData.LandItv_ratio_plus_10 && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Land Itv_ratio_plus_10:</div>
                <div className="col-sm-6">{customerData.LandItv_ratio_plus_10}</div>
              </div>
            )}

{customerData.Landnearest_landmark && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Land Nearest_landmark:</div>
                <div className="col-sm-6">{customerData.Landnearest_landmark}</div>
              </div>
            )}

{customerData.Landdigital_address && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Land digital_address:</div>
                <div className="col-sm-6">{customerData.Landdigital_address}</div>
              </div>
            )}

{customerData.Landforced_sale_value && (
              <div className="row mb-2">
                <div className="col-sm-6" style={{ fontWeight: 'bold' }}>Land location:</div>
                <div className="col-sm-6">{customerData.Landforced_sale_value}</div>
              </div>
            )}



           
          </div>
        </div>
      </div>
    </div>
  );
  


  // Declare state for each input field
  
  
   

  return (
    <div>
      {selectedCategory === 'bio' && renderBioInfo()}
      {selectedCategory === 'loan' && renderLoanInfo()}
      {selectedCategory === 'info' && renderGuarantorInfo()}
      {selectedCategory === 'app' && renderAppInfo()}
      {selectedCategory === 'credit' && renderCreditInfo()}
      {selectedCategory === 'coll' && renderCollateralInfo()}
      
      {/* Only show submit button if loan section is selected */}
      {selectedCategory === 'app' && (
        <button onClick={finalSubmit}>Submit Data</button>
      )}

      {submitStatus && <div>{submitStatus}</div>}
    </div>
  );
};

export default CustomerInfo;
