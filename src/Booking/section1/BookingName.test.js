import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import BookingName from "./BookingName";

jest.mock("react-final-form");

describe("BookingName", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfSomeone",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for a group", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfGroup",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
        firstName: "13545",
      },
      submitFailed: true,
      errors: { firstName: "Invalid", lastName: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<BookingName />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
