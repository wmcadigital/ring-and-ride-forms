import { render, fireEvent } from "@testing-library/react";

import RegistrationIndividual from "./RegistrationIndividual";
import FormWrapper from "../../common/FormWrapper";

describe("RegistrationIndividual", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <RegistrationIndividual setRegisterForYourself={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[1]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("no");
  });
});
