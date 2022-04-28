import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import getRequirementsSectionName from "./getRequirementsSectionName";
import CheckboxContainer from "../../common/CheckboxContainer";
import Checkbox from "../../common/Checkbox";
import FieldError from "../../common/FieldError";

export const BusProblemOptions = (registerForYourself) => {
  if (registerForYourself) {
    return {
      cannotGetToBus: "I cannot get to a bus stop",
      cannotGetOnBus: "I cannot get on a bus",
      cannotTravelOnBus: "I cannot travel on a bus",
    };
  }
  return {
    cannotGetToBus: "They cannot get to a bus stop",
    cannotGetOnBus: "They cannot get on a bus",
    cannotTravelOnBus: "They cannot travel on a bus",
  };
};

const StandardBusProblems = () => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const registerForYourself = formValues["registerForYourself"] === "yes";
  const question = registerForYourself
    ? "What problems do you experience when trying to use standard bus services?"
    : `What problems does ${formValues["firstName"]} experience when trying to use standard bus services?`;

  const standardBusProbError = stateApi.submitFailed
    ? stateApi.errors?.selectStandardBusProb
    : null;

  const busProblemOptions = BusProblemOptions(registerForYourself);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 3 of 3"
        sectionName={getRequirementsSectionName(stateApi)}
      />
      <Question text={question} />
      <p>Select all that apply</p>
      <CheckboxContainer error={standardBusProbError}>
        <FieldError text={standardBusProbError} />
        {Object.keys(busProblemOptions).map((option) => (
          <Checkbox
            key={busProblemOptions[option]}
            label={busProblemOptions[option]}
            fieldName={`standardBusProb.${option}`}
          />
        ))}
      </CheckboxContainer>
    </FormSection>
  );
};

export default StandardBusProblems;
