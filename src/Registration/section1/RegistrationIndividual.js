import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import ProgressIndicator from "../../common/ProgressIndicator";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import { required } from "../../common/validation";

const RegistrationIndividual = ({ setRegisterForYourself }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.registerForYourself
    : null;

  useEffect(() => {
    if (formValues.registerForYourself) {
      setRegisterForYourself(formValues.registerForYourself);
    }
  }, [formValues.registerForYourself]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={"About you"}
      />
      <Question text="Are you registering for yourself?" />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="registerForYourself"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="registerForYourself"
        />
      </RadioGroup>
    </FormSection>
  );
};

RegistrationIndividual.propTypes = {
  setRegisterForYourself: PropTypes.func,
};

RegistrationIndividual.defaultProps = {
  setRegisterForYourself: () => {},
};

export default RegistrationIndividual;
