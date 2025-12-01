import PropTypes from "prop-types";

import Question from "../../common/Question";
import Table from "../../common/Table";
import PassengerRow from "./PassengerRow";

const PassengerList = ({
  passengers,
  changeCallBack,
  removeCallBack,
  addCallBack,
  returnPassengers,
  summaryPageMode,
  anotherFormPresent,
}) => {
  return (
    <>
      {!summaryPageMode ? (
        <>
          <Question
            text={returnPassengers ? "Return passengers" : "Passengers"}
          />
          <p>
            {returnPassengers
              ? "Add or remove a passenger from the list."
              : "Add another passenger or continue to the next question."}
          </p>
        </>
      ) : (
        <>
          {anotherFormPresent ? (
            returnPassengers ? (
              <h3>Return journey passengers</h3>
            ) : (
              <h3>Outward journey passengers</h3>
            )
          ) : (
            <h3>Passengers</h3>
          )}
        </>
      )}
      <Table>
        <tr>
          <th>
            <div className="wmnds-m-b-xsm">Name</div>
          </th>
          <th colSpan={3}>
            <div className="wmnds-m-b-xsm">Registration number</div>
          </th>
        </tr>
        {passengers.map(({ firstName, lastName, registrationNo }, index) => (
          <PassengerRow
            key={index}
            fullName={`${firstName} ${lastName}`}
            registrationNo={registrationNo}
            changeCallBack={() =>
              changeCallBack(firstName, lastName, registrationNo, index)
            }
            removeCallBack={() => removeCallBack(index)}
          />
        ))}
      </Table>
      <button
        className="wmnds-btn wmnds-btn--secondary wmnds-m-r-md"
        type="button"
        onClick={() => addCallBack()}
      >
        Add Passenger
      </button>
      {!summaryPageMode ? (
        <button
          type="submit"
          className="wmnds-btn"
          onClick={(e) => e.target.blur()}
        >
          Continue
        </button>
      ) : null}
    </>
  );
};

PassengerList.propTypes = {
  passengers: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      registrationNo: PropTypes.string,
    })
  ),
  changeCallBack: PropTypes.func,
  removeCallBack: PropTypes.func,
  addCallBack: PropTypes.func,
  returnPassengers: PropTypes.bool,
  summaryPageMode: PropTypes.bool,
  anotherFormPresent: PropTypes.bool,
};

PassengerList.defaultProps = {
  passengers: [],
  addCallBack: () => {},
};

export default PassengerList;
