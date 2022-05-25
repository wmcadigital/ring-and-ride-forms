import { render, fireEvent } from "@testing-library/react";

import BookingParty from "./BookingParty";
import FormWrapper from "../../common/FormWrapper";

describe("BookingParty", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <BookingParty setBookingParty={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[2]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("behalfGroup");
  });
});
