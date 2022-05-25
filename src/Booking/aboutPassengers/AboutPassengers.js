import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState, useForm } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";

import PassengerList from "./PassengerList";
import PassengerDetails from "./PassengerDetails";

const AboutPassengers = ({
  returnPassengers,
  summaryPageMode,
  showPassengerDetailsCallback,
  showPassengerListCallback,
  otherFormOpen,
  anotherFormPresent,
}) => {
  const stateApi = useFormState();
  const formApi = useForm();
  const {
    passengers: passengersList,
    returnPassengers: returnPasengerList,
    registrationNo,
    includeInGroupBooking,
    firstName,
    lastName,
    groupSameAsOutward,
  } = stateApi.values;

  const [showPassengerList, setShowPassengerList] = useState(null);
  const [pendingPassengerIndex, setPendingPassengerIndex] = useState(null);

  const passengers = returnPassengers ? returnPasengerList : passengersList;
  const passengersKey = returnPassengers ? "returnPassengers" : "passengers";

  const addPassengerToList = (firstName, lastName, registrationNo, user) => {
    const passengersNew = user
      ? [{ registrationNo, firstName, lastName }, ...passengers]
      : [...passengers, { registrationNo, firstName, lastName }];
    formApi.mutators.setFormAttribute(passengersKey, passengersNew);
    if (summaryPageMode && groupSameAsOutward === "yes") {
      formApi.mutators.setFormAttribute("returnPassengers", passengersNew);
    }
  };

  const changePassengerInList = (
    firstName,
    lastName,
    registrationNo,
    index
  ) => {
    const passengersNew = [...passengers];
    passengersNew[index] = { registrationNo, firstName, lastName };
    if (includeInGroupBooking === "yes" && index === 0 && !returnPassengers) {
      formApi.mutators.setFormAttribute("firstName", firstName);
      formApi.mutators.setFormAttribute("lastName", lastName);
      formApi.mutators.setFormAttribute("registrationNo", registrationNo);
    }
    formApi.mutators.setFormAttribute(passengersKey, passengersNew);
    if (summaryPageMode && groupSameAsOutward === "yes") {
      formApi.mutators.setFormAttribute("returnPassengers", passengersNew);
    }
  };

  const clearPendingPassenger = () => {
    formApi.mutators.setFormAttribute("pendingPassengerFirstName", "");
    formApi.mutators.setFormAttribute("pendingPassengerLastName", "");
    formApi.mutators.setFormAttribute("pendingRegistrationNo", "");
    setPendingPassengerIndex(-1);
  };

  const editPassenger = (firstName, lastName, registrationNo, index) => {
    if (otherFormOpen) {
      return;
    }
    formApi.mutators.setFormAttribute("pendingPassengerFirstName", firstName);
    formApi.mutators.setFormAttribute("pendingPassengerLastName", lastName);
    formApi.mutators.setFormAttribute("pendingRegistrationNo", registrationNo);
    setShowPassengerList(false);
    setPendingPassengerIndex(index);
    showPassengerDetailsCallback();
  };

  const removePassenger = (index) => {
    if (passengers[index].registrationNo === registrationNo) {
      formApi.mutators.setFormAttribute("includeInGroupBooking", "no");
      formApi.mutators.setFormAttribute("registrationNo", "");
    }
    const passengersNew = passengers.filter(
      (_, passengerIndex) => passengerIndex != index
    );
    formApi.mutators.setFormAttribute(passengersKey, passengersNew);
    if (summaryPageMode && groupSameAsOutward === "yes") {
      formApi.mutators.setFormAttribute("returnPassengers", passengersNew);
    }
  };

  const checkForDuplicates = (registrationNo) =>
    passengers.find(
      (passenger, index) =>
        index !== pendingPassengerIndex &&
        registrationNo &&
        passenger.registrationNo === registrationNo
    )
      ? "Duplicate"
      : undefined;

  useEffect(() => {
    if (passengers.length) {
      setShowPassengerList(true);
    } else {
      clearPendingPassenger();
      setShowPassengerList(false);
    }

    if (
      includeInGroupBooking === "yes" &&
      !returnPassengers &&
      !summaryPageMode
    ) {
      if (
        !passengers.find(
          (passenger) => passenger.registrationNo === registrationNo
        )
      ) {
        addPassengerToList(firstName, lastName, registrationNo, true);
      }
    }
  }, [passengers]);

  return (
    <FormSection>
      {!summaryPageMode ? (
        <ProgressIndicator
          sectionPosition={
            returnPassengers ? "Section 4 of 5" : "Section 2 of 5"
          }
          sectionName={
            returnPassengers
              ? "Plan their return journey"
              : "About the passengers"
          }
        />
      ) : null}
      {showPassengerList ? (
        <PassengerList
          passengers={passengers}
          addCallBack={() => {
            if (otherFormOpen) {
              return;
            }
            clearPendingPassenger();
            setShowPassengerList(false);
            showPassengerDetailsCallback();
          }}
          changeCallBack={editPassenger}
          removeCallBack={removePassenger}
          returnPassengers={returnPassengers}
          summaryPageMode={summaryPageMode}
          anotherFormPresent={anotherFormPresent}
        />
      ) : (
        <PassengerDetails
          pendingPassengerIndex={pendingPassengerIndex}
          goToPassengerList={() => {
            setShowPassengerList(true);
            showPassengerListCallback();
          }}
          addPassengerToList={addPassengerToList}
          changePassengerInList={changePassengerInList}
          checkForDuplicates={checkForDuplicates}
          summaryPageMode={summaryPageMode}
        />
      )}
    </FormSection>
  );
};

AboutPassengers.propTypes = {
  returnPassengers: PropTypes.bool,
  summaryPageMode: PropTypes.bool,
  showPassengerDetailsCallback: PropTypes.func,
  showPassengerListCallback: PropTypes.func,
  otherFormOpen: PropTypes.bool,
  anotherFormPresent: PropTypes.bool,
};

AboutPassengers.defaultProps = {
  showPassengerDetailsCallback: () => {},
  showPassengerListCallback: () => {},
};

export default AboutPassengers;
