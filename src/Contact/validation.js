const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const required = (value) => (value ? undefined : "Required");

export const numbersOnly = (value) => {
  if (value) {
    return /^\d+$/.test(value) ? undefined : "Invalid";
  }
};

export const numbersAndSpacesOnly = (value) => {
  if (value) {
    return /^[\d\s]+$/.test(value) ? undefined : "Invalid";
  }
};

export const email = (value) => {
  if (value) {
    return emailRegex.test(value) ? undefined : "Invalid";
  }
};

export const validateContactPreferences = (values) => {
  const errors = {};
  if (!values.emailContact && !values.phoneContact) {
    errors.contactPreference = "Required";
  }
  if (values.emailContact && !values.emailAddress) {
    errors.emailAddress = "Required";
  }
  if (values.phoneContact && !values.phoneNo) {
    errors.phoneNo = "Required";
  }
  if (values.emailContact && values.emailAddress) {
    errors.emailAddress = email(values.emailAddress);
  }
  if (values.phoneContact && values.phoneNo) {
    errors.phoneNo = numbersAndSpacesOnly(values.phoneNo);
  }
  return errors;
};

export const validateCheckAnswers = (values) => {
  const errors = {};
  if (!values.agreeTermsAndConditions || !values.agreePrivacyPolicy) {
    errors.legal = "Required";
  }
  return errors;
};
