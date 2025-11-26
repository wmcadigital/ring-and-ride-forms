import { useEffect } from "react";
import { useFormState, useForm } from "react-final-form";
import PropTypes from "prop-types";

import Ethnicity, { PreferNotToSayLabel } from "./Ethnicity";
import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import { required } from "../../common/validation";
import getAboutSectionName from "./getAboutSectionName";

const EthnicGroup = ({ setEthnicGroup, setGoToPage }) => {
  const stateApi = useFormState();
  const formApi = useForm();

  const formValues = stateApi.values;
  const question =
    formValues["registerForYourself"] === "yes"
      ? "What is your ethnic group?"
      : `What is ${formValues["firstName"]}'s ethnic group?`;

  const error = stateApi.submitFailed ? stateApi.errors?.ethnicity : null;

  useEffect(() => {
    if (formValues.ethnicity) {
      setEthnicGroup(formValues.ethnicity);
      if (stateApi?.modified?.ethnicity) {
        formApi.mutators.setFormAttribute("specificEthnicity", undefined);
        setGoToPage(null);
      }
    }
  }, [formValues.ethnicity]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <p>
        This information helps TfWM to monitor if users of the Ring and Ride
        service are reflective of regional diversity.
      </p>
      <RadioGroup error={error}>
        <FieldError text={error} />
        {Object.keys(Ethnicity).map((ethnicity, index) => (
          <RadioButton
            key={index}
            label={Ethnicity[ethnicity].label}
            validation={required}
            value={ethnicity}
            fieldName="ethnicity"
          />
        ))}
        <p className="wmnds-m-b-sm">Or</p>
        <RadioButton
          key="preferNotToSay"
          label={PreferNotToSayLabel["preferNotToSay"]}
          validation={required}
          value="preferNotToSay"
          fieldName="ethnicity"
        />
      </RadioGroup>
    </FormSection>
  );
};

EthnicGroup.propTypes = {
  setEthnicGroup: PropTypes.func,
  setGoToPage: PropTypes.func,
};

EthnicGroup.defaultProps = {
  setEthnicGroup: () => {},
  setGoToPage: () => {},
};

export default EthnicGroup;
