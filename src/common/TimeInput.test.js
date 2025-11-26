import { screen, render } from "@testing-library/react";

import TimeInput from "./TimeInput";
import FormWrapper from "./FormWrapper";

describe("TimeInput", () => {
  it("consists of an label, and two drop down fields", () => {
    const { container } = render(
      <FormWrapper>
        <TimeInput prefix="test" label="Time Input Label" />
      </FormWrapper>
    );

    const labels = container.getElementsByClassName("wmnds-fe-label");
    expect(labels[0].innerHTML).toEqual("Time Input Label");

    const dropdowns = screen.getAllByRole("combobox");
    expect(dropdowns.length).toBe(2);
    expect(dropdowns[0].getAttribute("name")).toEqual("test.hour");
    expect(dropdowns[1].getAttribute("name")).toEqual("test.minute");
  });

  it("the label is optional", () => {
    const { container } = render(
      <FormWrapper>
        <TimeInput prefix="test" />
      </FormWrapper>
    );

    const labels = container.getElementsByClassName("wmnds-fe-label");
    expect(labels.length).toBe(0);
  });

  it("if passed in an error is displayed", () => {
    render(
      <FormWrapper>
        <TimeInput prefix="test" error="An error occurred" />
      </FormWrapper>
    );

    expect(screen.getByText("An error occurred")).toBeDefined();
  });
});
