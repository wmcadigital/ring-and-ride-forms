import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import EthnicGroup from "./EthnicGroup";

jest.mock("react-final-form");

describe("EthnicGroup - snapshots", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EthnicGroup />);

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

    renderer.render(<EthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
      },
      submitFailed: true,
      errors: { ethnicity: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<EthnicGroup />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
