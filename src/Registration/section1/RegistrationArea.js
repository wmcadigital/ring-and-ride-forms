import { useEffect } from "react";
import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import { required } from "../../common/validation";

const RegistrationArea = ({ setRegistrationArea }) => {
  const stateApi = useFormState();
  // const formValues = stateApi.values;
  const formValues = stateApi.values;

  const error = stateApi.submitFailed ? stateApi.errors?.Origin : null;

  useEffect(() => {
    if (formValues.Origin) {
      setRegistrationArea(formValues.Origin);
    }
  }, [formValues.Origin]);

  return (
    <FormSection>
      <Question text="Where do you live?" />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Birmingham"
          validation={required}
          value="Birmingham"
          fieldName="Origin"
        />
        <RadioButton
          key={2}
          label="Coventry"
          validation={required}
          value="Coventry"
          fieldName="Origin"
        />
        <RadioButton
          key={3}
          label="Dudley"
          validation={required}
          value="Dudley"
          fieldName="Origin"
        />
        <RadioButton
          key={4}
          label="Sandwell"
          validation={required}
          value="Sandwell"
          fieldName="Origin"
        />
        <RadioButton
          key={5}
          label="Solihull"
          validation={required}
          value="Solihull"
          fieldName="Origin"
        />
        <RadioButton
          key={6}
          label="Walsall"
          validation={required}
          value="Walsall"
          fieldName="Origin"
        />
        <RadioButton
          key={7}
          label="Wolverhampton"
          validation={required}
          value="Wolverhampton"
          fieldName="Origin"
        />
      </RadioGroup>
    </FormSection>
  );
};

RegistrationArea.propTypes = {
  setRegistrationArea: PropTypes.func,
};

RegistrationArea.defaultProps = {
  setRegistrationArea: () => {},
};

export default RegistrationArea;
