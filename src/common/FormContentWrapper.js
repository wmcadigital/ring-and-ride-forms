import PropTypes from "prop-types";

const FormContentWrapper = ({ children }) => (
  <main className="wmnds-container wmnds-container--main wmnds-p-b-lg wmnds-grid">
    <div className="wmnds-col-1 wmnds-col-md-2-3">{children}</div>
  </main>
);

FormContentWrapper.propTypes = {
  children: PropTypes.node,
};

export default FormContentWrapper;
