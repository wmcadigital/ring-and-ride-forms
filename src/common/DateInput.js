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
      className={`wmrards-fe-group ${error && "wmrards-fe-group--error"}`}
    >
      <div className="wmrards-fe-date-input">
        {label && (
          <label className="wmrards-fe-label" htmlFor="date-input">
            {label}
          </label>
        )}
        {error && <FieldError text={error} />}
        <div className="wmrards-fe-date-input__day">
          <label className="wmrards-fe-label" htmlFor="LastUsedDateDay">
            Day
          </label>
          <Field name={dayFieldName}>
            {({ input }) => (
              <input
                {...input}
                autoComplete="bday-day"
                id="LastUsedDateDay"
                className={`wmrards-fe-input wmrards-p-r-xs ${
                  error && "wmrards-fe-input--error"
                }`}
                inputMode="numeric"
                type="text"
                maxLength="2"
                pattern="[0-9]*"
              />
            )}
          </Field>
        </div>
        <div className="wmrards-fe-date-input__month">
          <label className="wmrards-fe-label" htmlFor="LastUsedDateMonth">
            Month
          </label>
          <Field name={monthFieldName}>
            {({ input }) => (
              <input
                {...input}
                autoComplete="bday-month"
                id="LastUsedDateMonth"
                className={`wmrards-fe-input wmrards-p-r-xs ${
                  error && "wmrards-fe-input--error"
                }`}
                inputMode="numeric"
                type="text"
                maxLength="2"
                pattern="[0-9]*"
              />
            )}
          </Field>
        </div>
        <div className="wmrards-fe-date-input__year">
          <label className="wmrards-fe-label" htmlFor="LastUsedDateYear">
            Year
          </label>
          <Field name={yearFieldName}>
            {({ input }) => (
              <input
                {...input}
                autoComplete="bday-year"
                id="LastUsedDateYear"
                className={`wmrards-fe-input wmrards-p-r-xs ${
                  error && "wmrards-fe-input--error"
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
