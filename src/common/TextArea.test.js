import { render, screen } from "@testing-library/react";

import FormWrapper from "./FormWrapper";
import TextArea from "./TextArea";

describe("TextArea", () => {
  it("renders text area appriopriately", () => {
    render(
      <FormWrapper>
        <TextArea fieldName="text-area" />
      </FormWrapper>
    );

    const textArea = screen.getByRole("textbox");
    expect(textArea.getAttribute("name")).toEqual("text-area");
  });
});
