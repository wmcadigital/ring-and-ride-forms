import { Field } from "react-final-form";
import PropTypes from "prop-types";

const Checkbox = ({ fieldName, label }) => {
  return (
    <label className="wmrards-fe-checkboxes__container">
      {label}
      <Field
        className="wmrards-fe-checkboxes__input"
        name={fieldName}
        component="input"
        type="checkbox"
      />
      <span className="wmrards-fe-checkboxes__checkmark">
        <svg className="wmrards-fe-checkboxes__icon">
          <use
            xlinkHref="#wmrards-general-checkmark"
            href="#wmrards-general-checkmark"
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
