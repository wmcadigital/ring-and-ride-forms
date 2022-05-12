import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import ConfirmSameGroup from "./ConfirmSameGroup";

jest.mock("react-final-form");

describe("ConfirmSameGroup - snapshots", () => {
  it("individual is filling out form for a group", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfGroup",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<ConfirmSameGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfGroup",
      },
      submitFailed: true,
      errors: { groupSameAsOutward: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<ConfirmSameGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
