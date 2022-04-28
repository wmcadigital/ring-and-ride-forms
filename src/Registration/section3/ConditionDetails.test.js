import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import ConditionDetails from "./ConditionDetails";

jest.mock("react-final-form");

describe("ConditionDetails - snapshots", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<ConditionDetails />);

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

    renderer.render(<ConditionDetails />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
      submitFailed: true,
      errors: { conditionDetail: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<ConditionDetails />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
