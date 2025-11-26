import { render, screen } from "@testing-library/react";

import RadioGroup from "./RadioGroup";

describe("RadioGroup", () => {
  it("wraps children that are passed in", () => {
    render(
      <RadioGroup>
        <label htmlFor="radio">Test Radio Button</label>
        <input id="radio" type="radio" />
      </RadioGroup>
    );

    expect(screen.getByText("Test Radio Button")).toBeDefined();
  });

  it("indicates an error if tangible error passed in", () => {
    render(
      <RadioGroup error="Error occurred">
        <label htmlFor="radio">Test Radio Button</label>
        <input id="radio" type="radio" />
      </RadioGroup>
    );

    expect(
      screen.getByText("Test Radio Button").parentElement.className
    ).toContain("wmnds-fe-group--error");
  });
});
