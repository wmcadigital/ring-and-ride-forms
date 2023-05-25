import { useFormState } from "react-final-form";

import FormSection from "../common/FormSection";
import ProgressIndicator from "../common/ProgressIndicator";
import Question from "../common/Question";
import TextInput from "../common/TextInput";
import { required } from "../common/validation";

const ContactEmail = () => {
  const stateApi = useFormState();

  const errorEmailAddress = stateApi.submitFailed
    ? stateApi.errors?.emailAddress
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 2"
        sectionName="About you"
      />
      <Question text="What is your email address?" />
      <TextInput
        fieldName="emailAddress"
        label={
          <>
            Email address
            <p>For example, name@example.com</p>
          </>
        }
        error={errorEmailAddress}
        validation={required}
      />
    </FormSection>
  );
};

export default ContactEmail;
