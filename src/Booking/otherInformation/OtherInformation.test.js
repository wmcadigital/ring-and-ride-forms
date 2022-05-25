import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import OtherInformation from "./OtherInformation";

jest.mock("react-final-form");

describe("OtherInformation - snapshots", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<OtherInformation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfSomeone",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<OtherInformation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for a group", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfGroup",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<OtherInformation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
      submitFailed: true,
      errors: { otherInformation: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<OtherInformation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("shows text area for other information if yes is selected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
        otherInformation: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<OtherInformation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("shows error if text area not filled in on submission", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
        otherInformation: "yes",
      },
      submitFailed: true,
      errors: { otherInformationDetails: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<OtherInformation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
