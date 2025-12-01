import { render, screen } from "@testing-library/react";

import FormWrapper from "./FormWrapper";
import TextArea from "./TextArea";

describe("TextArea", () => {
  it("renders text area appriopriately with no label", () => {
    const { container } = render(
      <FormWrapper>
        <TextArea fieldName="text-area" />
      </FormWrapper>
    );

    const textArea = screen.getByRole("textbox");
    expect(textArea.getAttribute("name")).toEqual("text-area");
    expect(
      container.getElementsByClassName("wmnds-fe-label")[0]
    ).not.toBeDefined();
  });

  it("renders text area appriopriately with label", () => {
    const { container } = render(
      <FormWrapper>
        <TextArea fieldName="text-area" label="text-label" />
      </FormWrapper>
    );

    const textArea = screen.getByRole("textbox");
    expect(textArea.getAttribute("name")).toEqual("text-area");
    expect(
      container.getElementsByClassName("wmnds-fe-label")[0]
    ).toBeDefined();
  });

  it("show error if present", () => {
    render(
      <FormWrapper>
        <TextArea fieldName="text-input" error="Error occurred" />
      </FormWrapper>
    );

    expect(screen.getByText("Error occurred")).toBeDefined();
  });
});
