import { useFormState, useForm } from "react-final-form";

import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import NumberInput from "../../common/NumberInput";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutReturnJourneySectionName from "./getAboutReturnJourneySectionName";
import {
  required,
  numbersOnly,
  numberGreaterThanZero,
  composeValidators,
} from "../../common/validation";

const ReturnAdditionalPassengerNumbers = () => {
  const stateApi = useFormState();
  const formApi = useForm();

  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];
  const passengerReturnNumbers = formValues["additionalReturnPassengerNumbers"];

  let question = "";
  if (bookingParty === "mySelf") {
    question = "How many people are joining you on the return journey?";
  } else {
    question = `How many people are joining ${formValues["firstName"]} on the return journey?`;
  }

  const pronoun = formValues["bookingParty"] === "mySelf" ? "you" : "them";

  const error = stateApi.submitFailed
    ? stateApi.errors?.["additionalReturnPassengerNumbers"]
    : null;

  const decreaseNumberCallback = () =>
    formApi.mutators.setFormAttribute(
      "additionalReturnPassengerNumbers",
      passengerReturnNumbers - 1
    );
  const increaseNumberCallback = () =>
    formApi.mutators.setFormAttribute(
      "additionalReturnPassengerNumbers",
      passengerReturnNumbers + 1
    );

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <NumberInput
        fieldName="additionalReturnPassengerNumbers"
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

export default ReturnAdditionalPassengerNumbers;
