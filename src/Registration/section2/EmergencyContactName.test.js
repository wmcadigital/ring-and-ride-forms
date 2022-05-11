import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import EmergencyContactName from "./EmergencyContactName";

jest.mock("react-final-form");

describe("EmergencyContactName", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else and is the emergency contact", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        emergencyContact: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else and is NOT the emergency contact", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        emergencyContactAnother: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        emergencyContact: "yes",
      },
      submitFailed: true,
      errors: { emergencyFirstName: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
