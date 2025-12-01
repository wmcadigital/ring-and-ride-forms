import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../common/FormSection";
import ProgressIndicator from "../common/ProgressIndicator";
import Question from "../common/Question";
import CheckboxContainer from "../common/CheckboxContainer";
import Checkbox from "../common/Checkbox";
import TextInput from "../common/TextInput";
import FieldError from "../common/FieldError";

const ContactPreferenceEntry = ({ description }) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const errorContactPrefReqd = stateApi.submitFailed
    ? stateApi.errors?.contactPreference
    : null;

  const errorEmailAddress = stateApi.submitFailed
    ? stateApi.errors?.emailAddress
    : null;

  const errorPhoneNo = stateApi.submitFailed ? stateApi.errors?.phoneNo : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 2"
        sectionName="About you"
      />
      <Question text="How would you like to be contacted?" />
      <CheckboxContainer error={errorContactPrefReqd} description={description}>
        <FieldError text={errorContactPrefReqd} />
        <Checkbox fieldName="emailContact" label="Email" />
        {formValues.emailContact ? (
          <div className="wmnds-m-l-xl wmnds-p-l-sm">
            <TextInput
              fieldName="emailAddress"
              label={
                <>
                  Email address
                  <p>For example, name@example.com</p>
                </>
              }
              error={errorEmailAddress}
            />
          </div>
        ) : null}
        <Checkbox fieldName="phoneContact" label="Phone" />
        {formValues.phoneContact ? (
          <div className="wmnds-m-l-xl wmnds-p-l-sm">
            <TextInput
              fieldName="phoneNo"
              label={
                <>
                  Phone number
                  <p>For example, 07700900457</p>
                </>
              }
              error={errorPhoneNo}
            />
          </div>
        ) : null}
      </CheckboxContainer>
    </FormSection>
  );
};

ContactPreferenceEntry.propTypes = {
  description: PropTypes.string,
};

export default ContactPreferenceEntry;
