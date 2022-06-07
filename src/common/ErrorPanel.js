import PropTypes from "prop-types";

const ErrorPanel = ({ message }) => (
  <div className="wmrards-msg-summary wmrards-msg-summary--error ">
    <div className="wmrards-msg-summary__header">
      <svg className="wmrards-msg-summary__icon">
        <use
          xlinkHref="#wmrards-general-warning-triangle"
          href="#wmrards-general-warning-triangle"
        ></use>
      </svg>
      <h3 className="wmrards-msg-summary__title">Error</h3>
    </div>
    <div className="wmrards-msg-summary__info">{message}</div>
  </div>
);

ErrorPanel.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorPanel;
