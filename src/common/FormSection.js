import PropTypes from "prop-types";

const FormSection = ({ error, children }) => (
  <div className={`wmrards-fe-group ${error && "wmrards-fe-group--error"}`}>
    {children}
  </div>
);

FormSection.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node,
};

export default FormSection;
