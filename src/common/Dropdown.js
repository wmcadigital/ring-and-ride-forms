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
      className={`wmrards-fe-group ${
        error ? "wmrards-fe-group--error" : null
      } ${customClass ? customClass : null}`}
    >
      <div className="wmrards-fe-dropdown">
        <FieldError text={error} />
        {label ? (
          <label className="wmrards-fe-label" htmlFor="dropdown">
            {label}
          </label>
        ) : null}
        <Field name={fieldName} validate={validation}>
          {({ input }) => (
            <select
              {...input}
              className="wmrards-fe-dropdown__select "
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
