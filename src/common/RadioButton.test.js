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
        />
      </FormWrapper>
    );

    const radioButton = screen.getByRole("radio");
    expect(radioButton.getAttribute("name")).toEqual("radio-group");
    expect(radioButton.getAttributeNames()).not.toContain("checked");
    expect(screen.getByText("Radio Label")).toBeDefined();
  });

  it("renders checked radio button", async () => {
    render(
      <FormWrapper initialValues={{ "radio-group": "value-1" }}>
        <RadioButton
          fieldName="radio-group"
          label="Radio Label"
          value="value-1"
        />
      </FormWrapper>
    );

    const radioButton = screen.getByRole("radio");

    expect(radioButton.getAttributeNames()).toContain("checked");
  });
});
