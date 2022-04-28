import PropTypes from "prop-types";

const AddressFormatted = ({ addressObj }) => {
  const { addressLine1, addressLine2, townOrCity, county, postCode } =
    addressObj;
  return (
    <>
      <div>{addressLine1}</div>
      {addressLine2 ? <div>{addressLine2}</div> : undefined}
      <div>{townOrCity}</div>
      <div>{county}</div>
      <div>{postCode}</div>
    </>
  );
};

AddressFormatted.propTypes = {
  addressObj: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    townOrCity: PropTypes.string,
    county: PropTypes.string,
    postCode: PropTypes.string,
  }),
};

export default AddressFormatted;
