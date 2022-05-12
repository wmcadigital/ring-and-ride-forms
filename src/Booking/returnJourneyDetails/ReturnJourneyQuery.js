import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutReturnJourneySectionName from "./getAboutReturnJourneySectionName";

import { required } from "../../common/validation";

const ReturnJourneyQuery = ({ setReturnJourney }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  const error = stateApi.submitFailed ? stateApi.errors?.returnJourney : null;

  const question =
    bookingParty === "behalfSomeone"
      ? `Does ${formValues["firstName"]} need to book a return journey on the same day?`
      : "Do you need to book a return journey on the same day?";

  useEffect(() => {
    if (formValues.returnJourney) {
      setReturnJourney(formValues.returnJourney);
    }
  }, [formValues.returnJourney]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="returnJourney"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="returnJourney"
        />
      </RadioGroup>
    </FormSection>
  );
};

ReturnJourneyQuery.propTypes = {
  setReturnJourney: PropTypes.func,
};

ReturnJourneyQuery.defaultProps = {
  setReturnJourney: () => {},
};

export default ReturnJourneyQuery;
