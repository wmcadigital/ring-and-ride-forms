import PropTypes from "prop-types";

const DeleteButton = ({ children, callback }) => {
  return (
    <button
      type="button"
      onClick={callback}
      className="wmnds-btn wmnds-btn--destructive"
    >
      {children}
      <svg className="wmnds-btn__icon wmnds-btn__icon--right ">
        <use
          xlinkHref="#wmnds-general-trash"
          href="#wmnds-general-trash"
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
