import { render, screen } from "@testing-library/react";

import FormSection from "./FormSection";

describe("FormSection", () => {
  it("wraps children that are passed in", () => {
    render(
      <FormSection>
        <div>Child Element</div>
      </FormSection>
    );

    expect(screen.getByText("Child Element")).toBeDefined();
    expect(
      screen.getByText("Child Element").parentElement.className
    ).not.toContain("wmnds-fe-group--error");
  });

  it("indicates an error if tangible error passed in", () => {
    render(
      <FormSection error="Error occurred">
        <div>Child Element</div>
      </FormSection>
    );

    expect(screen.getByText("Child Element").parentElement.className).toContain(
      "wmnds-fe-group--error"
    );
  });
});
