export const validatePersonalLoanForm = (formData) => {
    const errors = {};
  
    if (!formData.customerId.trim()) {
      errors.customerId = 'Customer ID is required.';
    }
  
    if (!formData.popularName.trim()) {
      errors.popularName = 'Popular name is required.';
    }
  
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required.';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = 'Contact number must be 10 digits.';
    }
  
    if (!formData.typeOfIdentity) {
      errors.typeOfIdentity = 'Type of identity is required.';
    }
  
    if (!formData.idNumber.trim()) {
      errors.idNumber = 'ID number is required.';
    }
  
    if (!formData.dateIssued) {
      errors.dateIssued = 'Date issued is required.';
    }
  
    if (!formData.expiryDate) {
      errors.expiryDate = 'Expiry date is required.';
    }
  
    if (!formData.homeTown.trim()) {
      errors.homeTown = 'Home town is required.';
    }
  
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required.';
    }
  
    if (!formData.residentialLocation.trim()) {
      errors.residentialLocation = 'Residential location is required.';
    }
  
    if (!formData.residentialAddress.trim()) {
      errors.residentialAddress = 'Residential address is required.';
    }
  
    if (!formData.streetName.trim()) {
      errors.streetName = 'Street name is required.';
    }
  
    if (!formData.residentialGPS.trim()) {
      errors.residentialGPS = 'Residential GPS is required.';
    }
  
    if (!formData.residentialOwnership) {
      errors.residentialOwnership = 'Residential ownership is required.';
    }
  
    if (!formData.howLongAtAddress.trim()) {
      errors.howLongAtAddress = 'Duration at address is required.';
    }
  
    if (!formData.numDependants) {
      errors.numDependants = 'Number of dependants is required.';
    }
  
    if (!formData.numDependantsSchooling) {
      errors.numDependantsSchooling = 'Number of dependants schooling is required.';
    }
  
    if (!formData.religion.trim()) {
      errors.religion = 'Religion is required.';
    }
  
    if (!formData.nameOfChurch.trim()) {
      errors.nameOfChurch = 'Name of church is required.';
    }
  
    if (!formData.churchLocation.trim()) {
      errors.churchLocation = 'Church location is required.';
    }
  
    return errors;
  };
  