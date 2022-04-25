import PropTypes from "prop-types";

const ChangeButton = ({ callBack }) => (
  <td className="wmrards-text-align-right">
    <button
      type="button"
      className="wmrards-btn wmrards-btn--link"
      onClick={callBack}
    >
      Change
    </button>
  </td>
);

ChangeButton.propTypes = {
  callBack: PropTypes.func,
};

const CheckAnswerRow = ({ label, value, changeValueCallback }) => {
  if (label) {
    return (
      <tr>
        <th scope="row" data-header="Header 1">
          {label}
        </th>
        <td data-header="Header 2">{value}</td>
        <ChangeButton callBack={changeValueCallback} />
      </tr>
    );
  }

  return (
    <tr>
      <td data-header="Header 1" colSpan={7}>
        {value}
      </td>
      <ChangeButton callBack={changeValueCallback} />
    </tr>
  );
};

CheckAnswerRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  changeValueCallback: PropTypes.func,
};

CheckAnswerRow.defaultProps = {
  changeValueCallback: () => {},
};

export default CheckAnswerRow;
