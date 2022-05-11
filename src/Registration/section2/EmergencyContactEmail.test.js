import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import EmergencyContactEmail from "./EmergencyContactEmail";

jest.mock("react-final-form");

describe("EmergencyContactEmail", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        firstName: "Zippy",
        emergencyFirstName: "Bungle",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactEmail />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else and is the emergency contact", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        emergencyContact: "yes",
        firstName: "Zippy",
        emergencyFirstName: "Bungle",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactEmail />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else and is NOT the emergency contact", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        emergencyContactAnother: "yes",
        firstName: "Zippy",
        emergencyFirstName: "Bungle",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactEmail />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        emergencyContact: "no",
        emergencyContactAnother: "yes",
        firstName: "Zippy",
        emergencyFirstName: "Bungle",
      },
      submitFailed: true,
      errors: { emergencyEmailAddress: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactEmail />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
