import PropTypes from "prop-types";

const ContactDetails = ({ children }) => (
  <div className="wmrards-inset-text">
    <address className="wmrards-contact-details">{children}</address>
  </div>
);

ContactDetails.propTypes = {
  children: PropTypes.node,
};

export default ContactDetails;
