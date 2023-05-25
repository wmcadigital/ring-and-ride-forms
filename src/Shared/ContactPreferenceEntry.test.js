import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import ContactPreferenceEntry from "./ContactPreferenceEntry";

jest.mock("react-final-form");

const formApiReturn = {
  values: {
    emailContact: true,
    emailAddress: "test@testerson.com",
    phoneContact: true,
    phoneNo: "0900 555 8888",
  },
};

describe("ContactPreferenceEntry", () => {
  it("renders ContactPreferenceEntry (no values)", () => {
    useFormState.mockImplementationOnce(() => ({ values: {} }));
    const renderer = createRenderer();

    renderer.render(<ContactPreferenceEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders ContactPreferenceEntry (all values)", () => {
    useFormState.mockImplementationOnce(() => formApiReturn);
    const renderer = createRenderer();

    renderer.render(<ContactPreferenceEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders ContactPreferenceEntry with error if present (no values)", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {},
      submitFailed: true,
      errors: { contactPreference: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<ContactPreferenceEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders ContactPreferenceEntry with error if present (all values)", () => {
    useFormState.mockImplementationOnce(() => ({
      values: { ...formApiReturn.values, phoneNo: "abc" },
      submitFailed: true,
      errors: { phoneNo: "Invalid" },
    }));
    const renderer = createRenderer();

    renderer.render(<ContactPreferenceEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
