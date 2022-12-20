import PropTypes from "prop-types";
import { useFormState } from "react-final-form";
import { useNavigate } from "react-router-dom";

import FormSection from "../../common/FormSection";
import TextInput from "../../common/TextInput";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import ButtonLink from "../../common/ButtonLink";
import {
  composeValidators,
  required,
  registrationNumber,
  registrationNumberLength,
} from "../../common/validation";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutSectionName from "./getAboutSectionName";

const RegistrationNoEntry = ({ orderNo }) => {
  const stateApi = useFormState();

  const navigate = useNavigate();

  const formValues = stateApi.values;
  const question =
    formValues["bookingParty"] === "behalfSomeone"
      ? `What is ${formValues["firstName"]}'s registration number?`
      : "What is your registration number";

  const error = stateApi.submitFailed ? stateApi.errors?.registrationNo : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("1", stateApi)}
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <TextInput
        fieldName="registrationNo"
        label={
          <>
            {" "}
            Registration number
            <p>For example, 123456</p>
          </>
        }
        validation={composeValidators(
          required,
          registrationNumber,
          registrationNumberLength
        )}
        error={error}
      />
      <ButtonLink
        callback={() =>
          navigate("/booking/forgotRegistration", {
            state: { formValues, orderNo },
            replace: true,
          })
        }
      >
        I don&apos;t remember my registration number
      </ButtonLink>
    </FormSection>
  );
};

RegistrationNoEntry.propTypes = {
  orderNo: PropTypes.number,
};

export default RegistrationNoEntry;
