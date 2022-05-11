import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import getRequirementsSectionName from "./getRequirementsSectionName";
import { required } from "../../common/validation";

const WheelChairTransfer = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.wheelChairTransfer
    : null;

  let wheelChairType = "";

  if (formValues.mobilityAids.manualWheelchair === true) {
    wheelChairType = "manual";
  } else {
    wheelChairType = "powered";
  }

  const question =
    formValues["registerForYourself"] === "yes"
      ? `Are you able to transfer yourself from your ${wheelChairType} wheelchair?`
      : `Is ${formValues["firstName"]} able to transfer themselves from their ${wheelChairType} wheelchair?`;

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
          fieldName="wheelChairTransfer"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="wheelChairTransfer"
        />
      </RadioGroup>
    </FormSection>
  );
};

export default WheelChairTransfer;
