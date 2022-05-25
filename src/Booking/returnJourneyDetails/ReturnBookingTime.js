import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import TimeInput from "../../common/TimeInput";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutReturnJourneySectionName from "./getAboutReturnJourneySectionName";

const ReturnBookingTime = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  let question = "";
  if (bookingParty === "mySelf") {
    question = "What time do you want to be picked up?";
  } else if (bookingParty === "behalfSomeone") {
    question = `What time does ${formValues["firstName"]} want to be picked up?`;
  } else if (bookingParty === "behalfGroup") {
    question = "What time is the group to be picked up?";
  }

  const error = stateApi.submitFailed
    ? stateApi.errors?.["returnPickup.timeInput"]
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <TimeInput label="Time of travel" prefix="returnPickup" error={error} />
    </FormSection>
  );
};

export default ReturnBookingTime;
