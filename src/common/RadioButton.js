import { Field } from "react-final-form";
import PropTypes from "prop-types";

const RadioButton = ({
  label,
  value,
  validation,
  fieldName,
  onClickCallback,
}) => (
  <label className="wmrards-fe-radios__container">
    {label}
    <Field name={fieldName} validate={validation} value={value} type="radio">
      {({ input }) => (
        <input
          {...input}
          className="wmrards-fe-radios__input"
          onClick={onClickCallback}
        />
      )}
    </Field>
    <span className="wmrards-fe-radios__checkmark"></span>
  </label>
);

RadioButton.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string,
  formValues: PropTypes.object,
  label: PropTypes.string,
  validation: PropTypes.func,
  onClickCallback: PropTypes.func,
};

RadioButton.defaultProps = {
  onClickCallback: () => {},
};

export default RadioButton;
