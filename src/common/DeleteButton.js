import PropTypes from "prop-types";

const DeleteButton = ({ children, callback }) => {
  return (
    <button
      type="button"
      onClick={callback}
      className="wmrards-btn wmrards-btn--destructive"
    >
      {children}
      <svg className="wmrards-btn__icon wmrards-btn__icon--right ">
        <use
          xlinkHref="#wmrards-general-trash"
          href="#wmrards-general-trash"
        ></use>
      </svg>
    </button>
  );
};

DeleteButton.propTypes = {
  children: PropTypes.node,
  callback: PropTypes.func,
};

export default DeleteButton;
