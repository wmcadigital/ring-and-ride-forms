import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ContactForm from "./Contact/ContactForm";
import RegistrationForm from "./Registration/RegistrationForm";
import OutsideWmca from "./Registration/section1/OutsideWmca";

const Home = () => (
  <ul>
    <li>
      <Link to="/contactUs">Contact Us</Link>
    </li>
    <li>
      <Link to="/registration">Registration</Link>
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
