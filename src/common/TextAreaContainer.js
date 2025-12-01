import PropTypes from "prop-types";

const TextAreaContainer = ({ error, children }) => (
  <div className={`wmnds-m-t-xl ${error && "wmnds-fe-group--error"}`}>
    {children}
  </div>
);

TextAreaContainer.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node,
};

export default TextAreaContainer;
