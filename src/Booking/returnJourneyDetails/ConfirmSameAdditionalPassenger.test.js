import { render, fireEvent } from "@testing-library/react";

import ConfirmSameAdditionalPassenger from "./ConfirmSameAdditionalPassenger";
import FormWrapper from "../../common/FormWrapper";

describe("ConfirmSameAdditionalPassenger", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper
        mutators={{
          setFormAttribute: () => {},
        }}
      >
        <ConfirmSameAdditionalPassenger
          setConfirmSameAdditionalPassenger={mockCallback}
        />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmnds-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[2]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("alone");
  });

  it("clicking on a radio button will set form value for additional passengers on return leg", () => {
    const mockSetFormAttribute = jest.fn();

    const { container } = render(
      <FormWrapper
        initialValues={{
          additionalPassengerNumbers: 3,
        }}
        mutators={{
          setFormAttribute: mockSetFormAttribute,
        }}
      >
        <ConfirmSameAdditionalPassenger />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmnds-fe-radios__input"
    );

    fireEvent.click(radioButtons[0]);

    expect(mockSetFormAttribute.mock.calls[0][0]).toEqual([
      "additionalReturnPassengerNumbers",
      3,
    ]);

    fireEvent.click(radioButtons[1]);

    expect(mockSetFormAttribute.mock.calls[1][0]).toEqual([
      "additionalReturnPassengerNumbers",
      3,
    ]);

    fireEvent.click(radioButtons[2]);

    expect(mockSetFormAttribute.mock.calls[2][0]).toEqual([
      "additionalReturnPassengerNumbers",
      0,
    ]);
  });
});
