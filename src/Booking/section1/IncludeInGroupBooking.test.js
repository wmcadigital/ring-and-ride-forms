import { render, fireEvent } from "@testing-library/react";

import IncludeInGroupBooking from "./IncludeInGroupBooking";
import FormWrapper from "../../common/FormWrapper";

describe("IncludeInGroupBooking", () => {
  it("clicking on a radio button will invoke callback with value", () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <IncludeInGroupBooking setIncludeInGroupBooking={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[0]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("yes");
  });

  it("clicking the no radio button will clear the user from the passengers list", () => {
    const mockSetFormAttribute = jest.fn();

    const { container } = render(
      <FormWrapper
        initialValues={{
          registrationNo: "RegNo1",
          passengers: [
            {
              firstName: "Test",
              lastName: "Testerson",
              registrationNo: "RegNo1",
            },
          ],
        }}
        mutators={{
          setFormAttribute: mockSetFormAttribute,
        }}
      >
        <IncludeInGroupBooking setIncludeInGroupBooking={() => {}} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockSetFormAttribute).toBeCalledTimes(0);

    fireEvent.click(radioButtons[1]);

    expect(mockSetFormAttribute).toBeCalledTimes(1);
    expect(mockSetFormAttribute.mock.calls[0][0]).toEqual(["passengers", []]);
  });
});
