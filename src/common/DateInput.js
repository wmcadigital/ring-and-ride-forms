import PropTypes from "prop-types";
import { Field } from "react-final-form";

import FieldError from "./FieldError";

const DateInput = ({
  dayFieldName,
  monthFieldName,
  yearFieldName,
  error,
  label,
}) => {
  return (
    <div
      id="date-input"
      className={`wmnds-fe-group ${error && "wmnds-fe-group--error"}`}
    >
      <div className="wmnds-fe-date-input">
        {label && (
          <label className="wmnds-fe-label" htmlFor="date-input">
            {label}
          </label>
        )}
        {error && <FieldError text={error} />}
        <div className="wmnds-fe-date-input__day">
          <label className="wmnds-fe-label" htmlFor="LastUsedDateDay">
            Day
          </label>
          <Field name={dayFieldName}>
            {({ input }) => (
              <input
                {...input}
                autoComplete="bday-day"
                id="LastUsedDateDay"
                className={`wmnds-fe-input wmnds-p-r-xs ${
                  error && "wmnds-fe-input--error"
                }`}
                inputMode="numeric"
                type="text"
                maxLength="2"
                pattern="[0-9]*"
              />
            )}
          </Field>
        </div>
        <div className="wmnds-fe-date-input__month">
          <label className="wmnds-fe-label" htmlFor="LastUsedDateMonth">
            Month
          </label>
          <Field name={monthFieldName}>
            {({ input }) => (
              <input
                {...input}
                autoComplete="bday-month"
                id="LastUsedDateMonth"
                className={`wmnds-fe-input wmnds-p-r-xs ${
                  error && "wmnds-fe-input--error"
                }`}
                inputMode="numeric"
                type="text"
                maxLength="2"
                pattern="[0-9]*"
              />
            )}
          </Field>
        </div>
        <div className="wmnds-fe-date-input__year">
          <label className="wmnds-fe-label" htmlFor="LastUsedDateYear">
            Year
          </label>
          <Field name={yearFieldName}>
            {({ input }) => (
              <input
                {...input}
                autoComplete="bday-year"
                id="LastUsedDateYear"
                className={`wmnds-fe-input wmnds-p-r-xs ${
                  error && "wmnds-fe-input--error"
                }`}
                inputMode="numeric"
                type="text"
                maxLength="4"
                pattern="[0-9]*"
              />
            )}
          </Field>
        </div>
      </div>
    </div>
  );
};

DateInput.propTypes = {
  dayFieldName: PropTypes.string,
  monthFieldName: PropTypes.string,
  yearFieldName: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
};

export default DateInput;
