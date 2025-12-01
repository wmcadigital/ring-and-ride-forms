import PropTypes from "prop-types";

const ContactDetails = ({ children }) => (
  <div className="wmnds-inset-text">
    <address className="wmnds-contact-details">{children}</address>
  </div>
);

ContactDetails.propTypes = {
  children: PropTypes.node,
};

export default ContactDetails;
