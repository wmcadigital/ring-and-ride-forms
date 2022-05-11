import PropTypes from "prop-types";

const CheckboxContainer = ({ error, description, children }) => (
  <div className="wmrards-fe-group">
    <div
      className={`wmrards-fe-checkboxes ${error && "wmrards-fe-group--error"}`}
    >
      {description && (
        <div className="wmrards-fe-checkboxes__desc">{description}</div>
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
