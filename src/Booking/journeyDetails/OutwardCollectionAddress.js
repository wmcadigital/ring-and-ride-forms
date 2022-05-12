import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutJourneySectionName from "./getAboutJourneySectionName";

import { required } from "../../common/validation";

const OutwardCollectionAddress = ({
  setOutwardCollectionAddress,
  setGoToPage,
}) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  const error = stateApi.submitFailed
    ? stateApi.errors?.outwardCollectionAddress
    : null;

  const question =
    bookingParty === "mySelf"
      ? "Where are you being collected from?"
      : `Where is ${formValues["firstName"]} being collected from?`;

  const labelOne =
    bookingParty === "mySelf"
      ? "My registered home address"
      : "Their registered home address";

  useEffect(() => {
    if (formValues.outwardCollectionAddress) {
      setOutwardCollectionAddress(formValues.outwardCollectionAddress);
    }
    if (formValues.outwardCollectionAddress === "other") {
      setGoToPage(null);
    }
  }, [formValues.outwardCollectionAddress]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("2", stateApi)}
        sectionName={getAboutJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label={labelOne}
          validation={required}
          value="registered"
          fieldName="outwardCollectionAddress"
        />
        <RadioButton
          key={2}
          label="Another address"
          validation={required}
          value="other"
          fieldName="outwardCollectionAddress"
        />
      </RadioGroup>
    </FormSection>
  );
};

OutwardCollectionAddress.propTypes = {
  setOutwardCollectionAddress: PropTypes.func,
  setGoToPage: PropTypes.func,
};

OutwardCollectionAddress.defaultProps = {
  setOutwardCollectionAddress: () => {},
  setGoToPage: () => {},
};

export default OutwardCollectionAddress;
