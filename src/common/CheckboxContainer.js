import PropTypes from "prop-types";

const CheckboxContainer = ({ error, description, children }) => (
  <div className="wmnds-fe-group">
    <div
      className={`wmnds-fe-checkboxes ${error && "wmnds-fe-group--error"}`}
    >
      {description && (
        <div className="wmnds-fe-checkboxes__desc">{description}</div>
      )}
      {children}
    </div>
  </div>
);

CheckboxContainer.propTypes = {
  error: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default CheckboxContainer;
