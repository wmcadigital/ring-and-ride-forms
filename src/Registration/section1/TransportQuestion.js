import { useEffect } from "react";
import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import { required } from "../../common/validation";
import getAboutSectionName from "./getAboutSectionName";

const TransportQuestion = ({ setDifficultToUseTransport }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed
    ? stateApi.errors?.difficultToUsePublicTransport
    : null;

      useEffect(() => {
    if (formValues.difficultToUsePublicTransport) {
      setDifficultToUseTransport(formValues.difficultToUsePublicTransport);
    }
  }, [formValues.difficultToUsePublicTransport]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={"Do you find it difficult to use public transport?"} />
      <p>
        For example, if you cannot get on a bus or travel comfortably when you are on board.
      </p>
      <RadioGroup error={error}>
        <FieldError text={error} />
       <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="difficultToUsePublicTransport"
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="difficultToUsePublicTransport"
        />
      </RadioGroup>
    </FormSection>
  );
};

TransportQuestion.propTypes = {
  setDifficultToUseTransport: PropTypes.func,
};

TransportQuestion.defaultProps = {
  setDifficultToUseTransport: () => {},
};

export default TransportQuestion;
