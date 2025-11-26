import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../common/Header";
import BreadCrumb from "../../common/BreadCrumb";
import Question from "../../common/Question";
import ButtonLink from "../../common/ButtonLink";
import CustomerServiceDetails from "../../common/CustomerServiceDetails";

const ForgotRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Header heading="Book a West Midlands Bus on Demand journey" />
      <main className="wmnds-container wmnds-container--main wmnds-p-b-lg wmnds-grid">
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <BreadCrumb currentPageName="Booking" />
          <div className="wmnds-col-1 wmnds-m-b-md">
            <ButtonLink
              callback={() =>
                navigate("/booking", {
                  state: location.state,
                  replace: true,
                })
              }
            >{`< Back`}</ButtonLink>
          </div>
          <Question text="Contact our customer services team" />
          <CustomerServiceDetails />
        </div>
      </main>
    </>
  );
};

export default ForgotRegistration;
