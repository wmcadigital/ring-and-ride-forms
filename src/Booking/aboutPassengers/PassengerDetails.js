import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import Question from "../../common/Question";
import TextInput from "../../common/TextInput";
import {
  required,
  name,
  composeValidators,
  numbersOnly,
} from "../../common/validation";

const PassengerDetails = ({
  pendingPassengerIndex,
  goToPassengerList,
  addPassengerToList,
  changePassengerInList,
  checkForDuplicates,
  summaryPageMode,
}) => {
  const [continueButtonClicked, setContinueButtonClicked] = useState(null);
  const stateApi = useFormState();

  useEffect(() => {
    if (continueButtonClicked) {
      if (
        !stateApi.errors?.pendingPassengerFirstName &&
        !stateApi.errors?.pendingPassengerLastName &&
        !stateApi.errors?.pendingRegistrationNo
      ) {
        const {
          pendingPassengerFirstName,
          pendingPassengerLastName,
          pendingRegistrationNo,
        } = stateApi.values;
        if (pendingPassengerIndex === -1) {
          addPassengerToList(
            pendingPassengerFirstName,
            pendingPassengerLastName,
            pendingRegistrationNo
          );
        } else {
          changePassengerInList(
            pendingPassengerFirstName,
            pendingPassengerLastName,
            pendingRegistrationNo,
            pendingPassengerIndex
          );
        }

        goToPassengerList();
      }
    }
  }, [continueButtonClicked]);

  const errorFirstName = continueButtonClicked
    ? stateApi.errors?.pendingPassengerFirstName
    : null;

  const errorLastName = continueButtonClicked
    ? stateApi.errors?.pendingPassengerLastName
    : null;

  const errorRegistrationNo = continueButtonClicked
    ? stateApi.errors?.pendingRegistrationNo
    : null;

  return (
    <>
      {summaryPageMode ? (
        <h3>Add/Edit Passenger</h3>
      ) : (
        <Question text="Who will be using the service?" />
      )}
      <p>Enter the name and registration number (if known) of the passenger.</p>
      <TextInput
        fieldName="pendingPassengerFirstName"
        label="First Name"
        validation={composeValidators(required, name)}
        error={errorFirstName}
      />
      <TextInput
        fieldName="pendingPassengerLastName"
        label="Last Name"
        validation={composeValidators(required, name)}
        error={errorLastName}
      />
      <TextInput
        fieldName="pendingRegistrationNo"
        label={
          <>
            {" "}
            Registration number
            <p>For example, 123456</p>
          </>
        }
        validation={composeValidators(numbersOnly, checkForDuplicates)}
        error={errorRegistrationNo}
      />
      <button
        className="wmnds-btn"
        onClick={(e) => {
          e.preventDefault();
          setContinueButtonClicked(
            continueButtonClicked === null || continueButtonClicked === "flop"
              ? "flip"
              : "flop"
          );
        }}
      >
        Continue
      </button>
    </>
  );
};

PassengerDetails.propTypes = {
  pendingPassengerIndex: PropTypes.number,
  goToPassengerList: PropTypes.func,
  addPassengerToList: PropTypes.func,
  changePassengerInList: PropTypes.func,
  checkForDuplicates: PropTypes.func,
  summaryPageMode: PropTypes.bool,
};

PassengerDetails.defaultProps = {
  goToPassengerList: () => {},
  addPassengerToList: () => {},
  changePassengerInList: () => {},
  checkForDuplicates: () => {},
};

export default PassengerDetails;
