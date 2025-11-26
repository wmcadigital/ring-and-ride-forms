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
    <div className={`wmnds-fe-group  ${error && "wmnds-fe-group--error"}`}>
      <div className="wmnds-fe-number-input">
        {label ? (
          <label className="wmnds-fe-label" htmlFor={fieldName}>
            {label}
          </label>
        ) : null}
        <FieldError text={error} />
        <div className="wmnds-fe-number-input__container wmnds-grid wmnds-grid--spacing-3-sm">
          <div className="wmnds-col-auto">
            <button
              type="button"
              className="wmnds-fe-number-input__control"
              title="Decrease"
              onClick={decreaseNumberCallback}
            >
              <svg className="wmnds-accordion__icon">
                <use
                  xlinkHref="#wmnds-general-minimise"
                  href="#wmnds-general-minimise"
                ></use>
              </svg>
            </button>
          </div>
          <div className="wmnds-col-auto">
            <Field
              name={fieldName}
              validate={validation}
              component="input"
              type="number"
              className="wmnds-fe-number-input__input"
              defaultValue={defaultValue}
            />
          </div>
          <div className="wmnds-col-auto">
            <button
              type="button"
              className="wmnds-fe-number-input__control"
              title="Increase"
              onClick={increaseNumberCallback}
            >
              <svg className="wmnds-accordion__icon">
                <use
                  xlinkHref="#wmnds-general-expand"
                  href="#wmnds-general-expand"
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
