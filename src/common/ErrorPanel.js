import PropTypes from "prop-types";

const ErrorPanel = ({ message }) => (
  <div className="wmnds-msg-summary wmnds-msg-summary--error ">
    <div className="wmnds-msg-summary__header">
      <svg className="wmnds-msg-summary__icon">
        <use
          xlinkHref="#wmnds-general-warning-triangle"
          href="#wmnds-general-warning-triangle"
        ></use>
      </svg>
      <h3 className="wmnds-msg-summary__title">Error</h3>
    </div>
    <div className="wmnds-msg-summary__info">{message}</div>
  </div>
);

ErrorPanel.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorPanel;
