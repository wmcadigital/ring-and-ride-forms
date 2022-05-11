import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import TextInput from "../../common/TextInput";
import getAboutSectionName from "./getAboutSectionName";
import {
  required,
  numbersAndSpacesOnly,
  composeValidators,
} from "../../common/validation";

const TelephoneNo = () => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const question =
    formValues["registerForYourself"] === "yes"
      ? "What is your telephone number?"
      : `What is ${formValues["firstName"]}'s telephone number?`;

  const errorPhoneNo = stateApi.submitFailed ? stateApi.errors?.phoneNo : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <TextInput
        fieldName="phoneNo"
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

export default TelephoneNo;
