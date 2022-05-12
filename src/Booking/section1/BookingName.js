import { useFormState } from "react-final-form";

import { required, name, composeValidators } from "../../common/validation";
import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import TextInput from "../../common/TextInput";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutSectionName from "./getAboutSectionName";

const BookingName = () => {
  const stateApi = useFormState();

  const errorFirstName = stateApi.submitFailed
    ? stateApi.errors?.firstName
    : null;

  const errorLastName = stateApi.submitFailed
    ? stateApi.errors?.lastName
    : null;

  const formValues = stateApi.values;
  const question =
    formValues["bookingParty"] === "behalfSomeone"
      ? "Who are you booking for?"
      : "What is your name?";

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("1", stateApi)}
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

export default BookingName;
