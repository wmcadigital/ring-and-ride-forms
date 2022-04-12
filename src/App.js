import { StrictMode } from "react";
import ReactDOM from "react-dom";

import ContactForm from "./ContactForm";

const App = () => {
  return (
    <div>
      <ContactForm />
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
