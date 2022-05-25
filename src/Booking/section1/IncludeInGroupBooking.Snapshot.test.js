import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import IncludeInGroupBooking from "./IncludeInGroupBooking";

jest.mock("react-final-form");

describe("IncludeInGroupBooking - snapshots", () => {
  it("renders as expected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: { bookingParty: "behalfGroup" },
    }));
    const renderer = createRenderer();

    renderer.render(<IncludeInGroupBooking />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: { bookingParty: "behalfGroup" },
      submitFailed: true,
      errors: { includeInGroupBooking: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<IncludeInGroupBooking />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
