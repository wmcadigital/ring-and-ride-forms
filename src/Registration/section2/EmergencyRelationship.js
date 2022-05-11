import { useFormState } from "react-final-form";

import { required, name, composeValidators } from "../../common/validation";
import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import TextInput from "../../common/TextInput";
import getEmergencySectionName from "./getEmergencySectionName";

const EmergencyRelationship = () => {
  const stateApi = useFormState();

  const errorEmergencyRelationship = stateApi.submitFailed
    ? stateApi.errors?.emergencyRelationship
    : null;

  const formValues = stateApi.values;

  let question = "";

  const registeredFirstName = formValues["firstName"];
  const emergencyFirstName = formValues["emergencyFirstName"];

  if (formValues["registerForYourself"] === "yes") {
    question = `What is your relationship to ${emergencyFirstName}?`;
  } else {
    if (formValues["emergencyContact"] === "yes") {
      question = `What is your relationship to ${registeredFirstName}?`;
    } else {
      if (formValues["emergencyContactAnother"] === "yes") {
        question = `What is ${emergencyFirstName}'s relationship to ${registeredFirstName}?`;
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
        fieldName="emergencyRelationship"
        label="For example, carer or partner."
        validation={composeValidators(required, name)}
        error={errorEmergencyRelationship}
      />
    </FormSection>
  );
};

export default EmergencyRelationship;
