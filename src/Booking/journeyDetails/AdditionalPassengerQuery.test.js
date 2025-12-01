import { render, fireEvent } from "@testing-library/react";

import AdditionalPassengerQuery from "./AdditionalPassengerQuery";
import FormWrapper from "../../common/FormWrapper";

describe("AdditionalPassengerQuery", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <AdditionalPassengerQuery setAdditionalPassenger={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmnds-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[1]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("no");
  });
});
