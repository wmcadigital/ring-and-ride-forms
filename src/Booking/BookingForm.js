import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import FormContentWrapper from "../common/FormContentWrapper";
import Header from "../common/Header";
import BreadCrumb from "../common/BreadCrumb";
import FormWizard from "../common/FormWizard";
import { validateContactPreferences } from "../common/validation";
import { Helmet, HelmetProvider } from "react-helmet-async";

import RegistrationArea from "./section1/RegistrationArea";
import BookingParty from "./section1/BookingParty";
import BookingName from "./section1/BookingName";
import RegistrationNoEntry from "./section1/RegistrationNoEntry";
import ContactEmail from "../Shared/ContactEmail";
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
  FORM_SUBMIT_ERROR,
} from "../common/validation";

import sendFormData from "../api/sendFormData";

const BookingForm = () => {
  const location = useLocation();

  const navigate = useNavigate();

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

  const [formSubmitting, setFormSubmitting] = useState(null);
  const [formSubmitError, setFormSubmitError] = useState(null);

  // show area page if current date is 20th January 2023 or greater
  const currentDate = new Date();
  const areaDate = new Date("Jan 20, 2023 00:00:00");

  const cDate =
    currentDate.getFullYear() +
    ("0" + (currentDate.getMonth() + 1)).slice(-2) +
    ("0" + currentDate.getDate()).slice(-2);
  const aDate =
    areaDate.getFullYear() +
    ("0" + (areaDate.getMonth() + 1)).slice(-2) +
    ("0" + areaDate.getDate()).slice(-2);

  useEffect(() => {
    setExternalPage(location?.state?.orderNo);
  }, [location?.state?.orderNo]);

  const onSubmit = async (values) => {
    try {
      setFormSubmitError(null);
      const response = await sendFormData(values, "Ring & Ride Booking Form");
      if (response.includes("Version")) {
        navigate("/booking/confirmed");
      } else {
        setFormSubmitError(FORM_SUBMIT_ERROR);
      }
    } catch {
      setFormSubmitError(FORM_SUBMIT_ERROR);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Book a Ring and Ride journey</title>
          <link rel="canonical" href="http://ringandride.org.uk/contact" />
        </Helmet>
      </HelmetProvider>
      <Header heading="Book a Ring and Ride journey" />
      <FormContentWrapper>
        <BreadCrumb currentPageName="Booking" />
        <FormWizard
          onSubmit={onSubmit}
          initialValues={{
            passengers: [],
            ...location?.state?.formValues,
            formName: "Booking",
          }}
          goToPage={goToPage}
          setGoToPage={setGoToPage}
          externalPage={externalPage}
          setExternalPage={setExternalPage}
          disableBackButton={formSubmitting}
        >
          {cDate >= aDate ? <RegistrationArea /> : null}
          <BookingParty setBookingParty={setBookingParty} />
          <BookingName />
          {bookingParty !== "behalfGroup" ? (
            <RegistrationNoEntry orderNo={2} />
          ) : undefined}
          <ContactEmail />
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
            setFormSubmitting={setFormSubmitting}
            formSubmitError={formSubmitError}
          />
        </FormWizard>
      </FormContentWrapper>
    </>
  );
};

export default BookingForm;
