import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import Address from "../../common/Address/Address";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutJourneySectionName from "./getAboutJourneySectionName";

const OutwardDestinationAddress = ({
  outwardDestinationAddresses,
  setOutwardDestinationAddresses,
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
        sectionPosition={getSectionPositionInfo("2", stateApi)}
        sectionName={getAboutJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <Address
        prefix="outwardDestination"
        checkInside={true}
        addresses={outwardDestinationAddresses}
        setAddresses={setOutwardDestinationAddresses}
      />
    </FormSection>
  );
};

OutwardDestinationAddress.propTypes = {
  outwardDestinationAddresses: PropTypes.arrayOf(PropTypes.object),
  setOutwardDestinationAddresses: PropTypes.func,
};

export default OutwardDestinationAddress;
