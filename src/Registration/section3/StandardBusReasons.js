import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import getRequirementsSectionName from "./getRequirementsSectionName";
import CheckboxContainer from "../../common/CheckboxContainer";
import Checkbox from "../../common/Checkbox";
import TextArea from "../../common/TextArea";
import FieldError from "../../common/FieldError";
import { required } from "../../common/validation";

export const ReasonOptions = (registerForYourself) => {
  if (registerForYourself) {
    return {
      companionOrCarer: "I cannot travel without a companion or carer",
      limitedMobility: "I have limited mobility",
      longJourney: "The journey takes too long",
      notUnderstandService: "I don't understand how buses operate",
      fearAnxiety: "Fear and anxiety",
      cannotTravelBus: "I cannot travel on a bus",
    };
  }
  return {
    companionOrCarer: "They cannot travel without a companion or carer",
    limitedMobility: "They have limited mobility",
    longJourney: "The journey takes too long",
    notUnderstandService: "They don't understand how buses operate",
    fearAnxiety: "Fear and anxiety",
    cannotTravelBus: "They cannot travel on a bus",
  };
};

const StandardBusReasons = () => {
  const stateApi = useFormState();

  const formValues = stateApi.values;

  const registerForYourself = formValues["registerForYourself"] === "yes";
  const reasonOptions = ReasonOptions(registerForYourself);

  const question = "Which of the following best describes the reason for this?";

  const standardBusReasonError = stateApi.submitFailed
    ? stateApi.errors?.selectStandardBusReason
    : null;

  const otherReasonRequired = stateApi.submitFailed
    ? stateApi.errors?.standardBusReason?.otherReason
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 3 of 3"
        sectionName={getRequirementsSectionName(stateApi)}
      />
      <Question text={question} />
      <p>Select all that apply</p>
      <CheckboxContainer error={standardBusReasonError}>
        <FieldError text={standardBusReasonError} />
        {Object.keys(reasonOptions).map((option) => (
          <Checkbox
            key={reasonOptions[option]}
            label={reasonOptions[option]}
            fieldName={`standardBusReason.${option}`}
          />
        ))}
        <Checkbox label="Other" fieldName="standardBusReason.other" />
        {formValues.standardBusReason?.other ? (
          <TextArea
            label="Please describe the reason"
            fieldName="standardBusReason.otherReason"
            validation={required}
            error={otherReasonRequired}
          />
        ) : null}
      </CheckboxContainer>
    </FormSection>
  );
};

export default StandardBusReasons;
