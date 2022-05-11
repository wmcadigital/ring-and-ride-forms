import PropTypes from "prop-types";

const FormContentWrapper = ({ children }) => (
  <main className="wmrards-container wmrards-container--main wmrards-p-b-lg wmrards-grid">
    <div className="wmrards-col-1 wmrards-col-md-2-3">{children}</div>
  </main>
);

FormContentWrapper.propTypes = {
  children: PropTypes.node,
};

export default FormContentWrapper;
