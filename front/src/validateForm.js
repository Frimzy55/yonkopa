export const validateForm = (data) => {
    const errors = {};
  
    if (!data.title.trim()) errors.title = "Title is required.";
    if (!data.firstName.trim()) errors.firstName = "First name is required.";
    if (!data.lastName.trim()) errors.lastName = "Last name is required.";
    if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required.";
    if (!data.placeOfBirth.trim()) errors.placeOfBirth = "Place of birth is required.";
    if (!data.gender) errors.gender = "Gender is required.";
    if (!data.maritalStatus) errors.maritalStatus = "Marital status is required.";
  
    // Additional fields
    /*if (!data.formId.trim()) errors.formId = "Form ID is required.";
    if (!data.idNumber.trim()) errors.idNumber = "ID number is required.";
    if (!data.dateOfIssue) errors.dateOfIssue = "Date of issue is required.";
    if (!data.idExpiryDate) errors.idExpiryDate = "ID expiry date is required.";
    if (!data.nationality.trim()) errors.nationality = "Nationality is required.";
    if (!data.telephoneNumber.trim()) errors.telephoneNumber = "Telephone number is required.";
    if (!data.residentialLocation.trim()) errors.residentialLocation = "Residential location is required.";
    if (!data.suburb.trim()) errors.suburb = "Suburb is required.";
    if (!data.residentialGpsAddress.trim()) errors.residentialGpsAddress = "Residential GPS address is required.";
    if (!data.alternativeNumber.trim()) errors.alternativeNumber = "Alternative number is required.";
    if (!data.employmentStatus.trim()) errors.employmentStatus = "Employment status is required.";
    if (!data.refereeFirstName.trim()) errors.refereeFirstName = "Referee first name is required.";
    if (!data.refereeLastName.trim()) errors.refereeLastName = "Referee last name is required.";
    if (!data.refereeHouseLocation.trim()) errors.refereeHouseLocation = "Referee house location is required.";
    if (!data.refereeContact.trim()) errors.refereeContact = "Referee contact is required.";
    if (!data.relationshipOfficer.trim()) errors.relationshipOfficer = "Relationship officer is required.";*/
  
    return Object.keys(errors).length > 0 ? errors : null;
  };
  
  
  