import { createRenderer } from "react-test-renderer/shallow";
import { BrowserRouter } from "react-router-dom";

import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm", () => {
  it("renders Registration Form as expected", () => {
    const renderer = createRenderer();

    renderer.render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
