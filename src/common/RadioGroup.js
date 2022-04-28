import PropTypes from "prop-types";

const RadioGroup = ({ children, error }) => (
  <div
    className={`wmrards-fe-radios ${error && "wmrards-fe-group--error"}`}
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
