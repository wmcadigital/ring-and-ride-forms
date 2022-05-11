import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import EmergencyContactAddress from "./EmergencyContactAddress";

jest.mock("react-final-form");

describe("EmergencyContactAddress", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        firstName: "Zippy",
        emergencyFirstName: "Bungle",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactAddress />);

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

    renderer.render(<EmergencyContactAddress />);

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

    renderer.render(<EmergencyContactAddress />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
