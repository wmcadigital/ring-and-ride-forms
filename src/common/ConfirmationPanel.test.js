import { render, screen } from "@testing-library/react";

import ConfirmationPanel from "./ConfirmationPanel";

describe("ConfirmationPanel", () => {
  it("wraps header that is passed in", () => {
    render(<ConfirmationPanel header="Panel Heading" />);

    const header = screen.getByRole("heading");

    expect(header.innerHTML).toEqual("Panel Heading");
  });

  it("wraps optional info text that is passed in", () => {
    const { container } = render(
      <ConfirmationPanel header="Panel Heading" info="Panel info" />
    );

    const infoElements = container.getElementsByClassName(
      "wmnds-msg-summary__info"
    );

    expect(infoElements[0].innerHTML).toEqual("Panel info");
  });
});
