import { create } from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  it("renders Contact Form as expected", () => {
    const renderer = create(
      <BrowserRouter>
        <ContactForm />
      </BrowserRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
