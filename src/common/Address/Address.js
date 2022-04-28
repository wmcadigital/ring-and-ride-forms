import { useState, useEffect } from "react";
import { useFormState } from "react-final-form";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import PostCodeSearch from "./PostCodeSearch";
import AddressList from "./AddressList";
import AddressDetails from "./AddressDetails";
import fetchAddresses from "./api/fetchAddresses";
import checkInsideWmca from "./checkInsideWmca";

const Address = ({ prefix, checkInside, orderNo, addresses, setAddresses }) => {
  const [loading, setLoading] = useState(false);
  const formState = useFormState();

  const errorSearchPostcode = formState.submitFailed
    ? formState.errors[prefix]?.searchPostCode
    : null;
  const [errorPostCode, setErrorPostCode] = useState(errorSearchPostcode);

  useEffect(() => setErrorPostCode(errorSearchPostcode), [errorSearchPostcode]);

  const navigate = useNavigate();

  const addressSelectedOrManual = formState.values[prefix]?.addressId;
  const searchPostCode = formState.values[prefix]?.searchPostCode;

  const getAddresses = async (postCode) => {
    setLoading(true);
    const addresses = await fetchAddresses(postCode);
    if (addresses.length === 0) {
      setErrorPostCode("Invalid");
    } else {
      setErrorPostCode("");
    }
    if (addresses.length && checkInside) {
      if (!checkInsideWmca(addresses)) {
        navigate("/registration/outsideWmca", {
          state: { formValues: formState.values, orderNo },
          replace: true,
        });
        return;
      }
    }
    if (addresses.length) {
      setAddresses(addresses);
    }
    setLoading(false);
  };

  return (
    <>
      {!addresses.length && (
        <PostCodeSearch
          error={errorPostCode}
          getAddresses={getAddresses}
          loading={loading}
          prefix={prefix}
        />
      )}
      {addresses.length && !addressSelectedOrManual ? (
        <AddressList
          prefix={prefix}
          searchPostCode={searchPostCode}
          addresses={addresses}
          changePostCodeCallback={() => setAddresses([])}
        />
      ) : null}
      {addressSelectedOrManual ? (
        <AddressDetails prefix={prefix} addresses={addresses} />
      ) : null}
    </>
  );
};

Address.propTypes = {
  prefix: PropTypes.string.isRequired,
  checkInside: PropTypes.bool,
  orderNo: PropTypes.number,
  addresses: PropTypes.arrayOf(PropTypes.object),
  setAddresses: PropTypes.func,
};

Address.defaultProps = {
  checkInside: false,
  addresses: [],
};

export default Address;
