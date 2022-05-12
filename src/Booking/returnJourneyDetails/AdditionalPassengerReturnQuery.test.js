import { render, fireEvent } from "@testing-library/react";

import AdditionalPassengerReturnQuery from "./AdditionalPassengerReturnQuery";
import FormWrapper from "../../common/FormWrapper";

describe("AdditionalPassengerReturnQuery", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <AdditionalPassengerReturnQuery
          setAdditionalPassengerReturn={mockCallback}
        />
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
