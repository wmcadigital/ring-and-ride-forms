import { Field } from "react-final-form";
import PropTypes from "prop-types";

import FieldError from "./FieldError";

const TextInput = ({ fieldName, label, validation, error }) => (
  <div className={`wmrards-fe-group ${error && "wmrards-fe-group--error"}`}>
    <label className="wmrards-fe-label" htmlFor={fieldName}>
      {label}
    </label>
    <FieldError text={error} />
    <Field
      name={fieldName}
      validate={validation}
      component="input"
      type="text"
      className="wmrards-fe-input"
    />
  </div>
);

TextInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  validation: PropTypes.func,
  error: PropTypes.string,
};

export default TextInput;
