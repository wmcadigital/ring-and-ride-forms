import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import ConditionQuery from "./ConditionQuery";

jest.mock("react-final-form");

describe("ConditionQuery - snapshots", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<ConditionQuery />);

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

    renderer.render(<ConditionQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
      submitFailed: true,
      errors: { hasCondition: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<ConditionQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
