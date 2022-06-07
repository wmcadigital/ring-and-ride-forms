import PropTypes from "prop-types";

const ConfirmationPanel = ({ header, info }) => (
  <div className="wmrards-msg-summary wmrards-msg-summary--success-fill wmrards-p-b-lg">
    <div className="wmrards-msg-summary__header">
      <h3 className="wmrards-msg-summary__title wmrards-text-align-center">
        {header}
      </h3>
    </div>
    {info ? (
      <div className="wmrards-msg-summary__info wmrards-text-align-center">
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
