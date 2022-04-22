import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import RegistrationNoEntry from "./RegistrationNoEntry";

jest.mock("react-final-form");

describe("RegistrationNoEntry", () => {
  it("renders with no value", () => {
    useFormState.mockImplementationOnce(() => ({}));
    const renderer = createRenderer();

    renderer.render(<RegistrationNoEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with a value", () => {
    useFormState.mockImplementationOnce(() => ({
      values: { registrationNo: "12345" },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationNoEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      submitFailed: true,
      errors: { registrationNo: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationNoEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
