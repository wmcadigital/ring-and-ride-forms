import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import BookingParty from "./BookingParty";

jest.mock("react-final-form");

describe("BookingParty - snapshots", () => {
  it("renders as expected with no value selected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {},
    }));
    const renderer = createRenderer();

    renderer.render(<BookingParty />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders as expected with value selected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingParty />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {},
      submitFailed: true,
      errors: { bookingParty: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingParty />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
