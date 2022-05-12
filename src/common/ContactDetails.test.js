import { render, screen } from "@testing-library/react";

import ContactDetails from "./ContactDetails";

describe("ContactDetails", () => {
  it("wraps children that are passed in", () => {
    render(
      <ContactDetails>
        <p>Transport for West Midlands</p>
      </ContactDetails>
    );

    expect(screen.getByText("Transport for West Midlands")).toBeDefined();
  });
});
