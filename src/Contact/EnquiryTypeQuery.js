import { useFormState } from "react-final-form";

import EnquiryTypes from "./EnquiryTypes";
import Question from "../common/Question";
import RadioButton from "../common/RadioButton";
import FieldError from "../common/FieldError";
import { required } from "./validation";

const EnquiryTypeQuery = () => {
  const stateApi = useFormState();
  const formValues = stateApi.values;

  const error = stateApi.submitFailed ? stateApi.errors?.enquiryType : null;

  return (
    <div className={`wmrards-fe-group ${error && "wmrards-fe-group--error"}`}>
      <div className="wmrards-fe-radios" role="radiogroup">
        <Question text="What is your enquiry about?" />
        <FieldError text={error} />
        {Object.keys(EnquiryTypes).map((enquiryType, index) => (
          <RadioButton
            key={index}
            label={EnquiryTypes[enquiryType].radioLabel}
            validation={required}
            formValues={formValues}
            value={enquiryType}
            fieldName="enquiryType"
          />
        ))}
      </div>
    </div>
  );
};

export default EnquiryTypeQuery;
