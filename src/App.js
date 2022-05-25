import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ContactForm from "./Contact/ContactForm";
import RegistrationForm from "./Registration/RegistrationForm";
import BookingForm from "./Booking/BookingForm";
import OutsideWmca from "./Registration/section1/OutsideWmca";
import ForgotRegistration from "./Booking/section1/ForgotRegistration";

const Home = () => (
  <ul>
    <li>
      <Link to="/contactUs">Contact Us</Link>
    </li>
    <li>
      <Link to="/registration">Registration</Link>
    </li>
    <li>
      <Link to="/booking">Booking</Link>
    </li>
  </ul>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<ContactForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/registration/outsideWmca" element={<OutsideWmca />} />
        <Route path="/booking" element={<BookingForm />} />
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
