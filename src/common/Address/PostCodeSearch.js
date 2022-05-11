import { Field, useField } from "react-final-form";
import PropTypes from "prop-types";

import FieldError from "../FieldError";
import { required, postCode, composeValidators } from "../validation";

const validatePostCode = composeValidators(required, postCode);

const PostCodeSearch = ({ prefix, error, getAddresses, loading }) => {
  const fieldName = `${prefix}.searchPostCode`;
  const { input } = useField(fieldName);
  const invalid = validatePostCode(input?.value);

  return (
    <div className={`wmrards-fe-group ${error && "wmrards-fe-group--error"}`}>
      <label className="wmrards-fe-label" htmlFor={fieldName}>
        Postcode
      </label>
      <FieldError text={error} />
      <Field
        name={fieldName}
        validate={validatePostCode}
        component="input"
        type="text"
        className="wmrards-fe-input"
      />
      <button
        className={`wmrards-m-t-md wmrards-btn wmrards-btn--primary ${
          (invalid || loading) && "wmrards-btn--disabled"
        }`}
        type="button"
        onClick={() => getAddresses(input?.value)}
        disabled={invalid || loading ? "disabled" : undefined}
      >
        Find Address
        {loading ? (
          <div
            className="wmrards-loader wmrards-loader--btn wmrards-btn__icon wmrards-btn__icon--right"
            role="alert"
            aria-live="assertive"
          >
            <p className="wmrards-loader__content"></p>
          </div>
        ) : null}
      </button>
    </div>
  );
};

PostCodeSearch.propTypes = {
  prefix: PropTypes.string.isRequired,
  error: PropTypes.string,
  getAddresses: PropTypes.func,
  loading: PropTypes.bool,
};

export default PostCodeSearch;
