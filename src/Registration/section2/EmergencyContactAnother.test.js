import { render, fireEvent } from "@testing-library/react";

import EmergencyContactAnother from "./EmergencyContactAnother";
import FormWrapper from "../../common/FormWrapper";

describe("EmergencyContactAnother", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <EmergencyContactAnother setEmergencyContactAnother={mockCallback} />
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
});
