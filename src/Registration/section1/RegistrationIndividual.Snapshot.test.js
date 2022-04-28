import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import RegistrationIndividual from "./RegistrationIndividual";

jest.mock("react-final-form");

describe("RegistrationIndividual - snapshots", () => {
  it("renders as expected with no value selected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {},
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationIndividual />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders as expected with value selected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationIndividual />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {},
      submitFailed: true,
      errors: { registerForYourself: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<RegistrationIndividual />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
