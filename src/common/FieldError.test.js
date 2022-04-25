import { render, screen } from "@testing-library/react";

import FieldError from "./FieldError";

describe("FieldError", () => {
  it("renders nothing if no text prop passed", () => {
    const { container } = render(<FieldError />);

    expect(container.innerHTML).toBe("");
  });

  it("shows error message when text prop is passed in", () => {
    const { container } = render(<FieldError text="error message" />);

    expect(container.innerHTML).not.toBe("");
    expect(screen.getByText("error message")).toBeDefined();
  });
});
