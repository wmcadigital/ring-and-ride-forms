import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import TimeInput from "../../common/TimeInput";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutJourneySectionName from "./getAboutJourneySectionName";

const BookingTime = () => {
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
    ? stateApi.errors?.["outwardPickup.timeInput"]
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("2", stateApi)}
        sectionName={getAboutJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <TimeInput label="Time of travel" prefix="outwardPickup" error={error} />
    </FormSection>
  );
};

export default BookingTime;
