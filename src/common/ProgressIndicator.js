import PropTypes from "prop-types";

const ProgressIndicator = ({ sectionPosition, sectionName }) => (
  <div className="wmrards-progress-indicator">
    {sectionPosition}
    <h4>{sectionName}</h4>
  </div>
);

ProgressIndicator.propTypes = {
  sectionPosition: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
};

export default ProgressIndicator;
