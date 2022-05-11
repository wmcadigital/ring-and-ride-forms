import PropTypes from "prop-types";
import { useFormState } from "react-final-form";

import TextInput from "../TextInput";
import { required, postCode, composeValidators } from "../validation";

const validatePostCode = composeValidators(required, postCode);

const AddressDetails = ({ prefix, addresses }) => {
  const formState = useFormState();
  const addressId = formState.values[prefix]?.addressId;

  let initialPostCode = "";
  let matchingAddress = {};

  if (addressId === "manual") {
    initialPostCode = formState.values[prefix]?.searchPostCode;
  } else {
    matchingAddress =
      addresses.find((address) => address.guid === addressId) ?? {};
    initialPostCode = matchingAddress.postcode;
  }

  const addressLine1Error = formState.submitFailed
    ? formState.errors[prefix]?.addressLine1
    : null;
  const townOrCityError = formState.submitFailed
    ? formState.errors[prefix]?.townOrCity
    : null;
  const countyError = formState.submitFailed
    ? formState.errors[prefix]?.county
    : null;
  const postCodeError = formState.submitFailed
    ? formState.errors[prefix]?.postCode
    : null;

  return (
    <>
      <TextInput
        fieldName={`${prefix}.addressLine1`}
        label="Building and street"
        containerClass="wmrards-m-b-md"
        defaultValue={matchingAddress["line_1"]}
        validation={required}
        error={addressLine1Error}
      />
      <TextInput
        fieldName={`${prefix}.addressLine2`}
        defaultValue={matchingAddress["line_2"]}
      />
      <TextInput
        fieldName={`${prefix}.townOrCity`}
        label="Town or city"
        defaultValue={matchingAddress["post_town"]}
        validation={required}
        error={townOrCityError}
      />
      <TextInput
        fieldName={`${prefix}.county`}
        label="County"
        defaultValue={matchingAddress["county"]}
        validation={required}
        error={countyError}
      />
      <TextInput
        fieldName={`${prefix}.postCode`}
        label="Postcode"
        defaultValue={initialPostCode}
        validation={validatePostCode}
        error={postCodeError}
      />
    </>
  );
};

AddressDetails.propTypes = {
  prefix: PropTypes.string.isRequired,
  addresses: PropTypes.arrayOf(PropTypes.object),
};

AddressDetails.defaultProps = {
  addresses: [],
};

export default AddressDetails;
