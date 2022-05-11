import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import ContactPreferences from "./ContactPreferences";

jest.mock("react-final-form");

describe("ContactPreferences", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<ContactPreferences />);

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

    renderer.render(<ContactPreferences />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
      submitFailed: true,
      errors: { selectContactPref: "Select at least 1 topic" },
    }));
    const renderer = createRenderer();

    renderer.render(<ContactPreferences />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
