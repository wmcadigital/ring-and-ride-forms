import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import BookingTime from "./BookingTime";

jest.mock("react-final-form");

describe("BookingTime", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingTime />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfSomeone",
        firstName: "John",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingTime />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for a group", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfGroup",
        firstName: "John",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingTime />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
        firstName: "John",
      },
      submitFailed: true,
      errors: { "outwardPickup.timeInput": "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingTime />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
