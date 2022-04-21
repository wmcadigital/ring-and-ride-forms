import { useFormState } from "react-final-form";

import TextInput from "../common/TextInput";
import ProgressIndicator from "../common/ProgressIndicator";
import Question from "../common/Question";
import { numbersOnly } from "./validation";

const RegistrationNoEntry = () => {
  const stateApi = useFormState();

  const error = stateApi.submitFailed ? stateApi.errors?.registrationNo : null;

  return (
    <div className="wmrards-fe-group wmrards-m-t-20">
      <ProgressIndicator
        sectionPosition="Section 2 of 2"
        sectionName="About you"
      />
      <Question text="Do you have a Ring and Ride registration number?" />
      <TextInput
        fieldName="registrationNo"
        label={
          <>
            {" "}
            Registration number
            <p>For example, 1234567890</p>
          </>
        }
        validation={numbersOnly}
        error={error}
      />
    </div>
  );
};

export default RegistrationNoEntry;
