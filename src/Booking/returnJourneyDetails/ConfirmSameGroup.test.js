import { render, fireEvent } from "@testing-library/react";

import ConfirmSameGroup from "./ConfirmSameGroup";
import FormWrapper from "../../common/FormWrapper";

const mockPassengers = [
  { firstName: "John", lastName: "Doe", registrationNo: "12345" },
  { firstName: "Jane", lastName: "Doe", registrationNo: "54321" },
  { firstName: "Test", lastName: "Testerson", registrationNo: "90008" },
];

describe("ConfirmSameGroup", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper
        mutators={{
          setFormAttribute: () => {},
        }}
      >
        <ConfirmSameGroup setGroupSameAsOutward={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    fireEvent.click(radioButtons[1]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("no");
  });

  it(
    "clicking on radio button will copy over passenger list " +
      "to return passenger list if return passenger list is empty",
    () => {
      const mockSetFormAttribute = jest.fn();

      const { container } = render(
        <FormWrapper
          initialValues={{
            passengers: mockPassengers,
          }}
          mutators={{
            setFormAttribute: mockSetFormAttribute,
          }}
        >
          <ConfirmSameGroup />
        </FormWrapper>
      );

      const radioButtons = container.getElementsByClassName(
        "wmrards-fe-radios__input"
      );

      fireEvent.click(radioButtons[0]);

      expect(mockSetFormAttribute).toBeCalledTimes(1);
      expect(mockSetFormAttribute.mock.calls[0][0]).toEqual([
        "returnPassengers",
        mockPassengers,
      ]);
    }
  );

  it(
    "clicking on radio button will NOT copy over passenger list " +
      "if return passenger list if return passenger list is NOT empty",
    () => {
      const mockSetFormAttribute = jest.fn();

      const { container } = render(
        <FormWrapper
          initialValues={{
            passengers: mockPassengers,
            returnPassengers: mockPassengers,
          }}
          mutators={{
            setFormAttribute: mockSetFormAttribute,
          }}
        >
          <ConfirmSameGroup />
        </FormWrapper>
      );

      const radioButtons = container.getElementsByClassName(
        "wmrards-fe-radios__input"
      );

      fireEvent.click(radioButtons[0]);

      expect(mockSetFormAttribute).toBeCalledTimes(0);
    }
  );
});
