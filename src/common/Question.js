import PropTypes from "prop-types";

const Question = ({ text }) => <h2 className="wmrards-fe-question">{text}</h2>;

Question.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Question;
