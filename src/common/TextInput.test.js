import { render, screen } from "@testing-library/react";

import FormWrapper from "./FormWrapper";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("renders text input appropriately", () => {
    render(
      <FormWrapper>
        <TextInput fieldName="text-input" label="Text Input Label" />
      </FormWrapper>
    );

    const textInput = screen.getByRole("textbox");
    expect(textInput.getAttribute("name")).toEqual("text-input");
    expect(screen.getByText("Text Input Label")).toBeDefined();
  });

  it("show error if present", () => {
    render(
      <FormWrapper>
        <TextInput
          fieldName="text-input"
          label="Text Input Label"
          error="Error occurred"
        />
      </FormWrapper>
    );

    const textInput = screen.getByRole("textbox");
    expect(textInput.getAttribute("name")).toEqual("text-input");
    expect(screen.getByText("Text Input Label")).toBeDefined();
    expect(screen.getByText("Error occurred")).toBeDefined();
  });

  it("sets default value if present on first render", () => {
    render(
      <FormWrapper>
        <TextInput
          fieldName="text-input"
          label="Text Input Label"
          defaultValue="DEFAULT VALUE"
        />
      </FormWrapper>
    );

    const textInput = screen.getByRole("textbox");
    expect(textInput.getAttribute("value")).toEqual("DEFAULT VALUE");
  });
});
