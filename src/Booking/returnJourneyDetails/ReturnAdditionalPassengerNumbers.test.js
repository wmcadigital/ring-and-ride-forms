import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import ReturnAdditionalPassengerNumbers from "./ReturnAdditionalPassengerNumbers";

jest.mock("react-final-form");

describe("ReturnAdditionalPassengerNumbers - snapshots", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<ReturnAdditionalPassengerNumbers />);

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

    renderer.render(<ReturnAdditionalPassengerNumbers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
        firstName: "John",
        additionalReturnPassengerNumbers: -1,
      },
      submitFailed: true,
      errors: { additionalReturnPassengerNumbers: "Invalid" },
    }));
    const renderer = createRenderer();

    renderer.render(<ReturnAdditionalPassengerNumbers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
