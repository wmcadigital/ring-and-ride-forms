import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import EnquiryTypes from "./EnquiryTypes";
import Question from "../common/Question";
import Checkbox from "../common/Checkbox";
import FieldError from "../common/FieldError";
import Table from "../common/Table";
import CheckAnswerRow from "../common/CheckAnswerRow";
import CheckboxContainer from "../common/CheckboxContainer";

const CheckAnswers = ({ setGoToPage }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const enquiryLabel = EnquiryTypes[formValues.enquiryType]?.detailLabel;

  const agreeLegalError = stateApi.submitFailed ? stateApi.errors?.legal : null;

  return (
    <>
      <Question text="Check your answers" />
      <h3>About your {enquiryLabel} enquiry</h3>
      <Table>
        <CheckAnswerRow
          value={formValues["enquiryDetail"]}
          changeValueCallback={() => setGoToPage(1)}
        />
      </Table>
      <Table>
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
