import { render, screen, fireEvent } from "@testing-library/react";

import PassengerDetails from "./PassengerDetails";
import FormWrapper from "../../common/FormWrapper";

describe("PassengerDetails", () => {
  it("renders 3 fields (first name, last name, registration no.) and a continue button", () => {
    render(
      <FormWrapper>
        <PassengerDetails />
      </FormWrapper>
    );

    const inputFields = screen.getAllByRole("textbox");

    expect(inputFields.length).toBe(3);
    expect(inputFields[0].parentElement.children[0].innerHTML).toEqual(
      "First Name"
    );
    expect(inputFields[1].parentElement.children[0].innerHTML).toEqual(
      "Last Name"
    );
    expect(inputFields[2].parentElement.children[0].innerHTML).toContain(
      "Registration number"
    );

    const button = screen.getByRole("button");

    expect(button.innerHTML).toEqual("Continue");
  });

  it("clicking continue will invoke add passenger if index is -1", () => {
    const mockAddPassengerToList = jest.fn();
    const mockChangePassengerInList = jest.fn();

    render(
      <FormWrapper
        initialValues={{
          pendingPassengerFirstName: "Test",
          pendingPassengerLastName: "Testerson",
          pendingRegistrationNo: "12345",
        }}
      >
        <PassengerDetails
          pendingPassengerIndex={-1}
          addPassengerToList={mockAddPassengerToList}
          changePassengerInList={mockChangePassengerInList}
        />
      </FormWrapper>
    );

    const continueButton = screen.getByRole("button");

    fireEvent.click(continueButton);

    expect(mockAddPassengerToList).toBeCalledTimes(1);
    expect(mockAddPassengerToList).toBeCalledWith("Test", "Testerson", "12345");
  });

  it("clicking continue will invoke change passenger if index is NOT -1", () => {
    const mockAddPassengerToList = jest.fn();
    const mockChangePassengerInList = jest.fn();

    render(
      <FormWrapper
        initialValues={{
          pendingPassengerFirstName: "Test",
          pendingPassengerLastName: "Testerson",
          pendingRegistrationNo: "12345",
        }}
      >
        <PassengerDetails
          pendingPassengerIndex={5}
          addPassengerToList={mockAddPassengerToList}
          changePassengerInList={mockChangePassengerInList}
        />
      </FormWrapper>
    );

    const continueButton = screen.getByRole("button");

    fireEvent.click(continueButton);

    expect(mockChangePassengerInList).toBeCalledTimes(1);
    expect(mockChangePassengerInList).toBeCalledWith(
      "Test",
      "Testerson",
      "12345",
      5
    );
  });

  it("clicking continue will trigger validation and show error if field(s) failed validation", () => {
    const mockAddPassengerToList = jest.fn();
    const mockChangePassengerInList = jest.fn();

    render(
      <FormWrapper
        initialValues={{
          pendingPassengerLastName: "Testerson",
          pendingRegistrationNo: "12345",
        }}
      >
        <PassengerDetails
          pendingPassengerIndex={5}
          addPassengerToList={mockAddPassengerToList}
          changePassengerInList={mockChangePassengerInList}
        />
      </FormWrapper>
    );

    const continueButton = screen.getByRole("button");

    fireEvent.click(continueButton);

    expect(mockChangePassengerInList).toBeCalledTimes(0);

    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields[0].parentElement.children[1].innerHTML).toEqual(
      "Required"
    );
  });

  it("gives a validation error if the registration number is already in the passenger list", () => {
    render(
      <FormWrapper
        initialValues={{
          pendingPassengerLastName: "Testerson",
          pendingRegistrationNo: "12345",
          passengers: [
            {
              firstName: "Passenger 1",
              lastName: "Test",
              registrationNo: "12345",
            },
          ],
        }}
      >
        <PassengerDetails
          pendingPassengerIndex={5}
          checkForDuplicates={() => "Duplicate"}
        />
      </FormWrapper>
    );

    const continueButton = screen.getByRole("button");

    fireEvent.click(continueButton);

    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields[2].parentElement.children[1].innerHTML).toEqual(
      "Duplicate"
    );
  });

  it("displays different heading when on the summary page", () => {
    const { container } = render(
      <FormWrapper>
        <PassengerDetails summaryPageMode />
      </FormWrapper>
    );

    const questionHeading = container.getElementsByClassName(
      "wmnds-fe-question"
    );
    expect(questionHeading.length).toBe(0);
    expect(screen.queryByText("Who will be using the service?")).toBeNull();
    expect(screen.queryByText("Add/Edit Passenger")).not.toBeNull();
  });
});
