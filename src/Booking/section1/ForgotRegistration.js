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
      <Header heading="Book a Ring and Ride journey" />
      <main className="wmrards-container wmrards-container--main wmrards-p-b-lg wmrards-grid">
        <div className="wmrards-col-1 wmrards-col-md-2-3">
          <BreadCrumb currentPageName="Booking" />
          <div className="wmrards-col-1 wmrards-m-b-md">
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
