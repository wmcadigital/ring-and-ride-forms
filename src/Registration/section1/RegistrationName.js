import { useFormState } from "react-final-form";

import { required, name, composeValidators } from "../../common/validation";
import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import TextInput from "../../common/TextInput";
import getAboutSectionName from "./getAboutSectionName";

const RegistrationName = () => {
  const stateApi = useFormState();

  const errorFirstName = stateApi.submitFailed
    ? stateApi.errors?.firstName
    : null;

  const errorLastName = stateApi.submitFailed
    ? stateApi.errors?.lastName
    : null;

  const formValues = stateApi.values;
  const question =
    formValues["registerForYourself"] === "yes"
      ? "What is your name?"
      : "Who are you registering for?";

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
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

export default RegistrationName;
