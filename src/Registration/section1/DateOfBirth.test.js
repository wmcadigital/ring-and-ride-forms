import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import DateOfBirth from "./DateOfBirth";

jest.mock("react-final-form");

describe("DateOfBirth", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<DateOfBirth />);

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

    renderer.render(<DateOfBirth />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        bdayDay: "15",
      },
      submitFailed: true,
      errors: { dateOfBirth: "Invalid" },
    }));
    const renderer = createRenderer();

    renderer.render(<DateOfBirth />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
