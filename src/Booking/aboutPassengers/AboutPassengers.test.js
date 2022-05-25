import { render, screen } from "@testing-library/react";

import AboutPassengers from "./AboutPassengers";
import FormWrapper from "../../common/FormWrapper";

describe("About Passengers", () => {
  it("shows passenger list if there are passengers on the list", () => {
    render(
      <FormWrapper
        initialValues={{
          passengers: [
            {
              firstName: "Test",
              lastName: "Testerson",
              registrationNo: "12345",
            },
          ],
        }}
        mutators={{
          setFormAttribute: () => {},
        }}
      >
        <AboutPassengers />
      </FormWrapper>
    );

    expect(screen.getByText("Passengers")).toBeDefined();
  });

  it("shows passenger details if there are NO passengers on the list", () => {
    render(
      <FormWrapper
        initialValues={{
          passengers: [],
        }}
        mutators={{
          setFormAttribute: () => {},
        }}
      >
        <AboutPassengers />
      </FormWrapper>
    );

    expect(screen.queryByText("Passengers")).toBeNull();
    expect(screen.getByText("Who will be using the service?")).toBeDefined();
  });

  it("adds user to passenger list if they indicated they wanted to be included", () => {
    const mockSetFormAttribute = jest.fn();

    render(
      <FormWrapper
        initialValues={{
          passengers: [],
          firstName: "Test",
          lastName: "Testerson",
          includeInGroupBooking: "yes",
          registrationNo: "12345",
        }}
        mutators={{
          setFormAttribute: mockSetFormAttribute,
        }}
      >
        <AboutPassengers />
      </FormWrapper>
    );

    expect(mockSetFormAttribute).toBeCalledTimes(4);
    expect(mockSetFormAttribute.mock.calls[0][0]).toEqual([
      "pendingPassengerFirstName",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[1][0]).toEqual([
      "pendingPassengerLastName",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[2][0]).toEqual([
      "pendingRegistrationNo",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[3][0]).toEqual([
      "passengers",
      [
        {
          firstName: "Test",
          lastName: "Testerson",
          registrationNo: "12345",
        },
      ],
    ]);
  });

  it("does NOT add user to passenger list if they don't want to be included", () => {
    const mockSetFormAttribute = jest.fn();

    render(
      <FormWrapper
        initialValues={{
          passengers: [],
          firstName: "Test",
          lastName: "Testerson",
          includeInGroupBooking: "no",
          registrationNo: "12345",
        }}
        mutators={{
          setFormAttribute: mockSetFormAttribute,
        }}
      >
        <AboutPassengers />
      </FormWrapper>
    );

    expect(mockSetFormAttribute).toBeCalledTimes(3);
    expect(mockSetFormAttribute.mock.calls[0][0]).toEqual([
      "pendingPassengerFirstName",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[1][0]).toEqual([
      "pendingPassengerLastName",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[2][0]).toEqual([
      "pendingRegistrationNo",
      "",
    ]);
  });

  it("does NOT add user to return passenger list regardless", () => {
    const mockSetFormAttribute = jest.fn();

    render(
      <FormWrapper
        initialValues={{
          passengers: [],
          returnPassengers: [],
          firstName: "Test",
          lastName: "Testerson",
          includeInGroupBooking: "yes",
          registrationNo: "12345",
        }}
        mutators={{
          setFormAttribute: mockSetFormAttribute,
        }}
      >
        <AboutPassengers returnPassengers />
      </FormWrapper>
    );

    expect(mockSetFormAttribute).toBeCalledTimes(3);
    expect(mockSetFormAttribute.mock.calls[0][0]).toEqual([
      "pendingPassengerFirstName",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[1][0]).toEqual([
      "pendingPassengerLastName",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[2][0]).toEqual([
      "pendingRegistrationNo",
      "",
    ]);
  });

  it("does NOT add user to any passenger list if on summary page", () => {
    const mockSetFormAttribute = jest.fn();

    render(
      <FormWrapper
        initialValues={{
          passengers: [],
          returnPassengers: [],
          firstName: "Test",
          lastName: "Testerson",
          includeInGroupBooking: "yes",
          registrationNo: "12345",
        }}
        mutators={{
          setFormAttribute: mockSetFormAttribute,
        }}
      >
        <AboutPassengers summaryPageMode />
      </FormWrapper>
    );

    expect(mockSetFormAttribute).toBeCalledTimes(3);
    expect(mockSetFormAttribute.mock.calls[0][0]).toEqual([
      "pendingPassengerFirstName",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[1][0]).toEqual([
      "pendingPassengerLastName",
      "",
    ]);
    expect(mockSetFormAttribute.mock.calls[2][0]).toEqual([
      "pendingRegistrationNo",
      "",
    ]);
  });
});
