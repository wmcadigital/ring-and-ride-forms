import { useFormState } from "react-final-form";

import { required, name, composeValidators } from "../../common/validation";
import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import TextInput from "../../common/TextInput";
import getEmergencySectionName from "./getEmergencySectionName";

const EmergencyContactName = () => {
  const stateApi = useFormState();

  const errorFirstName = stateApi.submitFailed
    ? stateApi.errors?.emergencyFirstName
    : null;

  const errorLastName = stateApi.submitFailed
    ? stateApi.errors?.emergencyLastName
    : null;

  const formValues = stateApi.values;

  let question = "";

  if (formValues["registerForYourself"] === "yes") {
    question = "What is the name of your contact emergency?";
  } else {
    if (formValues["emergencyContact"] === "yes") {
      question = "What is your name?";
    } else {
      if (formValues["emergencyContactAnother"] === "yes") {
        question = "What is their name?";
      }
    }
  }

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 3"
        sectionName={getEmergencySectionName(stateApi)}
      />
      <Question text={question} />
      <TextInput
        fieldName="emergencyFirstName"
        label="First Name"
        validation={composeValidators(required, name)}
        error={errorFirstName}
      />
      <TextInput
        fieldName="emergencyLastName"
        label="Last Name"
        validation={composeValidators(required, name)}
        error={errorLastName}
      />
    </FormSection>
  );
};

export default EmergencyContactName;
