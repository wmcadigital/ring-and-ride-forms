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
import getAboutJourneySectionName from "./getAboutJourneySectionName";

import { required } from "../../common/validation";

const AdditionalPassengerQuery = ({ setAdditionalPassenger }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  const error = stateApi.submitFailed
    ? stateApi.errors?.additionalPassenger
    : null;

  const question =
    bookingParty === "mySelf"
      ? "Do you want to bring anyone else with you on the journey?"
      : `Does ${formValues["firstName"]} want to bring anyone else with them on the journey?`;

  useEffect(() => {
    if (formValues.additionalPassenger) {
      setAdditionalPassenger(formValues.additionalPassenger);
    }
  }, [formValues.additionalPassenger]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("2", stateApi)}
        sectionName={getAboutJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <label className="wmnds-fe-label" htmlFor="additionalPassenger">
          For example, a carer or guardian. They do not need to be a registered
          West Midlands Bus on Demand scheme user.
        </label>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="additionalPassenger"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="additionalPassenger"
        />
      </RadioGroup>
    </FormSection>
  );
};

AdditionalPassengerQuery.propTypes = {
  setAdditionalPassenger: PropTypes.func,
};

AdditionalPassengerQuery.defaultProps = {
  setAdditionalPassenger: () => {},
};

export default AdditionalPassengerQuery;
