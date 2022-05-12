import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState, useForm } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutReturnJourneySectionName from "./getAboutReturnJourneySectionName";

import { required } from "../../common/validation";

const ConfirmSameGroup = ({ setGroupSameAsOutward }) => {
  const stateApi = useFormState();
  const formApi = useForm();

  const formValues = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.groupSameAsOutward
    : null;

  useEffect(() => {
    if (formValues.groupSameAsOutward) {
      if (!formValues.returnPassengers) {
        formApi.mutators.setFormAttribute(
          "returnPassengers",
          formValues.passengers
        );
      }
      setGroupSameAsOutward(formValues.groupSameAsOutward);
    }
  }, [formValues.groupSameAsOutward]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text="Are the same number of passengers on the return journey?" />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="groupSameAsOutward"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="groupSameAsOutward"
        />
      </RadioGroup>
    </FormSection>
  );
};

ConfirmSameGroup.propTypes = {
  setGroupSameAsOutward: PropTypes.func,
};

ConfirmSameGroup.defaultProps = {
  setGroupSameAsOutward: () => {},
};

export default ConfirmSameGroup;
