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

const ConfirmSameAdditionalPassenger = ({
  setConfirmSameAdditionalPassenger,
}) => {
  const stateApi = useFormState();
  const formApi = useForm();

  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  const error = stateApi.submitFailed
    ? stateApi.errors?.confirmSameAdditionalPassenger
    : null;

  const question =
    bookingParty === "mySelf"
      ? "Are the same number of people joining you on the return journey?"
      : `Are the same number of people joining ${formValues["firstName"]} on the return journey?`;

  const aloneLabel =
    bookingParty === "mySelf"
      ? "I'm returning alone"
      : "They are returning alone";

  useEffect(() => {
    if (formValues.confirmSameAdditionalPassenger) {
      setConfirmSameAdditionalPassenger(
        formValues.confirmSameAdditionalPassenger
      );
    }
  }, [formValues.confirmSameAdditionalPassenger]);

  const radioButtonClick = (alone) => {
    const passengerNumbersReturn = alone
      ? 0
      : formValues.additionalPassengerNumbers;
    formApi.mutators.setFormAttribute(
      "additionalReturnPassengerNumbers",
      passengerNumbersReturn
    );
  };

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Yes"
          validation={required}
          value="yes"
          fieldName="confirmSameAdditionalPassenger"
          onClickCallback={() => radioButtonClick(false)}
        />
        <RadioButton
          key={2}
          label="No"
          validation={required}
          value="no"
          fieldName="confirmSameAdditionalPassenger"
          onClickCallback={() => radioButtonClick(false)}
        />
        <RadioButton
          key={3}
          label={aloneLabel}
          validation={required}
          value="alone"
          fieldName="confirmSameAdditionalPassenger"
          onClickCallback={() => radioButtonClick(true)}
        />
      </RadioGroup>
    </FormSection>
  );
};

ConfirmSameAdditionalPassenger.propTypes = {
  setConfirmSameAdditionalPassenger: PropTypes.func,
};

ConfirmSameAdditionalPassenger.defaultProps = {
  setConfirmSameAdditionalPassenger: () => {},
};

export default ConfirmSameAdditionalPassenger;
