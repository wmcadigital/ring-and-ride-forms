import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import getEmergencySectionName from "./getEmergencySectionName";
import Address from "../../common/Address/Address";

const EmergencyContactAddress = ({
  emergencyAddresses,
  setEmergencyAddresses,
}) => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const emergencyFirstName = formValues["emergencyFirstName"];

  let question = "";

  if (formValues["registerForYourself"] === "yes") {
    question = `What is ${emergencyFirstName}'s address?`;
  } else {
    if (formValues["emergencyContact"] === "yes") {
      question = `What is your address?`;
    } else {
      if (formValues["emergencyContactAnother"] === "yes") {
        question = `What is ${emergencyFirstName}'s address?`;
      }
    }
  }

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 2 of 3"
        sectionName={getEmergencySectionName(stateApi)}
      />
      <Question text={question} />
      <Address
        prefix="emergency"
        addresses={emergencyAddresses}
        setAddresses={setEmergencyAddresses}
      />
    </FormSection>
  );
};

EmergencyContactAddress.propTypes = {
  emergencyAddresses: PropTypes.arrayOf(PropTypes.object),
  setEmergencyAddresses: PropTypes.func,
};

export default EmergencyContactAddress;
