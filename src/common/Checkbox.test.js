import { render, screen, fireEvent } from "@testing-library/react";

import FormWrapper from "./FormWrapper";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox with a label", () => {
    render(
      <FormWrapper>
        <Checkbox fieldName="Field" label="Label" />
      </FormWrapper>
    );

    expect(screen.queryAllByRole("checkbox").length).toBe(1);
    expect(screen.getByRole("checkbox").getAttribute("name")).toEqual("Field");
    expect(screen.getByText("Label")).toBeDefined();
  });

  it("renders a checkbox with a label that is markup", () => {
    render(
      <FormWrapper>
        <Checkbox fieldName="Field" label={<h1>Label</h1>} />
      </FormWrapper>
    );

    const headingLabel = screen.getByRole("heading");
    expect(headingLabel.innerHTML).toEqual("Label");
  });

  it("checkbox will be checked/unchecked on click", () => {
    render(
      <FormWrapper>
        <Checkbox fieldName="Field" label="Label" />
      </FormWrapper>
    );

    const checkBox = screen.getByRole("checkbox");
    expect(checkBox.checked).toBe(false);
    fireEvent.click(checkBox);
    expect(checkBox.checked).toBe(true);
    fireEvent.click(checkBox);
    expect(checkBox.checked).toBe(false);
  });
});
