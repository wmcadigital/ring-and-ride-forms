import { create } from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm", () => {
  it("renders Registration Form as expected", () => {
    const renderer = create(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
