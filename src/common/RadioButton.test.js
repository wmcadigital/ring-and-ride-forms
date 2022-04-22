import { render, screen } from "@testing-library/react";

import FormWrapper from "./FormWrapper";
import RadioButton from "./RadioButton";

describe("RadioButton", () => {
  it("renders radio button appropriately", () => {
    render(
      <FormWrapper>
        <RadioButton
          fieldName="radio-group"
          label="Radio Label"
          value="value-1"
          formValues={{}}
        />
      </FormWrapper>
    );

    const radioButton = screen.getByRole("radio");
    expect(radioButton.getAttribute("name")).toEqual("radio-group");
    expect(radioButton.getAttribute("checked")).toBeNull();
    expect(screen.getByText("Radio Label")).toBeDefined();
  });

  it("renders checked radio button", () => {
    render(
      <FormWrapper>
        <RadioButton
          fieldName="radio-group"
          label="Radio Label"
          value="value-1"
          formValues={{ "radio-group": "value-1" }}
        />
      </FormWrapper>
    );

    const radioButton = screen.getByRole("radio");
    expect(radioButton.getAttribute("checked")).not.toBeNull();
  });
});
