import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import getRequirementsSectionName from "./getRequirementsSectionName";
import { required } from "../../common/validation";

const ConditionQuery = ({ setHasCondition }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed ? stateApi.errors?.hasCondition : null;

  const question =
    formValues["registerForYourself"] === "yes"
      ? "Do you have any conditions that cause these problems?"
      : `Does ${formValues["firstName"]} have any conditions that cause these problems?`;

  useEffect(() => {
    if (formValues.hasCondition) {
      setHasCondition(formValues.hasCondition);
    }
  }, [formValues.hasCondition]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 3 of 3"
        sectionName={getRequirementsSectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="hasCondition"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="hasCondition"
        />
      </RadioGroup>
    </FormSection>
  );
};

ConditionQuery.propTypes = {
  setHasCondition: PropTypes.func,
};

ConditionQuery.defaultProps = {
  setHasCondition: () => {},
};

export default ConditionQuery;
