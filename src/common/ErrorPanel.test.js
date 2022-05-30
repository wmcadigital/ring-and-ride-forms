import { render, screen } from "@testing-library/react";

import ErrorPanel from "./ErrorPanel";

describe("ErrorPanel", () => {
  it("wraps message that is passed in", () => {
    render(<ErrorPanel message="An error occurred!!!!" />);

    expect(screen.getByText("An error occurred!!!!")).toBeDefined();
  });
});
