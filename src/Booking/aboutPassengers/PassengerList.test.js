import { render, screen, fireEvent } from "@testing-library/react";

import PassengerList from "./PassengerList";

const mockPassengers = [
  { firstName: "John", lastName: "Doe", registrationNo: "12345" },
  { firstName: "Jane", lastName: "Doe", registrationNo: "54321" },
  { firstName: "Test", lastName: "Testerson", registrationNo: "90008" },
];

describe("PassengerList", () => {
  it("renders x rows of passengers if x number of passengers is passed in", () => {
    render(<PassengerList passengers={mockPassengers} />);

    const tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toBe(4);
  });

  it("invokes add passenger callback when add button is clicked", () => {
    const mockAddPassenger = jest.fn();

    render(<PassengerList addCallBack={mockAddPassenger} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(mockAddPassenger).toBeCalledTimes(1);
  });

  it("invokes change passenger callback when change button is clicked", () => {
    const mockChangePassenger = jest.fn();

    render(
      <PassengerList
        passengers={mockPassengers}
        changeCallBack={mockChangePassenger}
      />
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons[0].innerHTML).toEqual("Change");

    fireEvent.click(buttons[0]);

    expect(mockChangePassenger).toBeCalledTimes(1);
    expect(mockChangePassenger).toBeCalledWith("John", "Doe", "12345", 0);
  });

  it("invokes remove passenger callback when remove button is clicked", () => {
    const mockRemovePassenger = jest.fn();

    render(
      <PassengerList
        passengers={mockPassengers}
        removeCallBack={mockRemovePassenger}
      />
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons[1].innerHTML).toContain("Remove Passenger");

    fireEvent.click(buttons[1]);

    expect(mockRemovePassenger).toBeCalledTimes(1);
    expect(mockRemovePassenger).toBeCalledWith(0);
  });

  it("displays 'Passengers' in title on outward leg", () => {
    render(<PassengerList passengers={mockPassengers} />);

    const heading = screen.getByRole("heading");

    expect(heading.innerHTML).toEqual("Passengers");
  });

  it("displays 'Add another passenger or continue to the next question.' on outward leg", () => {
    render(<PassengerList passengers={mockPassengers} />);

    const text = screen.getByText(
      "Add another passenger or continue to the next question."
    );

    expect(text).toBeDefined();
  });

  it("displays 'Return passengers' in title on return leg", () => {
    render(<PassengerList passengers={mockPassengers} returnPassengers />);

    const heading = screen.getByRole("heading");

    expect(heading.innerHTML).toEqual("Return passengers");
  });

  it("displays 'Add or remove a passenger from the list.' on return leg", () => {
    render(<PassengerList passengers={mockPassengers} returnPassengers />);

    const text = screen.getByText("Add or remove a passenger from the list.");

    expect(text).toBeDefined();
  });

  it("displays no prompt text, no question heading and no Continue button on summary page ", () => {
    const { container } = render(
      <PassengerList passengers={mockPassengers} summaryPageMode />
    );

    const text = screen.queryByText(
      "Add another passenger or continue to the next question."
    );

    expect(text).toBeNull();
    const questionHeading = container.getElementsByClassName(
      "wmnds-fe-question"
    );
    expect(questionHeading.length).toBe(0);
    const buttons = screen.getAllByRole("button");
    expect(buttons[buttons.length - 1].innerHTML).toEqual("Add Passenger");
  });

  it(
    "displays different heading for passengers if there is " +
      "an instance of the same component on the page",
    () => {
      render(
        <PassengerList
          passengers={mockPassengers}
          summaryPageMode
          anotherFormPresent
        />
      );

      const heading = screen.getByRole("heading");

      expect(heading.innerHTML).toEqual("Outward journey passengers");
    }
  );

  it(
    "displays different heading for return passengers if there is " +
      "an instance of the same component on the page",
    () => {
      render(
        <PassengerList
          passengers={mockPassengers}
          summaryPageMode
          anotherFormPresent
          returnPassengers
        />
      );

      const heading = screen.getByRole("heading");

      expect(heading.innerHTML).toEqual("Return journey passengers");
    }
  );
});
