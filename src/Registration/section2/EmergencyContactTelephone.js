import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import TextInput from "../../common/TextInput";
import getEmergencySectionName from "./getEmergencySectionName";
import {
  required,
  numbersAndSpacesOnly,
  composeValidators,
} from "../../common/validation";

const EmergencyContactTelephone = () => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const emergencyFirstName = formValues["emergencyFirstName"];

  let question = "";

  if (formValues["registerForYourself"] === "yes") {
    question = `What is ${emergencyFirstName}'s telephone number?`;
  } else {
    if (formValues["emergencyContact"] === "yes") {
      question = `What is your telephone number?`;
    } else {
      if (formValues["emergencyContactAnother"] === "yes") {
        question = `What is ${emergencyFirstName}'s telephone number?`;
      }
    }
  }

  const errorPhoneNo = stateApi.submitFailed
    ? stateApi.errors?.emergencyPhoneNo
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 3"
        sectionName={getEmergencySectionName(stateApi)}
      />
      <Question text={question} />
      <TextInput
        fieldName="emergencyPhoneNo"
        label={
          <>
            Phone number
            <p>For example, 07700900457</p>
          </>
        }
        validation={composeValidators(required, numbersAndSpacesOnly)}
        error={errorPhoneNo}
      />
    </FormSection>
  );
};

export default EmergencyContactTelephone;
