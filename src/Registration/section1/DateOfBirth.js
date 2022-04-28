import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import DateInput from "../../common/DateInput";
import getAboutSectionName from "./getAboutSectionName";

const DateOfBirth = () => {
  const stateApi = useFormState();

  const error = stateApi.submitFailed ? stateApi.errors?.dateOfBirth : null;

  const formValues = stateApi.values;
  const question =
    formValues["registerForYourself"] === "yes"
      ? "What is your date of birth?"
      : `What is ${formValues["firstName"]}'s date of birth?`;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <DateInput
        dayFieldName="bdayDay"
        monthFieldName="bdayMonth"
        yearFieldName="bdayYear"
        label="For example, 3 7 1985"
        error={error}
      />
    </FormSection>
  );
};

export default DateOfBirth;
