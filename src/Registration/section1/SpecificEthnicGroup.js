import { useFormState } from "react-final-form";

import Ethnicity, { PreferNotToSayLabel } from "./Ethnicity";
import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import { required } from "../../common/validation";
import getAboutSectionName from "./getAboutSectionName";

const SpecificEthnicGroup = () => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const ethnicity = formValues["ethnicity"];
  const ethnicityLabel =
    ethnicity === "other" ? null : Ethnicity[ethnicity].label;
  const specificEthnicity = Ethnicity[ethnicity].specific;
  const question =
    formValues["registerForYourself"] === "yes"
      ? `Which of the following best describes your ${ethnicityLabel} background?`
      : `Which of the following best describes ${formValues["firstName"]}'s ${
          ethnicityLabel ? `${ethnicityLabel} background` : "background"
        }?`;

  const error = stateApi.submitFailed
    ? stateApi.errors?.specificEthnicity
    : null;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <p>
        This information helps TfWM to monitor if users of the Ring and Ride
        service are reflective of regional diversity.
      </p>
      <RadioGroup error={error}>
        <FieldError text={error} />
        {Object.keys(specificEthnicity).map((ethnicity, index) => (
          <RadioButton
            key={index}
            label={specificEthnicity[ethnicity].label}
            validation={required}
            value={ethnicity}
            fieldName="specificEthnicity"
          />
        ))}
        <p className="wmrards-m-b-sm">Or</p>
        <RadioButton
          key="preferNotToSay"
          label={PreferNotToSayLabel["preferNotToSay"]}
          validation={required}
          value="preferNotToSay"
          fieldName="specificEthnicity"
        />
      </RadioGroup>
    </FormSection>
  );
};

export default SpecificEthnicGroup;
