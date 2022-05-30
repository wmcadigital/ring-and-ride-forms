import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import CheckAnswers from "./CheckAnswers";

jest.mock("react-final-form");

const formApiReturn = {
  values: {
    enquiryDetail: "test enquiry details",
    firstName: "Tester",
    lastName: "Testerson",
    registrationNo: "12345",
    emailContact: true,
    emailAddress: "test@testerson.com",
    phoneContact: true,
    phoneNo: "0900 555 8888",
  },
};

describe("CheckAnswers", () => {
  it("renders CheckAnswers correctly", () => {
    useFormState.mockImplementationOnce(() => formApiReturn);
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers with an error if present", () => {
    const formApiReturnWithError = {
      ...formApiReturn,
      submitFailed: true,
      errors: { legal: "Required" },
    };
    useFormState.mockImplementationOnce(() => formApiReturnWithError);
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers with a form submit error if passed as a prop", () => {
    useFormState.mockImplementationOnce(() => formApiReturn);
    const renderer = createRenderer();

    renderer.render(
      <CheckAnswers formSubmitError="An error occurred when submitting the form data" />
    );

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
