import { useFormState } from "react-final-form";

import EnquiryTypes from "./EnquiryTypes";
import { required } from "./validation";
import ProgressIndicator from "../common/ProgressIndicator";
import Question from "../common/Question";
import TextArea from "../common/TextArea";
import FieldError from "../common/FieldError";

const EnquiryDetail = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const enquiryLabel = EnquiryTypes[formValues.enquiryType]?.detailLabel;

  const error = stateApi.submitFailed ? stateApi.errors?.enquiryDetail : null;

  return (
    <div className="wmrards-fe-group wmrards-m-t-20">
      <ProgressIndicator
        sectionPosition="Section 1 of 2"
        sectionName="About your enquiry"
      />
      <div className={`wmrards-m-t-xl ${error && "wmrards-fe-group--error"}`}>
        <Question text={`What is your ${enquiryLabel} enquiry about?`} />
        <FieldError text={error} />
        <TextArea fieldName="enquiryDetail" validation={required} />
      </div>
    </div>
  );
};

export default EnquiryDetail;
