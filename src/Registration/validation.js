import { validateDateOfBirth as validateDateOfBirthCommons } from "../common/validation";

export const validateDateOfBirth = (values = {}) => {
  const errors = {};
  const { bdayDay, bdayMonth, bdayYear } = values;

  if (!bdayDay && !bdayMonth && !bdayYear) {
    errors.dateOfBirth = "Required";
    return errors;
  }

  if (!bdayDay || !bdayMonth || !bdayYear) {
    errors.dateOfBirth = "Invalid";
    return errors;
  }

  const invalid = validateDateOfBirthCommons(bdayDay, bdayMonth, bdayYear);

  if (invalid) {
    errors.dateOfBirth = invalid;
  }

  return errors;
};

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
  if (
    !values.agreeTermsAndConditions ||
    !values.agreePrivacyPolicy ||
    !values.agreeRingAndRide
  ) {
    errors.legal = "Required";
  }
  return errors;
};
