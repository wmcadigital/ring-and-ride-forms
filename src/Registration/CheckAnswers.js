import { useEffect } from "react";
import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import Question from "../common/Question";
import Checkbox from "../common/Checkbox";
import FieldError from "../common/FieldError";
import Table from "../common/Table";
import CheckAnswerRow from "../common/CheckAnswerRow";
import CheckboxContainer from "../common/CheckboxContainer";
import formatDate from "../common/formatDate";
import formatOptions from "../common/formatOptions";
import AddressFormatted from "../common/AddressFormatted";
import ErrorPanel from "../common/ErrorPanel";

import contactPreferenceLabels from "./section1/ContactPreferenceOptions";
import Ethnicity, { PreferNotToSayLabel } from "./section1/Ethnicity";
import { BusProblemOptions } from "./section3/StandardBusProblems";
import { ReasonOptions } from "./section3/StandardBusReasons";
import { MobilityAidsOptions } from "./section3/MobilityAidsQuery";
import getAboutSectionName from "./section1/getAboutSectionName";
import getRequirementsSectionName from "./section3/getRequirementsSectionName";

const CheckAnswers = ({ setGoToPage, setFormSubmitting, formSubmitError }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const submitting = stateApi.submitting;

  useEffect(() => {
    setFormSubmitting(submitting);
  }, [setFormSubmitting, submitting]);

  const agreeLegalError = stateApi.submitFailed ? stateApi.errors?.legal : null;

  const registerForYourself = formValues["registerForYourself"] === "yes";

  const ethnicity = formValues["ethnicity"];
  const specificEthnicity = formValues["specificEthnicity"];
  const ethnicityNotGiven = ethnicity === "preferNotToSay";
  const specificEthnicityNotGiven = specificEthnicity === "preferNotToSay";
  const preferNotToSayLabel = PreferNotToSayLabel["preferNotToSay"];
  const ethnicityDisplay = ethnicityNotGiven
    ? preferNotToSayLabel
    : Ethnicity[ethnicity].label;
  const specificEthnicityDisplay = ethnicityNotGiven
    ? ""
    : ` - ${
        specificEthnicityNotGiven
          ? preferNotToSayLabel
          : Ethnicity[ethnicity].specific[specificEthnicity].label
      }`;

  const baseOffSet = ethnicityNotGiven ? 7 : 8;
  const offSet1 =
    !registerForYourself && formValues["emergencyContact"] === "no"
      ? baseOffSet + 1
      : baseOffSet;

  const emergencyContactPresent =
    formValues["emergencyContact"] === "yes" ||
    formValues["emergencyContactAnother"] === "yes";

  const offSet2 = emergencyContactPresent ? offSet1 + 6 : offSet1 + 1;

  const offSet3 =
    formValues["hasCondition"] == "yes" ? offSet2 + 4 : offSet2 + 3;

  return (
    <>
      <Question text="Check your answers" />
      {formSubmitError ? <ErrorPanel message={formSubmitError} /> : null}
      <h3>{getAboutSectionName(stateApi)}</h3>
      <Table>
        <CheckAnswerRow
          label="Name"
          value={`${formValues["firstName"]} ${formValues["lastName"]}`}
          changeValueCallback={() => setGoToPage(2)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Date of birth"
          value={formatDate(
            formValues["bdayDay"],
            formValues["bdayMonth"],
            formValues["bdayYear"]
          )}
          changeValueCallback={() => setGoToPage(3)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Telephone number"
          value={formValues["phoneNo"]}
          changeValueCallback={() => setGoToPage(4)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Email address"
          value={formValues["emailAddress"]}
          changeValueCallback={() => setGoToPage(5)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Address"
          value={<AddressFormatted addressObj={formValues["registered"]} />}
          changeValueCallback={() => setGoToPage(6)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Preferred method of contact"
          value={formatOptions(
            formValues["contactPreference"],
            contactPreferenceLabels
          )}
          changeValueCallback={() => setGoToPage(7)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Ethnicity"
          value={`${ethnicityDisplay}${specificEthnicityDisplay}`}
          changeValueCallback={() => setGoToPage(8)}
          disableButton={submitting}
        />
      </Table>
      {emergencyContactPresent ? (
        <>
          <h3>Emergency Contact</h3>
          <Table>
            <CheckAnswerRow
              label="Name"
              value={`${formValues["emergencyFirstName"]} ${formValues["emergencyLastName"]}`}
              changeValueCallback={() => setGoToPage(offSet1 + 3)}
              disableButton={submitting}
            />
            <CheckAnswerRow
              label={
                registerForYourself
                  ? "Relationship to you"
                  : "Relationship to applicant"
              }
              value={formValues["emergencyRelationship"]}
              changeValueCallback={() => setGoToPage(offSet1 + 4)}
              disableButton={submitting}
            />
            <CheckAnswerRow
              label="Telephone number"
              value={formValues["emergencyPhoneNo"]}
              changeValueCallback={() => setGoToPage(offSet1 + 5)}
              disableButton={submitting}
            />
            <CheckAnswerRow
              label="Email address"
              value={formValues["emergencyEmailAddress"]}
              changeValueCallback={() => setGoToPage(offSet1 + 6)}
              disableButton={submitting}
            />
            <CheckAnswerRow
              label="Address"
              value={<AddressFormatted addressObj={formValues["emergency"]} />}
              changeValueCallback={() => setGoToPage(offSet1 + 7)}
              disableButton={submitting}
            />
          </Table>
        </>
      ) : null}
      <h3>{getRequirementsSectionName(stateApi)}</h3>
      <Table>
        <CheckAnswerRow
          label="Problems accessing standard services"
          value={formatOptions(
            formValues["standardBusProb"],
            BusProblemOptions(registerForYourself)
          )}
          changeValueCallback={() => setGoToPage(offSet2 + 2)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Reasons"
          value={`${formatOptions(
            formValues["standardBusReason"],
            ReasonOptions(registerForYourself)
          )}${
            formValues["standardBusReason"]?.other === true
              ? `, ${formValues["standardBusReason"].otherReason}`
              : ""
          }`}
          changeValueCallback={() => setGoToPage(offSet2 + 3)}
          disableButton={submitting}
        />
        {formValues["hasCondition"] == "yes" ? (
          <CheckAnswerRow
            label={
              registerForYourself
                ? "What conditions do you have?"
                : "What conditions do they have?"
            }
            value={formValues["conditionDetail"]}
            changeValueCallback={() => setGoToPage(offSet2 + 5)}
            disableButton={submitting}
          />
        ) : null}
        <CheckAnswerRow
          label="Use of a mobility aid"
          value={`${formatOptions(
            formValues["mobilityAids"],
            MobilityAidsOptions(registerForYourself)
          )}${
            formValues["mobilityAids"]?.other === true
              ? `, ${formValues["mobilityAids"].otherRequirement}`
              : ""
          }`}
          changeValueCallback={() => setGoToPage(offSet3 + 2)}
          disableButton={submitting}
        />
        {formValues["mobilityAids"]?.manualWheelchair ||
        formValues["mobilityAids"]?.poweredWheelchair ? (
          <CheckAnswerRow
            label={
              formValues["mobilityAids"]?.manualWheelchair
                ? "Manual wheelchair"
                : "Powered wheelchair"
            }
            value={`${registerForYourself ? "I " : "They "}${
              formValues["wheelChairTransfer"] === "yes"
                ? "can transfer"
                : "cannot transfer"
            }`}
            changeValueCallback={() => setGoToPage(offSet3 + 3)}
            disableButton={submitting}
          />
        ) : null}
        {formValues["additionalRequirements"] == "yes" ? (
          <CheckAnswerRow
            label="Additional requirements"
            value={formValues["additionalRequirementsDetails"]}
            changeValueCallback={() => setGoToPage(offSet3 + 4)}
            disableButton={submitting}
          />
        ) : null}
      </Table>
      <h3>Now send your request</h3>
      <p>
        By submitting this enquiry you are confirming that, to the best of your
        knowledge, the details you are providing are correct.
      </p>
      <CheckboxContainer error={agreeLegalError}>
        <FieldError text={agreeLegalError} />
        <Checkbox
          fieldName="agreeRingAndRide"
          label={
            <span>
              Agree that you need to use West Midlands Bus on Demand because you find it either
              impossible or difficult to use other forms of public transport.
              You will inform West Midlands Bus on Demand if there is any change in your
              circumstances that affects your eligibility to use the service.
            </span>
          }
        />
        <Checkbox
          fieldName="agreeTermsAndConditions"
          label={
            <>
              Agree to the{" "}
              <a
                href="https://www.wmca.org.uk/policies"
                target="_blank"
                rel="noreferrer"
              >
                terms and conditions
              </a>
            </>
          }
        />
        <Checkbox
          fieldName="agreePrivacyPolicy"
          label={
            <>
              West Midlands Bus on Demand is a service provided on behalf of Transport for West Midlands (TfWM) by contracted transport operators.  To provide you with this service we will collect and share your information with organizations who will provide the transport to you. We will ensure your information is handled in accordance with data protection legislation. To see how your personal data will be handled, please view our{" "}
              <a
                href="https://www.wmca.org.uk/policies"
                target="_blank"
                rel="noreferrer"
              >
                privacy policy
              </a>
            </>
          }
        />
      </CheckboxContainer>
    </>
  );
};

CheckAnswers.propTypes = {
  setGoToPage: PropTypes.func,
  setFormSubmitting: PropTypes.func,
  formSubmitError: PropTypes.string,
};

export default CheckAnswers;
