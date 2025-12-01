import PropTypes from "prop-types";
import { useForm, useFormState } from "react-final-form";

import ButtonLink from "../ButtonLink";
import Dropdown from "../Dropdown";
import { required } from "../validation";

const AddressList = ({
  prefix,
  searchPostCode,
  changePostCodeCallback,
  addresses,
}) => {
  const addressOptions = addresses.map(({ guid, summary_line }) => ({
    value: guid,
    label: summary_line,
  }));
  const prompt = `${addresses.length} addresses found`;
  const formApi = useForm();
  const addressField = `${prefix}.addressId`;

  const formState = useFormState();

  const errorAddress =
    formState.submitFailed && addresses.length
      ? formState.errors[prefix]?.addressId
      : null;

  return (
    <div className="wmnds-fe-group">
      <label className="wmnds-fe-label" htmlFor="searchPostCode">
        Postcode
      </label>
      <div className="wmnds-m-b-lg">
        {searchPostCode}
        <span className="wmnds-m-l-lg">
          <ButtonLink callback={changePostCodeCallback}>Change</ButtonLink>
        </span>
      </div>
      <Dropdown
        fieldName={addressField}
        error={errorAddress}
        label="Select an address"
        prompt={prompt}
        options={addressOptions}
        validation={required}
      />
      <ButtonLink
        callback={() =>
          formApi.mutators.setFormAttribute(addressField, "manual")
        }
      >
        I can&apos;t find my address in the list
      </ButtonLink>
    </div>
  );
};

AddressList.propTypes = {
  prefix: PropTypes.string.isRequired,
  searchPostCode: PropTypes.string,
  changePostCodeCallback: PropTypes.func,
  addresses: PropTypes.arrayOf(PropTypes.object),
};

AddressList.defaultProps = {
  addresses: [],
};

export default AddressList;
