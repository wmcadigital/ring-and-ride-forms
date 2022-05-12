import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import AdditionalPassengerReturnQuery from "./AdditionalPassengerReturnQuery";

jest.mock("react-final-form");

describe("AdditionalPassengerReturnQuery - snapshots", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<AdditionalPassengerReturnQuery />);

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

    renderer.render(<AdditionalPassengerReturnQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
        firstName: "John",
      },
      submitFailed: true,
      errors: { additionalPassengerReturn: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<AdditionalPassengerReturnQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
