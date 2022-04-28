import PropTypes from "prop-types";

const ButtonLink = ({ children, callback }) => {
  return (
    <button
      type="button"
      onClick={callback}
      className="wmrards-btn wmrards-btn--link"
    >
      {children}
    </button>
  );
};

ButtonLink.propTypes = {
  children: PropTypes.node,
  callback: PropTypes.func,
};

export default ButtonLink;
