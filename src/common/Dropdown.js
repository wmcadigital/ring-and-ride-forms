import PropTypes from "prop-types";
import { Field } from "react-final-form";

import FieldError from "./FieldError";

const Dropdown = ({
  fieldName,
  label,
  prompt,
  options,
  validation,
  error,
  customClass,
}) => {
  return (
    <div
      className={`wmnds-fe-group ${
        error ? "wmnds-fe-group--error" : null
      } ${customClass ? customClass : null}`}
    >
      <div className="wmnds-fe-dropdown">
        <FieldError text={error} />
        {label ? (
          <label className="wmnds-fe-label" htmlFor="dropdown">
            {label}
          </label>
        ) : null}
        <Field name={fieldName} validate={validation}>
          {({ input }) => (
            <select
              {...input}
              className="wmnds-fe-dropdown__select "
              id="dropdown"
            >
              {prompt ? <option value="">{prompt}</option> : null}
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string,
  prompt: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    })
  ),
  validation: PropTypes.func,
  error: PropTypes.string,
  customClass: PropTypes.string,
};

Dropdown.defaultProps = {
  prompt: "",
  options: [],
};

export default Dropdown;
