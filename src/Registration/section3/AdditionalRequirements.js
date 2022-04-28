import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import TextArea from "../../common/TextArea";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import getRequirementsSectionName from "./getRequirementsSectionName";
import { required } from "../../common/validation";

const AdditionalRequirements = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.additionalRequirements
    : null;

  const additionalRequirementsDetailsError = stateApi.submitFailed
    ? stateApi.errors?.additionalRequirementsDetails
    : null;

  const question =
    formValues["registerForYourself"] === "yes"
      ? "Do you have any other requirements we need to know about?"
      : `Does ${formValues["firstName"]} have any other requirements we need to know about?`;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 3 of 3"
        sectionName={getRequirementsSectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="additionalRequirements"
        />
        {formValues.additionalRequirements === "yes" ? (
          <TextArea
            label="Additional requirements"
            fieldName="additionalRequirementsDetails"
            validation={required}
            error={additionalRequirementsDetailsError}
            rows={8}
          />
        ) : null}
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="additionalRequirements"
        />
      </RadioGroup>
    </FormSection>
  );
};

export default AdditionalRequirements;
