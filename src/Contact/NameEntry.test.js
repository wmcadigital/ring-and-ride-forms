import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import NameEntry from "./NameEntry";

jest.mock("react-final-form");

describe("NameEntry", () => {
  it("renders as expected", () => {
    useFormState.mockImplementationOnce(() => ({}));
    const renderer = createRenderer();

    renderer.render(<NameEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      submitFailed: true,
      errors: { firstName: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<NameEntry />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
