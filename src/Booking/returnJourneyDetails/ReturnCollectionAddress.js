import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import FormSection from "../../common/FormSection";
import RadioGroup from "../../common/RadioGroup";
import Question from "../../common/Question";
import RadioButton from "../../common/RadioButton";
import FieldError from "../../common/FieldError";
import ProgressIndicator from "../../common/ProgressIndicator";
import ContactDetails from "../../common/ContactDetails";
import AddressFormatted from "../../common/AddressFormatted";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutReturnJourneySectionName from "./getAboutReturnJourneySectionName";

import { required } from "../../common/validation";

const ReturnCollectionAddress = ({
  setReturnCollectionAddress,
  setGoToPage,
}) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  const error = stateApi.submitFailed
    ? stateApi.errors?.returnCollectionAddress
    : null;

  let question = "";
  if (bookingParty === "mySelf") {
    question = "Where do you want to be collected from?";
  } else if (bookingParty === "behalfSomeone") {
    question = `Where does ${formValues["firstName"]} want to be collected from?`;
  } else if (bookingParty === "behalfGroup") {
    question = "What address do you want the group to be collected from?";
  }

  const firstRadioLabel =
    bookingParty === "mySelf"
      ? "The address I was brought to"
      : "The address they were brought to";

  useEffect(() => {
    if (formValues.returnCollectionAddress) {
      setReturnCollectionAddress(formValues.returnCollectionAddress);
    }
    if (formValues.returnCollectionAddress === "other") {
      setGoToPage(null);
    }
  }, [formValues.returnCollectionAddress]);

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <RadioGroup error={error}>
        <FieldError text={error} />
        <RadioButton
          key={1}
          label={firstRadioLabel}
          validation={required}
          value="sameAsOutwardDestinationAddress"
          fieldName="returnCollectionAddress"
        />
        {formValues.returnCollectionAddress ===
        "sameAsOutwardDestinationAddress" ? (
          <div className="wmrards-m-l-xl wmrards-p-l-sm wmrards-m-b-lg">
            <ContactDetails>
              <AddressFormatted addressObj={formValues["outwardDestination"]} />
            </ContactDetails>
          </div>
        ) : null}
        <RadioButton
          key={2}
          label="Another address"
          validation={required}
          value="other"
          fieldName="returnCollectionAddress"
        />
      </RadioGroup>
    </FormSection>
  );
};

ReturnCollectionAddress.propTypes = {
  setReturnCollectionAddress: PropTypes.func,
  setGoToPage: PropTypes.func,
};

ReturnCollectionAddress.defaultProps = {
  setReturnCollectionAddress: () => {},
  setGoToPage: () => {},
};

export default ReturnCollectionAddress;
