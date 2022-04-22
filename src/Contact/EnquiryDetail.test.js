import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import EnquiryDetail from "./EnquiryDetail";

jest.mock("react-final-form");

describe("EnquiryDetail", () => {
  it("renders as expected", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        enquiryType: "lostProperty",
        enquiryDetail: "test enquiry details",
      },
    }));
    const renderer = createRenderer();

    renderer.render(<EnquiryDetail />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        enquiryType: "lostProperty",
      },
      submitFailed: true,
      errors: { enquiryDetail: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<EnquiryDetail />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
