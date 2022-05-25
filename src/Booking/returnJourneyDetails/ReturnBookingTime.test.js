import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import ReturnBookingTime from "./ReturnBookingTime";

jest.mock("react-final-form");

describe("ReturnBookingTime", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<ReturnBookingTime />);

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

    renderer.render(<ReturnBookingTime />);

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

    renderer.render(<ReturnBookingTime />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
        firstName: "John",
      },
      submitFailed: true,
      errors: { "returnPickup.timeInput": "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<ReturnBookingTime />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
