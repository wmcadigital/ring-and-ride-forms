import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import { required } from "../../common/validation";

const BookingParty = ({ setBookingParty }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed ? stateApi.errors?.bookingParty : null;

  useEffect(() => {
    if (formValues.bookingParty) {
      setBookingParty(formValues.bookingParty);
    }
  }, [formValues.bookingParty]);

  return (
    <FormSection>
      <Question text="Who are you making the booking for?" />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label="Myself"
          validation={required}
          value="mySelf"
          fieldName="bookingParty"
        />
        <RadioButton
          key={2}
          label="On behalf of someone else"
          validation={required}
          value="behalfSomeone"
          fieldName="bookingParty"
        />
        <RadioButton
          key={3}
          label="On behalf of a group"
          validation={required}
          value="behalfGroup"
          fieldName="bookingParty"
        />
      </RadioGroup>
    </FormSection>
  );
};

BookingParty.propTypes = {
  setBookingParty: PropTypes.func,
};

BookingParty.defaultProps = {
  setBookingParty: () => {},
};

export default BookingParty;
