import { useFormState } from "react-final-form";

import ProgressIndicator from "../common/ProgressIndicator";
import Question from "../common/Question";
import Checkbox from "../common/Checkbox";
import TextInput from "../common/TextInput";
import FieldError from "../common/FieldError";

const ContactPreferenceEntry = () => {
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
    <div className="wmrards-fe-group wmrards-m-t-20">
      <ProgressIndicator
        sectionPosition="Section 2 of 2"
        sectionName="About you"
      />
      <Question text="How would you like to be contacted?" />
      <div className="wmrards-fe-group">
        <div
          className={`wmrards-fe-checkboxes ${
            errorContactPrefReqd && "wmrards-fe-group--error"
          }`}
        >
          <div className="wmrards-fe-checkboxes__desc">
            We&apos;ll use this to get in touch about your enquiry.
          </div>
          <FieldError text={errorContactPrefReqd} />
          <Checkbox fieldName="emailContact" label="Email" />
          {formValues.emailContact ? (
            <div className="wmrards-m-l-xl wmrards-p-l-sm">
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
            <div className="wmrards-m-l-xl wmrards-p-l-sm">
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
        </div>
      </div>
    </div>
  );
};

export default ContactPreferenceEntry;
