import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import CheckboxContainer from "../../common/CheckboxContainer";
import Checkbox from "../../common/Checkbox";
import TextInput from "../../common/TextInput";
import FieldError from "../../common/FieldError";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutSectionName from "./getAboutSectionName";

const ContactPreferenceEntry = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const question =
    formValues["bookingParty"] === "behalfSomeone"
      ? `How would ${formValues["firstName"]} like to be contacted?`
      : "How would you like to be contacted?";

  const posssesiveDeterminer =
    formValues["bookingParty"] === "behalfSomeone" ? "their" : "your";

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
        sectionPosition={getSectionPositionInfo("1", stateApi)}
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <CheckboxContainer
        error={errorContactPrefReqd}
        description={`We'll use this to get in touch about ${posssesiveDeterminer} booking.`}
      >
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

export default ContactPreferenceEntry;
