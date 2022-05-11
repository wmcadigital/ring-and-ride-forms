import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import StandardBusReasons from "./StandardBusReasons";

jest.mock("react-final-form");

describe("StandardBusReasons", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<StandardBusReasons />);

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

    renderer.render(<StandardBusReasons />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
      submitFailed: true,
      errors: { selectStandardBusReason: "Select at least 1 topic" },
    }));
    const renderer = createRenderer();

    renderer.render(<StandardBusReasons />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an other reason text area if other reason selected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        standardBusReason: { other: true },
      },
    }));
    const renderer = createRenderer();

    renderer.render(<StandardBusReasons />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error - other selected, no reason", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        standardBusReason: { other: true },
      },
      submitFailed: true,
      errors: { standardBusReason: { otherReason: "Required" } },
    }));
    const renderer = createRenderer();

    renderer.render(<StandardBusReasons />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
