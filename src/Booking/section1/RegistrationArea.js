import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import { required, coventry } from "../../common/validation";

const RegistrationArea = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed ? stateApi.errors?.Origin : null;

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
          validation={coventry}
          value="Coventry"
          fieldName="Origin"
        />
        {formValues.Origin === "Coventry" ? (
          <>
            <div className="wmnds-warning-text wmnds-m-b-md">
              <svg className="wmnds-warning-text__icon">
                <use
                  xlinkHref="#wmnds-general-warning-triangle"
                  href="#wmnds-general-warning-triangle"
                ></use>
              </svg>
              If you are starting your trip in Coventry you need to book using
              West Midlands On-Demand.{" "}
              <a
                href="https://www.tfwm.org.uk/plan-your-journey/ways-to-travel/buses-in-the-west-midlands/on-demand-buses-in-the-west-midlands/"
                title="Find out more about West Midlands On-Demand"
                target="_blank"
                rel="noreferrer"
              >
                Find out more on the Transport For West Midlands Website
              </a>
            </div>
          </>
        ) : null}
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

export default RegistrationArea;
