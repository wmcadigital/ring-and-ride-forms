import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import DateInput from "../../common/DateInput";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutJourneySectionName from "./getAboutJourneySectionName";

const BookingDate = () => {
  const stateApi = useFormState();

  const error = stateApi.submitFailed ? stateApi.errors?.bookingDate : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("2", stateApi)}
        sectionName={getAboutJourneySectionName(stateApi)}
      />
      <Question text="What date is the booking for?" />
      <DateInput
        dayFieldName="bookingDateDay"
        monthFieldName="bookingDateMonth"
        yearFieldName="bookingDateYear"
        label="For example, 3 7 1985"
        error={error}
      />
    </FormSection>
  );
};

export default BookingDate;
