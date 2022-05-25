import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import OtherReturnDestinationAddress from "./OtherReturnDestinationAddress";

jest.mock("react-final-form");

describe("OtherReturnDestinationAddress", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<OtherReturnDestinationAddress />);

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

    renderer.render(<OtherReturnDestinationAddress />);

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

    renderer.render(<OtherReturnDestinationAddress />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
