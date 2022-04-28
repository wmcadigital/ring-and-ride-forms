import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import EmergencyContactAnother from "./EmergencyContactAnother";

jest.mock("react-final-form");

describe("EmergencyContactAnother - snapshots", () => {
  it("renders as expected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        firstName: "John",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactAnother />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        firstName: "John",
      },
      submitFailed: true,
      errors: { emergencyContactAnother: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<EmergencyContactAnother />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
