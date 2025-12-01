import { render, fireEvent } from "@testing-library/react";

import OutwardCollectionAddress from "./OutwardCollectionAddress";
import FormWrapper from "../../common/FormWrapper";

describe("OutwardCollectionAddress", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <OutwardCollectionAddress setOutwardCollectionAddress={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmnds-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[0]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("registered");
  });

  it("clicking on a radio button for other will invoke goToPage with null", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <OutwardCollectionAddress setGoToPage={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmnds-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[1]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith(null);
  });
});
