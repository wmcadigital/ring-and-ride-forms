import { useFormState } from "react-final-form";

import { required } from "../common/validation";
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
    <div className="wmrards-fe-group wmrards-m-t-20">
      <ProgressIndicator
        sectionPosition="Section 2 of 2"
        sectionName="About you"
      />
      <Question text="What is your name?" />
      <TextInput
        fieldName="firstName"
        label="First Name"
        validation={required}
        error={errorFirstName}
      />
      <TextInput
        fieldName="lastName"
        label="Last Name"
        validation={required}
        error={errorLastName}
      />
    </div>
  );
};

export default NameEntry;
