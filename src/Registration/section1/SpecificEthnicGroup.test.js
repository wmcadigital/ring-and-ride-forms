import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import SpecificEthnicGroup from "./SpecificEthnicGroup";

jest.mock("react-final-form");

describe("SpecificEthnicGroup - snapshots", () => {
  it("individual is filling out form for themselves - white", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        ethnicity: "white",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<SpecificEthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else - white", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        ethnicity: "white",
        firstName: "Test",
        lastName: "Testerson",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<SpecificEthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error - white", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        ethnicity: "white",
      },
      submitFailed: true,
      errors: { specificEthnicity: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<SpecificEthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for themselves - mixed", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        ethnicity: "mixed",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<SpecificEthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else - asian", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        ethnicity: "asian",
        firstName: "Test",
        lastName: "Testerson",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<SpecificEthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error - black", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        ethnicity: "black",
      },
      submitFailed: true,
      errors: { specificEthnicity: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<SpecificEthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else - other", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        ethnicity: "other",
        firstName: "Test",
        lastName: "Testerson",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<SpecificEthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
