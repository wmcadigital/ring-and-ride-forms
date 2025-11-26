import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../common/Header";
import BreadCrumb from "../../common/BreadCrumb";
import Question from "../../common/Question";
import ButtonLink from "../../common/ButtonLink";

const OutsideWmca = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Header heading="Register for the Ring and Ride service" />
      <main className="wmnds-container wmnds-container--main wmnds-p-b-lg wmnds-grid">
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <BreadCrumb currentPageName="Register" />
          <div className="wmnds-col-1 wmnds-m-b-md">
            <ButtonLink
              callback={() =>
                navigate("/registration", {
                  state: location.state,
                  replace: true,
                })
              }
            >
              {`< Back`}
            </ButtonLink>
          </div>
          <Question text="The West Midlands Bus Ring and Ride service does not operate in your area" />
          <p>
            {`To be eligible for the Ring and Ride service you must live in the `}
            <a href="#">West Midlands Combined Authority area</a>.
          </p>
          <p>
            Other <a href="#">similar schemes</a> exist throughout the UK.
          </p>
        </div>
      </main>
    </>
  );
};

export default OutsideWmca;
