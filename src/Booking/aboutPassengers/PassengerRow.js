import PropTypes from "prop-types";

import ButtonLink from "../../common/ButtonLink";
import DeleteButton from "../../common/DeleteButton";

const PassengerRow = ({
  fullName,
  registrationNo,
  changeCallBack,
  removeCallBack,
}) => (
  <tr>
    <td>{fullName}</td>
    <td>{registrationNo}</td>
    <td colSpan={2}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonLink callback={changeCallBack}>Change</ButtonLink>
        <DeleteButton callback={removeCallBack}>Remove Passenger</DeleteButton>
      </div>
    </td>
  </tr>
);

PassengerRow.propTypes = {
  fullName: PropTypes.string,
  registrationNo: PropTypes.string,
  changeCallBack: PropTypes.func,
  removeCallBack: PropTypes.func,
};

PassengerRow.defaultProps = {
  changeCallBack: () => {},
  removeCallBack: () => {},
};

export default PassengerRow;
