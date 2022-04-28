import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import TelephoneNo from "./TelephoneNo";

jest.mock("react-final-form");

describe("TelephoneNo", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<TelephoneNo />);

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

    renderer.render(<TelephoneNo />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        phoneNo: "abcd",
      },
      submitFailed: true,
      errors: { phoneNo: "Invalid" },
    }));
    const renderer = createRenderer();

    renderer.render(<TelephoneNo />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
