import { render, screen } from "@testing-library/react";

import BreadCrumb from "./BreadCrumb";

describe("BreadCrumb", () => {
  it("should show links to home and current page", () => {
    render(<BreadCrumb currentPageName="Current Page" />);

    const links = screen.getAllByRole("link");

    expect(links[0].innerHTML).toEqual("Home");
    expect(links[1].innerHTML).toEqual("Current Page");
  });
});
