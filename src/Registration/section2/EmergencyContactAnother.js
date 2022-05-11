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

const EmergencyContactAnother = ({ setEmergencyContactAnother }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.emergencyContactAnother
    : null;

  const question = `Does ${formValues["firstName"]} have an emergency contact?`;

  useEffect(() => {
    if (formValues.emergencyContactAnother) {
      setEmergencyContactAnother(formValues.emergencyContactAnother);
    }
  }, [formValues.emergencyContactAnother]);

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
          fieldName="emergencyContactAnother"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="emergencyContactAnother"
        />
      </RadioGroup>
    </FormSection>
  );
};

EmergencyContactAnother.propTypes = {
  setEmergencyContactAnother: PropTypes.func,
};

EmergencyContactAnother.defaultProps = {
  setEmergencyContactAnother: () => {},
};

export default EmergencyContactAnother;
