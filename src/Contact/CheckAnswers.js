import { useEffect } from "react";
import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import EnquiryTypes from "./EnquiryTypes";
import Question from "../common/Question";
import Checkbox from "../common/Checkbox";
import FieldError from "../common/FieldError";
import Table from "../common/Table";
import CheckAnswerRow from "../common/CheckAnswerRow";
import CheckboxContainer from "../common/CheckboxContainer";
import ErrorPanel from "../common/ErrorPanel";

const CheckAnswers = ({ setGoToPage, setFormSubmitting, formSubmitError }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const enquiryLabel = EnquiryTypes[formValues.enquiryType]?.detailLabel;

  const agreeLegalError = stateApi.submitFailed ? stateApi.errors?.legal : null;

  const submitting = stateApi.submitting;

  useEffect(() => {
    setFormSubmitting(submitting);
  }, [setFormSubmitting, submitting]);

  return (
    <>
      <Question text="Check your answers" />
      {formSubmitError ? <ErrorPanel message={formSubmitError} /> : null}
      <h3>About your {enquiryLabel} enquiry</h3>
      <Table>
        <CheckAnswerRow
          value={formValues["enquiryDetail"]}
          changeValueCallback={() => setGoToPage(1)}
          disableButton={submitting}
        />
      </Table>
      <h3>About you</h3>
      <Table>
        <CheckAnswerRow
          label="Name"
          value={`${formValues["firstName"]} ${formValues["lastName"]}`}
          changeValueCallback={() => setGoToPage(2)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Registration number"
          value={
            formValues["registrationNo"]
              ? formValues["registrationNo"]
              : "Not provided"
          }
          changeValueCallback={() => setGoToPage(3)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="Email"
          value={`${formValues["emailAddress"]}`}
          changeValueCallback={() => setGoToPage(4)}
          disableButton={submitting}
        />
        <CheckAnswerRow
          label="How would you like to be contacted?"
          value={`Email: ${formValues["emailAddress"]}
        ${formValues["phoneContact"] ? `Phone: ${formValues["phoneNo"]}` : ""}`}
          changeValueCallback={() => setGoToPage(5)}
          disableButton={submitting}
        />
      </Table>
      <h3>Now send your enquiry</h3>
      <p>
        By submitting this enquiry you are confirming that, to the best of your
        knowledge, the details you are providing are correct.
      </p>
      <CheckboxContainer error={agreeLegalError}>
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
