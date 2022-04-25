import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import EnquiryTypeQuery from "./EnquiryTypeQuery";

jest.mock("react-final-form");

describe("EnquiryTypeQuery", () => {
  it("renders as expected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        enquiryType: "lostProperty",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EnquiryTypeQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {},
      submitFailed: true,
      errors: { enquiryType: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<EnquiryTypeQuery />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
