import { render, screen, fireEvent } from "@testing-library/react";

import DeleteButton from "./DeleteButton";

describe("DeleteButton", () => {
  it("wraps children that are passed in", () => {
    render(<DeleteButton>Delete Button Text</DeleteButton>);

    expect(screen.getByText("Delete Button Text")).toBeDefined();
  });

  it("invokes callback when clicked on", () => {
    const mockCallback = jest.fn();

    render(
      <DeleteButton callback={mockCallback}>Delete Button Text</DeleteButton>
    );

    const deleteButton = screen.getByRole("button");

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(deleteButton);

    expect(mockCallback).toBeCalledTimes(1);
  });
});
