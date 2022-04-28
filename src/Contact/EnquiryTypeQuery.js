import { useFormState } from "react-final-form";

import EnquiryTypes from "./EnquiryTypes";
import FormSection from "../common/FormSection";
import RadioGroup from "../common/RadioGroup";
import Question from "../common/Question";
import RadioButton from "../common/RadioButton";
import FieldError from "../common/FieldError";
import { required } from "../common/validation";

const EnquiryTypeQuery = () => {
  const stateApi = useFormState();

  const error = stateApi.submitFailed ? stateApi.errors?.enquiryType : null;

  return (
    <FormSection>
      <Question text="What is your enquiry about?" />
      <RadioGroup error={error}>
        <FieldError text={error} />
        {Object.keys(EnquiryTypes).map((enquiryType, index) => (
          <RadioButton
            key={index}
            label={EnquiryTypes[enquiryType].radioLabel}
            validation={required}
            value={enquiryType}
            fieldName="enquiryType"
          />
        ))}
      </RadioGroup>
    </FormSection>
  );
};

export default EnquiryTypeQuery;
