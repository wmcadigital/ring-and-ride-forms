import { useEffect } from "react";
import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import getRequirementsSectionName from "./getRequirementsSectionName";
import CheckboxContainer from "../../common/CheckboxContainer";
import Checkbox from "../../common/Checkbox";
import TextArea from "../../common/TextArea";
import FieldError from "../../common/FieldError";
import { required } from "../../common/validation";

export const MobilityAidsOptions = (registerForYourself) => {
  if (registerForYourself) {
    return {
      manualWheelchair: "I use a manual wheelchair",
      poweredWheelchair: "I use a powered wheelchair",
      scooter: "I use a scooter",
      sticksOrCrutches: "I use a stick(s)/crutch(es)",
      walkingFrame: "I use a walking frame",
      guideDog: "I have a guide/helping dog",
      passengerLift: "I need a passenger lift",
      noMobiltyNeeds: "I don't use mobility aids",
    };
  }
  return {
    manualWheelchair: "They use a manual wheelchair",
    poweredWheelchair: "They use a powered wheelchair",
    scooter: "They use a scooter",
    sticksOrCrutches: "They use a stick(s)/crutch(es)",
    walkingFrame: "They use a walking frame",
    guideDog: "They have a guide/helping dog",
    passengerLift: "They need a passenger lift",
    noMobiltyNeeds: "They don't use mobility aids",
  };
};

const MobilityAidsQuery = ({ setMobilityAids }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const registerForYourself = formValues["registerForYourself"] === "yes";

  const mobilityAidsOptions = MobilityAidsOptions(registerForYourself);

  const question = registerForYourself
    ? "Do you use a mobility aid to help you get around?"
    : `Does ${formValues["firstName"]} use a mobility aid to help themselves get around?`;

  const mobilityAidsError = stateApi.submitFailed
    ? stateApi.errors?.selectMobilityAids
    : null;

  const otherRequirementRequired = stateApi.submitFailed
    ? stateApi.errors?.mobilityAids?.otherRequirement
    : null;

  useEffect(() => {
    if (formValues.mobilityAids) {
      setMobilityAids(formValues.mobilityAids);
    }
  }, [formValues.mobilityAids]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 3 of 3"
        sectionName={getRequirementsSectionName(stateApi)}
      />
      <Question text={question} />
      <p>Select all that apply</p>
      <CheckboxContainer error={mobilityAidsError}>
        <FieldError text={mobilityAidsError} />
        {Object.keys(mobilityAidsOptions).map((option) => (
          <Checkbox
            key={mobilityAidsOptions[option]}
            label={mobilityAidsOptions[option]}
            fieldName={`mobilityAids.${option}`}
          />
        ))}
        <Checkbox label="Other" fieldName="mobilityAids.other" />
        {formValues.mobilityAids?.other ? (
          <TextArea
            label="Please describe your requirements"
            fieldName="mobilityAids.otherRequirement"
            validation={required}
            error={otherRequirementRequired}
          />
        ) : null}
      </CheckboxContainer>
    </FormSection>
  );
};

MobilityAidsQuery.propTypes = {
  setMobilityAids: PropTypes.func,
};

MobilityAidsQuery.defaultProps = {
  setMobilityAids: () => {},
};

export default MobilityAidsQuery;
