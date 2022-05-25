import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import Address from "../../common/Address/Address";
import getSectionPositionInfo from "../getSectionPosition";
import getAboutReturnJourneySectionName from "./getAboutReturnJourneySectionName";

const OtherReturnCollectionAddress = ({
  otherReturnCollectionAddresses,
  setOtherReturnCollectionAddresses,
}) => {
  const stateApi = useFormState();
  const formValues = stateApi.values;
  const bookingParty = formValues["bookingParty"];

  let question = "";
  if (bookingParty === "mySelf") {
    question = "What address do you want to be collected from?";
  } else if (bookingParty === "behalfSomeone") {
    question = `What address does ${formValues["firstName"]} want to be collected from?`;
  } else if (bookingParty === "behalfGroup") {
    question = "What address do you want the group to be collected from?";
  }

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition={getSectionPositionInfo("3", stateApi)}
        sectionName={getAboutReturnJourneySectionName(stateApi)}
      />
      <Question text={question} />
      <Address
        prefix="otherReturn"
        checkInside={true}
        addresses={otherReturnCollectionAddresses}
        setAddresses={setOtherReturnCollectionAddresses}
      />
    </FormSection>
  );
};

OtherReturnCollectionAddress.propTypes = {
  otherReturnCollectionAddresses: PropTypes.arrayOf(PropTypes.object),
  setOtherReturnCollectionAddresses: PropTypes.func,
};

export default OtherReturnCollectionAddress;
