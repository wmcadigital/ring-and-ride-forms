import PropTypes from "prop-types";

import Dropdown from "./Dropdown";
import FieldError from "./FieldError";
import { required } from "../common/validation";

const hours = [
  "",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
];
const minutes = ["", "00", "15", "30", "45"];

const TimeInput = ({ label, prefix, error }) => {
  return (
    <div
      className={`wmnds-fe-group ${error ? "wmnds-fe-group--error" : null}`}
    >
      <FieldError text={error} />
      {label ? <label className="wmnds-fe-label">{label}</label> : null}
      <div style={{ display: "flex" }}>
        <Dropdown
          fieldName={`${prefix}.hour`}
          validation={required}
          options={hours.map((hour) => ({
            value: hour,
            label: <>&nbsp;{hour}&nbsp;</>,
          }))}
          customClass="wmnds-m-r-md"
        />
        <Dropdown
          fieldName={`${prefix}.minute`}
          validation={required}
          options={minutes.map((minute) => ({
            value: minute,
            label: <>&nbsp;{minute}&nbsp;</>,
          }))}
        />
      </div>
    </div>
  );
};

TimeInput.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default TimeInput;
