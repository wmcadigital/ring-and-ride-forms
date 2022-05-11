import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import MobilityAidsQuery from "./MobilityAidsQuery";

jest.mock("react-final-form");

describe("MobilityAidsQuery", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<MobilityAidsQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        firstName: "Test",
        lastName: "Testerson",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<MobilityAidsQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
      submitFailed: true,
      errors: { selectMobilityAids: "Select at least 1 topic" },
    }));
    const renderer = createRenderer();

    renderer.render(<MobilityAidsQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an other requirement text area if other reason selected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        mobilityAids: { other: true },
      },
    }));
    const renderer = createRenderer();

    renderer.render(<MobilityAidsQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error - other selected, no requirement", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        mobilityAids: { other: true },
      },
      submitFailed: true,
      errors: { mobilityAids: { otherRequirement: "Required" } },
    }));
    const renderer = createRenderer();

    renderer.render(<MobilityAidsQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
