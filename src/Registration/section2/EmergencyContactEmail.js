import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import TextInput from "../../common/TextInput";
import getEmergencySectionName from "./getEmergencySectionName";
import { required, email, composeValidators } from "../../common/validation";

const EmergencyContactEmail = () => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const emergencyFirstName = formValues["emergencyFirstName"];

  let question = "";

  if (formValues["registerForYourself"] === "yes") {
    question = `What is ${emergencyFirstName}'s email address?`;
  } else {
    if (formValues["emergencyContact"] === "yes") {
      question = `What is your email address?`;
    } else {
      if (formValues["emergencyContactAnother"] === "yes") {
        question = `What is ${emergencyFirstName}'s email address?`;
      }
    }
  }

  const errorEmailAddress = stateApi.submitFailed
    ? stateApi.errors?.emergencyEmailAddress
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 3"
        sectionName={getEmergencySectionName(stateApi)}
      />
      <Question text={question} />
      <TextInput
        fieldName="emergencyEmailAddress"
        label={
          <>
            Email address
            <p>For example, name@example.com</p>
          </>
        }
        error={errorEmailAddress}
        validation={composeValidators(required, email)}
      />
    </FormSection>
  );
};

export default EmergencyContactEmail;
