import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import getEmergencySectionName from "./getEmergencySectionName";
import { required } from "../../common/validation";

const EmergencyContact = ({ setEmergencyContact }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.emergencyContact
    : null;

  const question =
    formValues["registerForYourself"] === "yes"
      ? "Do you have someone we can contact in the case of an emergency?"
      : "Are you someone we can contact in the case of an emergency?";

  useEffect(() => {
    if (formValues.emergencyContact) {
      setEmergencyContact(formValues.emergencyContact);
    }
  }, [formValues.emergencyContact]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 3"
        sectionName={getEmergencySectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="emergencyContact"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="emergencyContact"
        />
      </RadioGroup>
    </FormSection>
  );
};

EmergencyContact.propTypes = {
  setEmergencyContact: PropTypes.func,
};

EmergencyContact.defaultProps = {
  setEmergencyContact: () => {},
};

export default EmergencyContact;
