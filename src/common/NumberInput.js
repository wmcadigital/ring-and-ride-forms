import { Field } from "react-final-form";
import PropTypes from "prop-types";

import FieldError from "./FieldError";

const NumberInput = ({
  fieldName,
  validation,
  defaultValue,
  label,
  error,
  decreaseNumberCallback,
  increaseNumberCallback,
}) => {
  return (
    <div className={`wmrards-fe-group  ${error && "wmrards-fe-group--error"}`}>
      <div className="wmrards-fe-number-input">
        {label ? (
          <label className="wmrards-fe-label" htmlFor={fieldName}>
            {label}
          </label>
        ) : null}
        <FieldError text={error} />
        <div className="wmrards-fe-number-input__container wmrards-grid wmrards-grid--spacing-3-sm">
          <div className="wmrards-col-auto">
            <button
              type="button"
              className="wmrards-fe-number-input__control"
              title="Decrease"
              onClick={decreaseNumberCallback}
            >
              <svg className="wmrards-accordion__icon">
                <use
                  xlinkHref="#wmrards-general-minimise"
                  href="#wmrards-general-minimise"
                ></use>
              </svg>
            </button>
          </div>
          <div className="wmrards-col-auto">
            <Field
              name={fieldName}
              validate={validation}
              component="input"
              type="number"
              className="wmrards-fe-number-input__input"
              defaultValue={defaultValue}
            />
          </div>
          <div className="wmrards-col-auto">
            <button
              type="button"
              className="wmrards-fe-number-input__control"
              title="Increase"
              onClick={increaseNumberCallback}
            >
              <svg className="wmrards-accordion__icon">
                <use
                  xlinkHref="#wmrards-general-expand"
                  href="#wmrards-general-expand"
                ></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string,
  validation: PropTypes.func,
  error: PropTypes.string,
  defaultValue: PropTypes.number,
  decreaseNumberCallback: PropTypes.func,
  increaseNumberCallback: PropTypes.func,
};

NumberInput.defaultProps = {
  decreaseNumberCallback: () => {},
  increaseNumberCallback: () => {},
};

export default NumberInput;
