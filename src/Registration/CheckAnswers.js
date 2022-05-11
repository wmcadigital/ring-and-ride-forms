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

import contactPreferenceLabels from "./section1/ContactPreferenceOptions";
import Ethnicity, { PreferNotToSayLabel } from "./section1/Ethnicity";
import { BusProblemOptions } from "./section3/StandardBusProblems";
import { ReasonOptions } from "./section3/StandardBusReasons";
import { MobilityAidsOptions } from "./section3/MobilityAidsQuery";
import getAboutSectionName from "./section1/getAboutSectionName";
import getRequirementsSectionName from "./section3/getRequirementsSectionName";

const CheckAnswers = ({ setGoToPage }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

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
      <h3>{getAboutSectionName(stateApi)}</h3>
      <Table>
        <CheckAnswerRow
          label="Name"
          value={`${formValues["firstName"]} ${formValues["lastName"]}`}
          changeValueCallback={() => setGoToPage(1)}
        />
        <CheckAnswerRow
          label="Date of birth"
          value={formatDate(
            formValues["bdayDay"],
            formValues["bdayMonth"],
            formValues["bdayYear"]
          )}
          changeValueCallback={() => setGoToPage(2)}
        />
        <CheckAnswerRow
          label="Telephone number"
          value={formValues["phoneNo"]}
          changeValueCallback={() => setGoToPage(3)}
        />
        <CheckAnswerRow
          label="Email address"
          value={formValues["emailAddress"]}
          changeValueCallback={() => setGoToPage(4)}
        />
        <CheckAnswerRow
          label="Address"
          value={<AddressFormatted addressObj={formValues["registered"]} />}
          changeValueCallback={() => setGoToPage(5)}
        />
        <CheckAnswerRow
          label="Preferred method of contact"
          value={formatOptions(
            formValues["contactPreference"],
            contactPreferenceLabels
          )}
          changeValueCallback={() => setGoToPage(6)}
        />
        <CheckAnswerRow
          label="Ethnicity"
          value={`${ethnicityDisplay}${specificEthnicityDisplay}`}
          changeValueCallback={() => setGoToPage(7)}
        />
      </Table>
      {emergencyContactPresent ? (
        <>
          <h3>Emergency Contact</h3>
          <Table>
            <CheckAnswerRow
              label="Name"
              value={`${formValues["emergencyFirstName"]} ${formValues["emergencyLastName"]}`}
              changeValueCallback={() => setGoToPage(offSet1 + 2)}
            />
            <CheckAnswerRow
              label={
                registerForYourself
                  ? "Relationship to you"
                  : "Relationship to applicant"
              }
              value={formValues["emergencyRelationship"]}
              changeValueCallback={() => setGoToPage(offSet1 + 3)}
            />
            <CheckAnswerRow
              label="Telephone number"
              value={formValues["emergencyPhoneNo"]}
              changeValueCallback={() => setGoToPage(offSet1 + 4)}
            />
            <CheckAnswerRow
              label="Email address"
              value={formValues["emergencyEmailAddress"]}
              changeValueCallback={() => setGoToPage(offSet1 + 5)}
            />
            <CheckAnswerRow
              label="Address"
              value={<AddressFormatted addressObj={formValues["emergency"]} />}
              changeValueCallback={() => setGoToPage(offSet1 + 6)}
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
          changeValueCallback={() => setGoToPage(offSet2 + 1)}
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
          changeValueCallback={() => setGoToPage(offSet2 + 2)}
        />
        {formValues["hasCondition"] == "yes" ? (
          <CheckAnswerRow
            label={
              registerForYourself
                ? "What conditions do you have?"
                : "What conditions do they have?"
            }
            value={formValues["conditionDetail"]}
            changeValueCallback={() => setGoToPage(offSet2 + 4)}
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
          changeValueCallback={() => setGoToPage(offSet3 + 1)}
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
            changeValueCallback={() => setGoToPage(offSet3 + 2)}
          />
        ) : null}
        {formValues["additionalRequirements"] == "yes" ? (
          <CheckAnswerRow
            label="Additional requirements"
            value={formValues["additionalRequirementsDetails"]}
            changeValueCallback={() => setGoToPage(offSet3 + 3)}
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
              Agree that you need to use Ring & Ride because you find it either
              impossible or difficult to use other forms of public transport.
              You will inform Ring & Ride if there is any change in your
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
              Agree to the{" "}
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
};

export default CheckAnswers;
