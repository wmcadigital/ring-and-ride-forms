import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import getAboutSectionName from "./getAboutSectionName";
import CheckboxContainer from "../../common/CheckboxContainer";
import Checkbox from "../../common/Checkbox";
import FieldError from "../../common/FieldError";

import options from "./ContactPreferenceOptions";

const ContactPreferences = () => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const question =
    formValues["registerForYourself"] === "yes"
      ? "How would you like to be contacted about your registration?"
      : `How would ${formValues["firstName"]} like to be contacted about their registration?`;

  const contactPrefError = stateApi.submitFailed
    ? stateApi.errors?.selectContactPref
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <p>Select all that apply</p>
      <CheckboxContainer error={contactPrefError}>
        <FieldError text={contactPrefError} />
        {Object.keys(options).map((option) => (
          <Checkbox
            key={options[option]}
            label={options[option]}
            fieldName={`contactPreference.${option}`}
          />
        ))}
      </CheckboxContainer>
    </FormSection>
  );
};

export default ContactPreferences;
