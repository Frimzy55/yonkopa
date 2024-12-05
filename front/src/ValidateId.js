const validateStep2 = (data) => {
    const errors = {};
    if (!data.formId) errors.formId = "Form of ID is required";
    if (!data.idNumber) errors.idNumber = "ID number is required";
    if (!data.dateOfIssue) errors.dateOfIssue = "Date of issue is required";
    if (!data.idExpiryDate) errors.idExpiryDate = "ID expiry date is required";
    if (!data.nationality) errors.nationality = "Nationality is required";
    return Object.keys(errors).length ? errors : null;
  };