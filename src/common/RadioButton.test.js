import { render, screen, fireEvent } from "@testing-library/react";

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

  it("clicking the radio button will invoke callback if provided", () => {
    const mockOnClickCallback = jest.fn();

    render(
      <FormWrapper>
        <RadioButton
          fieldName="radio-group"
          label="Radio Label"
          value="value-1"
          onClickCallback={mockOnClickCallback}
        />
      </FormWrapper>
    );

    const radioButton = screen.getByRole("radio");

    expect(mockOnClickCallback).toBeCalledTimes(0);

    fireEvent.click(radioButton);

    expect(mockOnClickCallback).toBeCalledTimes(1);
  });
});
