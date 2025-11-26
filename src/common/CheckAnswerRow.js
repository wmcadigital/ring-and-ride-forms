import PropTypes from "prop-types";

import ButtonLink from "./ButtonLink";

const ChangeButton = ({ callBack, disableButton }) => (
  <td className="wmnds-text-align-right" style={{ verticalAlign: "top" }}>
    <ButtonLink callback={callBack} disabled={disableButton}>
      Change
    </ButtonLink>
  </td>
);

ChangeButton.propTypes = {
  callBack: PropTypes.func,
  disableButton: PropTypes.bool,
};

const CheckAnswerRow = ({
  label,
  value,
  changeValueCallback,
  disableButton,
}) => {
  if (label) {
    return (
      <tr>
        <th scope="row" data-header="Header 1" style={{ verticalAlign: "top" }}>
          {label}
        </th>
        <td data-header="Header 2">{value}</td>
        <ChangeButton
          callBack={changeValueCallback}
          disableButton={disableButton}
        />
      </tr>
    );
  }

  return (
    <tr>
      <td data-header="Header 1" colSpan={7}>
        {value}
      </td>
      <ChangeButton
        callBack={changeValueCallback}
        disableButton={disableButton}
      />
    </tr>
  );
};

CheckAnswerRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  changeValueCallback: PropTypes.func,
  disableButton: PropTypes.bool,
};

CheckAnswerRow.defaultProps = {
  changeValueCallback: () => {},
};

export default CheckAnswerRow;
