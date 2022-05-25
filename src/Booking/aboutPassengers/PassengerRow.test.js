import { render, screen, fireEvent } from "@testing-library/react";

import PassengerRow from "./PassengerRow";

describe("PassengerRow", () => {
  it("displays a row of passenger data with edit and delete buttons", () => {
    render(
      <table>
        <tbody>
          <PassengerRow fullName="Test Testerson" registrationNo="12345" />
        </tbody>
      </table>
    );

    const tableCells = screen.getAllByRole("cell");

    expect(tableCells[0].innerHTML).toEqual("Test Testerson");
    expect(tableCells[1].innerHTML).toEqual("12345");

    const buttons = tableCells[2].children[0].children;

    expect(buttons[0].nodeName).toEqual("BUTTON");
    expect(buttons[0].innerHTML).toEqual("Change");

    expect(buttons[1].nodeName).toEqual("BUTTON");
    expect(buttons[1].innerHTML).toContain("Remove Passenger");
  });

  it("invokes callbacks when relevant buttons are clicked", () => {
    const mockChangePassenger = jest.fn();
    const mockRemovePassenger = jest.fn();

    render(
      <table>
        <tbody>
          <PassengerRow
            fullName="Test Testerson"
            registrationNo="12345"
            changeCallBack={mockChangePassenger}
            removeCallBack={mockRemovePassenger}
          />
        </tbody>
      </table>
    );

    const buttons = screen.getAllByRole("button");

    expect(mockChangePassenger).toBeCalledTimes(0);
    expect(mockRemovePassenger).toBeCalledTimes(0);

    fireEvent.click(buttons[0]);

    expect(mockChangePassenger).toBeCalledTimes(1);

    fireEvent.click(buttons[1]);

    expect(mockRemovePassenger).toBeCalledTimes(1);
  });
});
