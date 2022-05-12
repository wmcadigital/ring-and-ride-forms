import { render, screen, fireEvent } from "@testing-library/react";

import ReturnDestinationAddress from "./ReturnDestinationAddress";
import FormWrapper from "../../common/FormWrapper";

describe("ReturnDestinationAddress", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <ReturnDestinationAddress setReturnDestinationAddress={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[1]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("other");
  });

  it("clicking on the first radio button will reveal the outward collection address if group booking", () => {
    const { container } = render(
      <FormWrapper
        initialValues={{
          bookingParty: "behalfGroup",
          otherOutward: {
            addressLine1: "10 Test St",
            townOrCity: "TestVille",
            county: "West Midlands",
            postCode: "B19 2UJ",
          },
        }}
      >
        <ReturnDestinationAddress />
      </FormWrapper>
    );

    expect(screen.queryByText("10 Test St")).toBeNull();
    expect(screen.queryByText("TestVille")).toBeNull();
    expect(screen.queryByText("West Midlands")).toBeNull();
    expect(screen.queryByText("B19 2UJ")).toBeNull();

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );
    fireEvent.click(radioButtons[0]);

    expect(screen.queryByText("10 Test St")).not.toBeNull();
    expect(screen.queryByText("TestVille")).not.toBeNull();
    expect(screen.queryByText("West Midlands")).not.toBeNull();
    expect(screen.queryByText("B19 2UJ")).not.toBeNull();
  });

  it("clicking on a radio button for other will invoke goToPage with null", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <ReturnDestinationAddress setGoToPage={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[1]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith(null);
  });
});
