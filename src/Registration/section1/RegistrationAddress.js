import { useFormState } from "react-final-form";
import PropTypes from "prop-types";

import FormSection from "../../common/FormSection";
import ProgressIndicator from "../../common/ProgressIndicator";
import Question from "../../common/Question";
import getAboutSectionName from "./getAboutSectionName";
import Address from "../../common/Address/Address";

const RegistrationAddress = ({
  orderNo,
  registrationAddresses,
  setRegistrationAddresses,
}) => {
  const stateApi = useFormState();

  const formValues = stateApi.values;
  const question =
    formValues["registerForYourself"] === "yes"
      ? "What is your address?"
      : `What is ${formValues["firstName"]}'s address?`;

  return (
    <FormSection>
      <ProgressIndicator
        sectionPosition="Section 1 of 3"
        sectionName={getAboutSectionName(stateApi)}
      />
      <Question text={question} />
      <Address
        prefix="registered"
        checkInside={true}
        orderNo={orderNo}
        addresses={registrationAddresses}
        setAddresses={setRegistrationAddresses}
      />
    </FormSection>
  );
};

RegistrationAddress.propTypes = {
  orderNo: PropTypes.number,
  registrationAddresses: PropTypes.arrayOf(PropTypes.object),
  setRegistrationAddresses: PropTypes.func,
};

export default RegistrationAddress;
