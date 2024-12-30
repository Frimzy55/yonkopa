import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import CustomerSearch1 from './CustomerSearch1'; // Import CustomerSearch1
import axios from 'axios';

const PersonalLoan = () => {
    const [openDialog, setOpenDialog] = useState(false); // State to control Dialog visibility
    const [dialogMessage, setDialogMessage] = useState(''); // State to hold the dialog message
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        customerId: '', firstName:'' ,lastName:'',dateOfBirth:'', homeTown:'',idNumber:'', telephoneNumber:'',
        typeOfId:'',dateOfIssue:'', expiryDate:'', streetName:'',residentialGps:'',residentialLocation:'',
        residential_address:'',nameOfChurch:'',ChurchLocation:'',nameOfSpouse:'',religion:'',fathersName:'',
        fathersContact:'',mothersName:'',mothersContact:'',spouseContact:'',number_of_dependants:'',
        number_of_dependants_schooling:'',

        businessName:'',businessSector:'',businessLandmark:'',businessLocation:'',typeOfBusiness:'',businessGps:'',
        businessCapital:'',businessStock:'',cash:'',account:'',payable:'',max:'',min:"",emp:'',thirdParty:'',
        thirdPartyContact:'',

        loanAmount:'',loanPurpose:'',loanTerm:'',monthlyInstallment:'',frequency:'',repaymentAmount:'',period:'',request:'',
        approved:'',date:'',actual:'',refFullname1:'',refRelation1:'',refLocation1:'',refTelephone1:'',

        gfullname:'', grelationshipClient:'', gdateOfBirth:'', ghometown:'', ggender :'',
        gmaritalStatus:'', gnumberOfDependants:'', gtelephoneNumber:'', gidType:"", gidNumber:'',
        gplaceOfWorship:'', gresidentialLocation:'', gresidentialStatus:'', ggpsAddress:'',
        gmajorLandmark:'', gbusinessStructure:'', gbusinessCapital:'', gbusinessStockValue:'',
        gguarantorBusinessLocation:'', gguarantorBusinessGps:'',officer:''

       
    });
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Track selected customer

    const steps = ["Step 1", "Step 2", "Step 3","Step4"];

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5001/loans-application', formData);
            console.log('Form Submitted Successfully:', response.data);

            // Show success message in dialog
            setDialogMessage('Form submitted successfully!');
            setOpenDialog(true); // Open the Dialog
        } catch (error) {
            console.error('Error submitting form:', error);
            setDialogMessage('Error submitting form. Please try again.');
            setOpenDialog(true); // Open the Dialog with error message
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the Dialog
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
    };

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer); // Update selected customer
        setFormData((prevFormData) => ({
            ...prevFormData,
            customerId: customer.customer_id,
            firstName: customer.first_name,
            lastName: customer.last_name,
            dateOfBirth: formatDate(customer.date_of_birth),
            homeTown: customer.home_town,
            idNumber: customer.id_number,
            telephoneNumber: customer.telephone_number,
            typeOfId: customer.form_of_id,
            dateOfIssue: formatDate(customer.date_of_issue),
            expiryDate: formatDate(customer.id_expiry_date),
            streetName: customer.street_name,
            residentialGps: customer.residential_gps_address,
            residentialLocation: customer.residential_location,
            residentialAddress: customer.residential_address,
            nameOfChurch: customer.churhName,
            ChurchLocation: customer.churchLocation,
            nameOfSpouse: customer.spouseName,
            religion: customer.religion,
            fathersName: customer.fathersName,
            fathersContact: customer.fathersContact,
            mothersName: customer.mothersName,
            mothersContact: customer.mothersContact,
            spouseContact: customer.spouseContact,
            number_of_dependants: customer.number_of_dependants,
            number_of_dependants_schooling: customer.number_of_dependants_schooling,
        }));
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        {/* Show CustomerSearch1 if no customer is selected */}
                        {!selectedCustomer ? (
                            <CustomerSearch1 onSelectCustomer={handleSelectCustomer} />
                        ) : (
                            // Show form fields after customer is selected and populated
                            <Step1 formData={formData} handleChange={handleChange} />
                        )}
                    </Box>
                );
            case 1:
                return <Step2 formData={formData} handleChange={handleChange} />;
            case 2:
                return <Step3 formData={formData} handleChange={handleChange} />;
            case 3:
                return <Step4 formData={formData} handleChange={handleChange} />;
            default:
                return "Unknown Step";
        }
    };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ marginTop: 2 }}>
                {renderStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button
                        variant="contained"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </Box>

            
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>{dialogMessage.includes('success') ? 'Success' : 'Error'}</DialogTitle>
                <DialogContent>
                    <p>{dialogMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PersonalLoan;
