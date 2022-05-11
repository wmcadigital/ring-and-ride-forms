import PropTypes from "prop-types";

const TextAreaContainer = ({ error, children }) => (
  <div className={`wmrards-m-t-xl ${error && "wmrards-fe-group--error"}`}>
    {children}
  </div>
);

TextAreaContainer.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node,
};

export default TextAreaContainer;
