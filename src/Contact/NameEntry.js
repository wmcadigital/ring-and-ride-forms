import { useFormState } from "react-final-form";

import { required, name, composeValidators } from "../common/validation";
import FormSection from "../common/FormSection";
import Question from "../common/Question";
import ProgressIndicator from "../common/ProgressIndicator";
import TextInput from "../common/TextInput";

const NameEntry = () => {
  const stateApi = useFormState();

  const errorFirstName = stateApi.submitFailed
    ? stateApi.errors?.firstName
    : null;

  const errorLastName = stateApi.submitFailed
    ? stateApi.errors?.lastName
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 2"
        sectionName="About you"
      />
      <Question text="What is your name?" />
      <TextInput
        fieldName="firstName"
        label="First Name"
        validation={composeValidators(required, name)}
        error={errorFirstName}
      />
      <TextInput
        fieldName="lastName"
        label="Last Name"
        validation={composeValidators(required, name)}
        error={errorLastName}
      />
    </FormSection>
  );
};

export default NameEntry;
