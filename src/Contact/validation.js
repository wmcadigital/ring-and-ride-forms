import { numbersAndSpacesOnly, email } from "../common/validation";

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
