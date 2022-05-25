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

const AdditionalPassengerReturnQuery = ({ setAdditionalPassengerReturn }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  const error = stateApi.submitFailed
    ? stateApi.errors?.additionalPassengerReturn
    : null;

  const question =
    bookingParty === "mySelf"
      ? "Do you want to bring anyone else with you on the return journey?"
      : `Does ${formValues["firstName"]} want to bring anyone else with them on the return journey?`;

  useEffect(() => {
    if (formValues.additionalPassengerReturn) {
      setAdditionalPassengerReturn(formValues.additionalPassengerReturn);
    }
  }, [formValues.additionalPassengerReturn]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <label className="wmrards-fe-label" htmlFor="additionalPassengerReturn">
          For example, a carer or guardian. They do not need to be a registered
          Ring and Ride scheme user.
        </label>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="additionalPassengerReturn"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="additionalPassengerReturn"
        />
      </RadioGroup>
    </FormSection>
  );
};

AdditionalPassengerReturnQuery.propTypes = {
  setAdditionalPassengerReturn: PropTypes.func,
};

AdditionalPassengerReturnQuery.defaultProps = {
  setAdditionalPassengerReturn: () => {},
};

export default AdditionalPassengerReturnQuery;
