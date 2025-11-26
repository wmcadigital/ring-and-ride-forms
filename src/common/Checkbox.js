import { Field } from "react-final-form";
import PropTypes from "prop-types";

const Checkbox = ({ fieldName, label }) => {
  return (
    <label className="wmnds-fe-checkboxes__container">
      {label}
      <Field
        className="wmnds-fe-checkboxes__input"
        name={fieldName}
        component="input"
        type="checkbox"
      />
      <span className="wmnds-fe-checkboxes__checkmark">
        <svg className="wmnds-fe-checkboxes__icon">
          <use
            xlinkHref="#wmnds-general-checkmark"
            href="#wmnds-general-checkmark"
          ></use>
        </svg>
      </span>
    </label>
  );
};

Checkbox.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export default Checkbox;
