import { render, screen } from "@testing-library/react";

import CheckboxContainer from "./CheckboxContainer";

describe("CheckboxContainer", () => {
  it("wraps children that are passed in", () => {
    render(
      <CheckboxContainer>
        <label htmlFor="checkbox">Test Checkbox</label>
        <input id="checkbox" type="checkbox" />
      </CheckboxContainer>
    );

    expect(screen.getByText("Test Checkbox")).toBeDefined();
    expect(
      screen.getByText("Test Checkbox").parentElement.className
    ).not.toContain("wmrards-fe-group--error");
  });

  it("indicates an error if tangible error passed in", () => {
    render(
      <CheckboxContainer error="An Error Occurred">
        <label htmlFor="checkbox">Test Checkbox</label>
        <input id="checkbox" type="checkbox" />
      </CheckboxContainer>
    );

    expect(screen.getByText("Test Checkbox").parentElement.className).toContain(
      "wmrards-fe-group--error"
    );
  });

  it("shows description if passed in", () => {
    const { container } = render(
      <CheckboxContainer description="Check box description">
        <label htmlFor="checkbox">Test Checkbox</label>
        <input id="checkbox" type="checkbox" />
      </CheckboxContainer>
    );

    expect(
      container.getElementsByClassName("wmrards-fe-checkboxes__desc")[0]
        .innerHTML
    ).toEqual("Check box description");
  });
});
