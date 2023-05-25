import { useFormState } from "react-final-form";

import FormSection from "../common/FormSection";
import TextInput from "../common/TextInput";
import ProgressIndicator from "../common/ProgressIndicator";
import Question from "../common/Question";
import {
  composeValidators,
  registrationNumber,
  registrationNumberLength,
} from "../common/validation";

const RegistrationNoEntry = () => {
  const stateApi = useFormState();

  const error = stateApi.submitFailed ? stateApi.errors?.registrationNo : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 2"
        sectionName="About you"
      />
      <Question text="Do you have a Ring and Ride registration number?" />
      <TextInput
        fieldName="registrationNo"
        label={
          <>
            {" "}
            Registration number
            <p>For example, 123456</p>
          </>
        }
        validation={composeValidators(
          registrationNumber,
          registrationNumberLength
        )}
        error={error}
      />
    </FormSection>
  );
};

export default RegistrationNoEntry;
