import PropTypes from "prop-types";

const FieldError = ({ text }) =>
  text && <span className="wmnds-fe-error-message">{text}</span>;

FieldError.propTypes = {
  text: PropTypes.string,
};

FieldError.defaultProps = {
  text: null,
};

export default FieldError;
