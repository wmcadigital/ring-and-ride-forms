import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import Address from "../../common/Address/Address";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutReturnJourneySectionName from "./getAboutReturnJourneySectionName";

const OtherReturnDestinationAddress = ({
  otherReturnDestinationAddresses,
  setOtherReturnDestinationAddresses,
}) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  let question = "";
  if (bookingParty === "mySelf") {
    question = "What address do you want to go to?";
  } else if (bookingParty === "behalfSomeone") {
    question = `What address does ${formValues["firstName"]} want to go to?`;
  } else if (bookingParty === "behalfGroup") {
    question = "What address is the group going to?";
  }

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <Address
        prefix="otherReturnDestination"
        checkInside={true}
        addresses={otherReturnDestinationAddresses}
        setAddresses={setOtherReturnDestinationAddresses}
      />
    </FormSection>
  );
};

OtherReturnDestinationAddress.propTypes = {
  otherReturnDestinationAddresses: PropTypes.arrayOf(PropTypes.object),
  setOtherReturnDestinationAddresses: PropTypes.func,
};

export default OtherReturnDestinationAddress;
