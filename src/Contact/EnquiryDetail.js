import { useFormState } from "react-final-form";

import EnquiryTypes from "./EnquiryTypes";
import { required } from "../common/validation";
import FormSection from "../common/FormSection";
import TextAreaContainer from "../common/TextAreaContainer";
import ProgressIndicator from "../common/ProgressIndicator";
import Question from "../common/Question";
import TextArea from "../common/TextArea";

const EnquiryDetail = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const enquiryLabel = EnquiryTypes[formValues.enquiryType]?.detailLabel;

  const error = stateApi.submitFailed ? stateApi.errors?.enquiryDetail : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 2"
        sectionName="About your enquiry"
      />
      <TextAreaContainer>
        <Question text={`What is your ${enquiryLabel} enquiry about?`} />
        <TextArea
          fieldName="enquiryDetail"
          validation={required}
          error={error}
        />
      </TextAreaContainer>
    </FormSection>
  );
};

export default EnquiryDetail;
