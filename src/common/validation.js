const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const nameRegex = /^[a-z ,.'-]+$/i;
const postCodeRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

export const FORM_SUBMIT_ERROR =
  "An error occurred when submitting the form data";

export const required = (value) => (value ? undefined : "Question is Required");

export const coventry = (value) => (value !== "Coventry" ? undefined : "Coventry is no longer available");

export const numbersOnly = (value) => {
  if (value) {
    return /^\d+$/.test(value)
      ? undefined
      : "Invalid. Please enter numbers only";
  }
};

export const registrationNumber = (value) => {
  if (value) {
    return /^\d+$/.test(value)
      ? undefined
      : "Your registration number should be only numbers";
  }
};

export const registrationNumberLength = (value) => {
  if (value) {
    return value.length == 5 || value.length == 6
      ? undefined
      : "Your registration number should be 5 or 6 numbers";
  }
};

export const numbersAndSpacesOnly = (value) => {
  if (value) {
    return /^[\d\s]+$/.test(value) ? undefined : "Invalid";
  }
};

export const email = (value) => {
  if (value) {
    return emailRegex.test(value) ? undefined : "Invalid email";
  }
};

export const name = (value) => {
  if (value) {
    return nameRegex.test(value) ? undefined : "Invalid";
  }
};

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

export const composeFormValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) =>
        Object.values(error).some((error) => error) ? error : validator(value),
      {}
    );

export const validateDate = (day, month, year) => {
  if (numbersOnly(day) || numbersOnly(month) || numbersOnly(year)) {
    return "Invalid";
  }

  const dayInteger = parseInt(day);
  const monthInteger = parseInt(month);
  const yearInteger = parseInt(year);

  if (dayInteger > 31 || dayInteger < 1) {
    return "Invalid";
  }

  if (monthInteger > 12 || monthInteger < 1) {
    return "Invalid";
  }

  if (year.length !== 4 || yearInteger < "1900") {
    return "Invalid";
  }

  const dateToValidate = new Date(year, month - 1, day);

  if (dateToValidate.getDate() !== dayInteger) {
    return "Invalid";
  }

  return undefined;
};

export const validateDateOfBirth = (day, month, year) => {
  const invalidDate = validateDate(day, month, year);

  if (invalidDate) {
    return invalidDate;
  }

  const dateToValidate = new Date(year, month - 1, day);
  const now = new Date();

  const currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const currentDate = new Date(currentYear, currentMonth, currentDay);

  if (dateToValidate.getTime() > currentDate.getTime()) {
    return "Invalid";
  }
};

export const postCode = (value) => {
  if (value) {
    return postCodeRegex.test(value) ? undefined : "Invalid postcode";
  }
};

export const validateSelectOneOption =
  (fieldName, errorName) =>
  (values = {}) => {
    const errors = {};
    const contactPrefValues = Object.values(values?.[fieldName] ?? {});
    if (!contactPrefValues.some((value) => value === true)) {
      errors[errorName] = "Select at least 1 topic";
    }
    return errors;
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

export const validateTimeInput = (prefix) => (values) => {
  const errors = {};
  if (!values[prefix]?.hour || !values[prefix].minute) {
    errors[`${prefix}.timeInput`] = "Required";
  }
  return errors;
};

export const numberGreaterThanZero = (value) =>
  value <= 0 ? "Invalid" : undefined;

export const addressIdPresent =
  (prefix) =>
  (values = {}) => {
    const errors = { [prefix]: {} };
    if (!values[prefix]?.addressId) {
      errors[prefix].addressId = "Required";
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
