import { render, screen } from "@testing-library/react";

import TextAreaContainer from "./TextAreaContainer";

describe("TextAreaContainer", () => {
  it("wraps children that are passed in", () => {
    render(
      <TextAreaContainer>
        <label htmlFor="textarea">Text Area Input</label>
        <textarea id="textarea" />
      </TextAreaContainer>
    );

    expect(screen.getByText("Text Area Input")).toBeDefined();
  });
});
