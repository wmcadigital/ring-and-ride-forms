import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState, useForm } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import { required } from "../../common/validation";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutSectionName from "./getAboutSectionName";

const IncludeInGroupBooking = ({ setIncludeInGroupBooking }) => {
  const stateApi = useFormState();
  const formApi = useForm();
  const { includeInGroupBooking, registrationNo, passengers } = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.includeInGroupBooking
    : null;

  const question = "Do you want to be included in this group booking?";

  useEffect(() => {
    if (includeInGroupBooking) {
      if (includeInGroupBooking === "no") {
        if (
          registrationNo &&
          passengers.find(
            (passenger) => passenger.registrationNo === registrationNo
          )
        ) {
          const passengersFiltered = passengers.filter(
            (passenger) => passenger.registrationNo !== registrationNo
          );
          formApi.mutators.setFormAttribute("passengers", passengersFiltered);
        }
      }
      setIncludeInGroupBooking(includeInGroupBooking);
    }
  }, [includeInGroupBooking]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("1", stateApi)}
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="includeInGroupBooking"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="includeInGroupBooking"
        />
      </RadioGroup>
    </FormSection>
  );
};

IncludeInGroupBooking.propTypes = {
  setIncludeInGroupBooking: PropTypes.func,
};

IncludeInGroupBooking.defaultProps = {
  setIncludeInGroupBooking: () => {},
};

export default IncludeInGroupBooking;
