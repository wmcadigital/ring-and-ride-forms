import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import RegistrationName from "./RegistrationName";

jest.mock("react-final-form");

describe("RegistrationName", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        firstName: "13545",
      },
      submitFailed: true,
      errors: { firstName: "Invalid", lastName: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
