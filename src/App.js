import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ContactForm from "./Contact/ContactForm";
import ContactConfirmation from "./Contact/Confirmation";
import RegistrationForm from "./Registration/RegistrationForm";
import RegistrationConfirmation from "./Registration/Confirmation";
import BookingForm from "./Booking/BookingForm";
import BookingConfirmation from "./Booking/Confirmation";
import OutsideWmca from "./Registration/section1/OutsideWmca";
import ForgotRegistration from "./Booking/section1/ForgotRegistration";
import Maintenance from "./Maintenance";

const Home = () => (
  <>
    <main
      id="wmnds-main-content"
      className="wmnds-container wmnds-m-t-lg homepage"
    >
      <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--spacing-2-lg wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <div className="one-column-row">
            <div className="wmnds-col-1 wmnds-col-md-1-1">
              <div className="wmnds-m-b-lg">
                <h1>Ring &amp; Ride Forms</h1>
                <ul>
                  <li>
                    <Link to="/contactUs">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/registration">Registration</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
);

const App = () => {
  // Set to true to enable maintenance mode
  const maintenanceMode = false;

  if (maintenanceMode) {
    return <Maintenance />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<ContactForm />} />
        <Route path="/contactUs/confirmed" element={<ContactConfirmation />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/registration/outsideWmca" element={<OutsideWmca />} />
        <Route
          path="/registration/confirmed"
          element={<RegistrationConfirmation />}
        />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/booking/confirmed" element={<BookingConfirmation />} />
        <Route
          path="/booking/forgotRegistration"
          element={<ForgotRegistration />}
        />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
