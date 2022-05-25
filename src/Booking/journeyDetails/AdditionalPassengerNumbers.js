import { useFormState, useForm } from "react-final-form";

import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import NumberInput from "../../common/NumberInput";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutJourneySectionName from "./getAboutJourneySectionName";
import {
  required,
  numbersOnly,
  numberGreaterThanZero,
  composeValidators,
} from "../../common/validation";

const AdditionalPassengerNumbers = () => {
  const stateApi = useFormState();
  const formApi = useForm();

  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];
  const passengerNumbers = formValues["additionalPassengerNumbers"];

  let question = "";
  if (bookingParty === "mySelf") {
    question = "How many people are joining you on the journey?";
  } else {
    question = `How many people are joining ${formValues["firstName"]} on the journey?`;
  }

  const pronoun = formValues["bookingParty"] === "mySelf" ? "you" : "them";

  const error = stateApi.submitFailed
    ? stateApi.errors?.["additionalPassengerNumbers"]
    : null;

  const decreaseNumberCallback = () =>
    formApi.mutators.setFormAttribute(
      "additionalPassengerNumbers",
      passengerNumbers - 1
    );
  const increaseNumberCallback = () =>
    formApi.mutators.setFormAttribute(
      "additionalPassengerNumbers",
      passengerNumbers + 1
    );

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("2", stateApi)}
        sectionName={getAboutJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <NumberInput
        fieldName="additionalPassengerNumbers"
        label={`Number of people joining ${pronoun} on the journey`}
        defaultValue={1}
        validation={composeValidators(
          required,
          numbersOnly,
          numberGreaterThanZero
        )}
        decreaseNumberCallback={decreaseNumberCallback}
        increaseNumberCallback={increaseNumberCallback}
        error={error}
      />
    </FormSection>
  );
};

export default AdditionalPassengerNumbers;
