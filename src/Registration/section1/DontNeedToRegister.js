import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../common/Header";
import BreadCrumb from "../../common/BreadCrumb";
import Question from "../../common/Question";
import ButtonLink from "../../common/ButtonLink";

const DontNeedToRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Header heading="Register for the West Midlands Bus on Demand service" />
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
          <div className="wmnds-p-lg wmnds-bg-white">
          <Question text="You don't need to register" />
          <p>You can download our app to start traveling.</p>

          <div className="wmnds-warning-text wmnds-m-b-lg">
            <svg className="wmnds-warning-text__icon">
              <use
                xlinkHref="#wmnds-general-info"
                href="#wmnds-general-info"
              ></use>
            </svg>
            If you are able to use public transport, you can only use this service to travel within the Coventry area.
          </div>
          <p>
            <a target="_blank" href="https://apps.apple.com/gb/app/wm-on-demand/id1557659235" rel="noreferrer">
              Download from the App Store for IOS
            </a>
          </p>
          <p>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=warwick.uni&pli=1" rel="noreferrer">
              Download from Google Play for Android
            </a>
          </p>
        </div>
        </div>
      </main>
    </>
  );
};

export default DontNeedToRegister;
