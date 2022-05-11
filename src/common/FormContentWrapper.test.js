import { render, screen } from "@testing-library/react";

import FormContentWrapper from "./FormContentWrapper";

describe("FormContentWrapper", () => {
  it("wraps children that are passed in", () => {
    render(
      <FormContentWrapper>
        <div>Dummy Form Contents</div>
      </FormContentWrapper>
    );

    expect(screen.getByText("Dummy Form Contents")).toBeDefined();
  });
});
