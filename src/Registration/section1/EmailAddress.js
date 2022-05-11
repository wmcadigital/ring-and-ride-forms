import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import TextInput from "../../common/TextInput";
import getAboutSectionName from "./getAboutSectionName";
import { required, email, composeValidators } from "../../common/validation";

const EmailAddress = () => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const question =
    formValues["registerForYourself"] === "yes"
      ? "What is your email address?"
      : `What is ${formValues["firstName"]}'s email address?`;

  const errorEmailAddress = stateApi.submitFailed
    ? stateApi.errors?.emailAddress
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <TextInput
        fieldName="emailAddress"
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

export default EmailAddress;
