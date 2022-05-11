import { render, screen, fireEvent } from "@testing-library/react";

import ButtonLink from "./ButtonLink";

describe("ButtonLink", () => {
  it("wraps children that are passed in", () => {
    render(<ButtonLink>Button Link Text</ButtonLink>);

    expect(screen.getByText("Button Link Text")).toBeDefined();
  });

  it("invokes callback when clicked on", () => {
    const mockCallback = jest.fn();

    render(<ButtonLink callback={mockCallback}>Button Link Text</ButtonLink>);

    const buttonLink = screen.getByRole("button");

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(buttonLink);

    expect(mockCallback).toBeCalledTimes(1);
  });
});
