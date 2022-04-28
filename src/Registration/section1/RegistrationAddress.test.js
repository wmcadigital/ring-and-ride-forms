import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import RegistrationAddress from "./RegistrationAddress";

jest.mock("react-final-form");

describe("RegistrationAddress", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationAddress />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        firstName: "Test",
        lastName: "Testerson",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationAddress />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
