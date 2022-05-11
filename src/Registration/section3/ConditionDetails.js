import { useFormState } from "react-final-form";

import { required } from "../../common/validation";
import FormSection from "../../common/FormSection";
import TextAreaContainer from "../../common/TextAreaContainer";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import TextArea from "../../common/TextArea";
import getRequirementsSectionName from "./getRequirementsSectionName";

const ConditionDetails = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed ? stateApi.errors?.conditionDetail : null;

  const detailsLabel =
    formValues["registerForYourself"] === "yes"
      ? "Details of your condition(s)"
      : `Details of ${formValues["firstName"]}'s condition(s)`;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 3 of 3"
        sectionName={getRequirementsSectionName(stateApi)}
      />
      <TextAreaContainer>
        <Question text="Please describe the conditions(s)" />
        <TextArea
          fieldName="conditionDetail"
          label={detailsLabel}
          rows={8}
          validation={required}
          error={error}
        />
      </TextAreaContainer>
    </FormSection>
  );
};

export default ConditionDetails;
