import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import TextArea from "../../common/TextArea";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import getSectionPositionInfo from "../getSectionPosition";
import { required } from "../../common/validation";

const OtherInformation = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.otherInformation
    : null;

  const otherInformationDetailsError = stateApi.submitFailed
    ? stateApi.errors?.otherInformationDetails
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("4", stateApi)}
        sectionName="Any other information"
      />
      <Question text="Is there any other information you think we should know about this booking?" />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="otherInformation"
        />
        {formValues.otherInformation === "yes" ? (
          <TextArea
            label="Additional requirements"
            fieldName="otherInformationDetails"
            validation={required}
            error={otherInformationDetailsError}
            rows={8}
          />
        ) : null}
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="otherInformation"
        />
      </RadioGroup>
    </FormSection>
  );
};

export default OtherInformation;
