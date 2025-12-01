import PropTypes from "prop-types";

const ConfirmationPanel = ({ header, info }) => (
  <div className="wmnds-msg-summary wmnds-msg-summary--success-fill wmnds-p-b-lg">
    <div className="wmnds-msg-summary__header">
      <h3 className="wmnds-msg-summary__title wmnds-text-align-center">
        {header}
      </h3>
    </div>
    {info ? (
      <div className="wmnds-msg-summary__info wmnds-text-align-center">
        {info}
      </div>
    ) : null}
  </div>
);

ConfirmationPanel.propTypes = {
  header: PropTypes.string.isRequired,
  info: PropTypes.string,
};

export default ConfirmationPanel;
