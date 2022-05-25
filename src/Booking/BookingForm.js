import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import FormContentWrapper from "../common/FormContentWrapper";
import Header from "../common/Header";
import BreadCrumb from "../common/BreadCrumb";
import FormWizard from "../common/FormWizard";
import { validateContactPreferences } from "../common/validation";

import BookingParty from "./section1/BookingParty";
import BookingName from "./section1/BookingName";
import RegistrationNoEntry from "./section1/RegistrationNoEntry";
import ContactPreferenceEntry from "./section1/ContactPreferenceEntry";
import IncludeInGroupBooking from "./section1/IncludeInGroupBooking";
import AboutPassengers from "./aboutPassengers/AboutPassengers";
import BookingDate from "./journeyDetails/BookingDate";
import BookingTime from "./journeyDetails/BookingTime";
import OutwardCollectionAddress from "./journeyDetails/OutwardCollectionAddress";
import OtherOutwardCollectionAddress from "./journeyDetails/OtherOutwardCollectionAddress";
import OutwardDestinationAddress from "./journeyDetails/OutwardDestinationAddress";
import AdditionalPassengerQuery from "./journeyDetails/AdditionalPassengerQuery";
import AdditionalPassengerNumbers from "./journeyDetails/AdditionalPassengerNumbers";
import ReturnJourneyQuery from "./returnJourneyDetails/ReturnJourneyQuery";
import ReturnBookingTime from "./returnJourneyDetails/ReturnBookingTime";
import ReturnCollectionAddress from "./returnJourneyDetails/ReturnCollectionAddress";
import OtherReturnCollectionAddress from "./returnJourneyDetails/OtherReturnCollectionAddress";
import ReturnDestinationAddress from "./returnJourneyDetails/ReturnDestinationAddress";
import OtherReturnDestinationAddress from "./returnJourneyDetails/OtherReturnDestinationAddress";
import AdditionalPassengerReturnQuery from "./returnJourneyDetails/AdditionalPassengerReturnQuery";
import ConfirmSameAdditionalPassenger from "./returnJourneyDetails/ConfirmSameAdditionalPassenger";
import ConfirmSameGroup from "./returnJourneyDetails/ConfirmSameGroup";
import ReturnAdditionalPassengerNumbers from "./returnJourneyDetails/ReturnAdditionalPassengerNumbers";
import OtherInformation from "./otherInformation/OtherInformation";
import CheckAnswers from "./CheckAnswers";
import { validateBookingDate } from "./validation";
import { validateReturnPickupTime } from "./returnJourneyDetails/validation";
import {
  validateTimeInput,
  addressIdPresent,
  composeFormValidators,
  validateCheckAnswers,
} from "../common/validation";

const BookingForm = () => {
  const location = useLocation();
  const [bookingParty, setBookingParty] = useState(
    location?.state?.formValues["bookingParty"]
  );

  const [includeInGroupBooking, setIncludeInGroupBooking] = useState(
    location?.state?.formValues["includeInGroupBooking"]
  );
  const [goToPage, setGoToPage] = useState(null);
  const [externalPage, setExternalPage] = useState(null);
  const [outwardCollectionAddress, setOutwardCollectionAddress] =
    useState(null);
  const [otherOutwardCollectionAddresses, setOtherOutwardCollectionAddresses] =
    useState([]);
  const [outwardDestinationAddresses, setOutwardDestinationAddresses] =
    useState([]);
  const [otherReturnCollectionAddresses, setOtherReturnCollectionAddresses] =
    useState([]);
  const [otherReturnDestinationAddresses, setOtherReturnDestinationAddresses] =
    useState([]);
  const [additionalPassenger, setAdditionalPassenger] = useState(null);
  const [additionalPassengerReturn, setAdditionalPassengerReturn] =
    useState(null);
  const [returnJourney, setReturnJourney] = useState(null);
  const [returnCollectionAddress, setReturnCollectionAddress] = useState(null);
  const [returnDestinationAddress, setReturnDestinationAddress] =
    useState(null);
  const [confirmSameAdditionalPassenger, setConfirmSameAdditionalPassenger] =
    useState(null);
  const [groupSameAsOutward, setGroupSameAsOutward] = useState(null);
  const [hideFinalSubmit, setHideFinalSubmit] = useState(false);

  useEffect(() => {
    setExternalPage(location?.state?.orderNo);
  }, [location?.state?.orderNo]);

  return (
    <>
      <Header heading="Book a Ring and Ride journey" />
      <FormContentWrapper>
        <BreadCrumb currentPageName="Booking" />
        <FormWizard
          onSubmit={() => {}}
          initialValues={{ passengers: [], ...location?.state?.formValues }}
          goToPage={goToPage}
          setGoToPage={setGoToPage}
          externalPage={externalPage}
          setExternalPage={setExternalPage}
        >
          <BookingParty setBookingParty={setBookingParty} />
          <BookingName />
          {bookingParty !== "behalfGroup" ? (
            <RegistrationNoEntry orderNo={2} />
          ) : undefined}
          <ContactPreferenceEntry validate={validateContactPreferences} />
          {bookingParty === "behalfGroup" ? (
            <IncludeInGroupBooking
              setIncludeInGroupBooking={setIncludeInGroupBooking}
            />
          ) : undefined}
          {bookingParty === "behalfGroup" && includeInGroupBooking === "yes" ? (
            <RegistrationNoEntry orderNo={4} />
          ) : undefined}
          {bookingParty === "behalfGroup" ? (
            <AboutPassengers hideSubmit />
          ) : undefined}
          <BookingDate validate={validateBookingDate} />
          <BookingTime validate={validateTimeInput("outwardPickup")} />
          {bookingParty !== "behalfGroup" ? (
            <OutwardCollectionAddress
              setOutwardCollectionAddress={setOutwardCollectionAddress}
              setGoToPage={setGoToPage}
            />
          ) : undefined}
          {outwardCollectionAddress === "other" ||
          bookingParty === "behalfGroup" ? (
            <OtherOutwardCollectionAddress
              otherOutwardCollectionAddresses={otherOutwardCollectionAddresses}
              setOtherOutwardCollectionAddresses={
                setOtherOutwardCollectionAddresses
              }
              validate={addressIdPresent("otherOutward")}
            />
          ) : undefined}
          <OutwardDestinationAddress
            outwardDestinationAddresses={outwardDestinationAddresses}
            setOutwardDestinationAddresses={setOutwardDestinationAddresses}
            validate={addressIdPresent("outwardDestination")}
          />
          {bookingParty !== "behalfGroup" ? (
            <AdditionalPassengerQuery
              setAdditionalPassenger={setAdditionalPassenger}
            />
          ) : undefined}
          {additionalPassenger === "yes" && bookingParty !== "behalfGroup" ? (
            <AdditionalPassengerNumbers />
          ) : undefined}
          <ReturnJourneyQuery setReturnJourney={setReturnJourney} />
          {returnJourney === "yes" ? (
            <ReturnBookingTime
              validate={composeFormValidators(
                validateTimeInput("returnPickup"),
                validateReturnPickupTime
              )}
            />
          ) : undefined}
          {returnJourney === "yes" ? (
            <ReturnCollectionAddress
              setReturnCollectionAddress={setReturnCollectionAddress}
              setGoToPage={setGoToPage}
            />
          ) : undefined}
          {returnJourney === "yes" && returnCollectionAddress === "other" ? (
            <OtherReturnCollectionAddress
              otherReturnCollectionAddresses={otherReturnCollectionAddresses}
              setOtherReturnCollectionAddresses={
                setOtherReturnCollectionAddresses
              }
              validate={addressIdPresent("otherReturn")}
              setGoToPage={setGoToPage}
            />
          ) : undefined}
          {returnJourney === "yes" ? (
            <ReturnDestinationAddress
              setReturnDestinationAddress={setReturnDestinationAddress}
              setGoToPage={setGoToPage}
            />
          ) : undefined}
          {returnJourney === "yes" && returnDestinationAddress === "other" ? (
            <OtherReturnDestinationAddress
              otherReturnDestinationAddresses={otherReturnDestinationAddresses}
              setOtherReturnDestinationAddresses={
                setOtherReturnDestinationAddresses
              }
              validate={addressIdPresent("otherReturnDestination")}
            />
          ) : undefined}
          {returnJourney === "yes" &&
          additionalPassenger === "no" &&
          bookingParty !== "behalfGroup" ? (
            <AdditionalPassengerReturnQuery
              setAdditionalPassengerReturn={setAdditionalPassengerReturn}
            />
          ) : undefined}
          {returnJourney === "yes" &&
          additionalPassenger === "yes" &&
          bookingParty !== "behalfGroup" ? (
            <ConfirmSameAdditionalPassenger
              setConfirmSameAdditionalPassenger={
                setConfirmSameAdditionalPassenger
              }
            />
          ) : undefined}
          {returnJourney === "yes" && bookingParty === "behalfGroup" ? (
            <ConfirmSameGroup setGroupSameAsOutward={setGroupSameAsOutward} />
          ) : undefined}
          {returnJourney === "yes" &&
          bookingParty !== "behalfGroup" &&
          (additionalPassengerReturn === "yes" ||
            (additionalPassenger === "yes" &&
              confirmSameAdditionalPassenger === "no")) ? (
            <ReturnAdditionalPassengerNumbers />
          ) : undefined}
          {returnJourney === "yes" &&
          bookingParty === "behalfGroup" &&
          groupSameAsOutward === "no" ? (
            <AboutPassengers returnPassengers hideSubmit />
          ) : undefined}
          <OtherInformation />
          <CheckAnswers
            setGoToPage={setGoToPage}
            validate={validateCheckAnswers}
            hideSubmit={hideFinalSubmit}
            setHideFinalSubmit={setHideFinalSubmit}
            setConfirmSameAdditionalPassenger={
              setConfirmSameAdditionalPassenger
            }
          />
        </FormWizard>
      </FormContentWrapper>
    </>
  );
};

export default BookingForm;
