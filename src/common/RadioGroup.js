import PropTypes from "prop-types";

const RadioGroup = ({ children, error }) => (
  <div
    className={`wmnds-fe-radios ${error && "wmnds-fe-group--error"}`}
    role="radiogroup"
  >
    {children}
  </div>
);

RadioGroup.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node,
};

export default RadioGroup;
