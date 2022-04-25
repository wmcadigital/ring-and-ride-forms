import { render, screen } from "@testing-library/react";

import Question from "./Question";

describe("Question", () => {
  it("renders question appropriately", () => {
    render(<Question text="What is your name?" />);

    const heading = screen.getByRole("heading");

    expect(heading.innerHTML).toEqual("What is your name?");
  });
});
