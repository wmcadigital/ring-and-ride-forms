import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import EnquiryTypes from "./EnquiryTypes";
import Checkbox from "../common/Checkbox";
import FieldError from "../common/FieldError";
import CheckAnswerRow from "../common/CheckAnswerRow";

const CheckAnswers = ({ setGoToPage }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const enquiryLabel = EnquiryTypes[formValues.enquiryType]?.detailLabel;

  const agreeLegalError = stateApi.submitFailed ? stateApi.errors?.legal : null;

  return (
    <>
      <h2 className="wmrards-fe-question">Check your answers</h2>
      <h3>About your {enquiryLabel} enquiry</h3>
      <table className="wmrards-table wmrards-m-b-xl wmrards-table--without-header">
        <CheckAnswerRow
          value={formValues["enquiryDetail"]}
          changeValueCallback={() => setGoToPage(1)}
        />
      </table>
      <table className="wmrards-table wmrards-m-b-xl wmrards-table--without-header">
        <h3>About you</h3>
        <CheckAnswerRow
          label="Name"
          value={`${formValues["firstName"]} ${formValues["lastName"]}`}
          changeValueCallback={() => setGoToPage(2)}
        />
        <CheckAnswerRow
          label="Registration number"
          value={
            formValues["registrationNo"] ? formValues["registrationNo"] : ""
          }
          changeValueCallback={() => setGoToPage(3)}
        />
        <CheckAnswerRow
          label="How would you like to be contacted?"
          value={`${
            formValues["emailContact"]
              ? `Email: ${formValues["emailAddress"]} `
              : ""
          }
        ${formValues["phoneContact"] ? `Phone: ${formValues["phoneNo"]}` : ""}`}
          changeValueCallback={() => setGoToPage(4)}
        />
      </table>
      <h3>Now send your enquiry</h3>
      <p>
        By submitting this enquiry you are confirming that, to the best of your
        knowledge, the details you are providing are correct.
      </p>
      <div
        className={`wmrards-fe-group ${
          agreeLegalError && "wmrards-fe-group--error"
        }`}
      >
        <div className="wmrards-fe-checkboxes">
          <FieldError text={agreeLegalError} />
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
        </div>
      </div>
    </>
  );
};

CheckAnswers.propTypes = {
  setGoToPage: PropTypes.func,
};

export default CheckAnswers;
