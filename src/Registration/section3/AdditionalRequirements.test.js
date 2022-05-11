import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import AdditionalRequirements from "./AdditionalRequirements";

jest.mock("react-final-form");

describe("AdditionalRequirements - snapshots", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<AdditionalRequirements />);

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

    renderer.render(<AdditionalRequirements />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
      submitFailed: true,
      errors: { additionalRequirements: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<AdditionalRequirements />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("shows text area for additional requirements if yes is selected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        additionalRequirements: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<AdditionalRequirements />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("shows error if text area not filled in on submission", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        additionalRequirements: "yes",
      },
      submitFailed: true,
      errors: { additionalRequirementsDetails: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<AdditionalRequirements />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
