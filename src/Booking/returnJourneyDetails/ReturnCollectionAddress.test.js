import { render, screen, fireEvent } from "@testing-library/react";

import ReturnCollectionAddress from "./ReturnCollectionAddress";
import FormWrapper from "../../common/FormWrapper";

describe("ReturnCollectionAddress", () => {
  it("clicking on a radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <ReturnCollectionAddress setReturnCollectionAddress={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmnds-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[1]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("other");
  });

  it("clicking on the first radio button will reveal the outward destination address", () => {
    const { container } = render(
      <FormWrapper
        initialValues={{
          outwardDestination: {
            addressLine1: "10 Test St",
            townOrCity: "TestVille",
            county: "West Midlands",
            postCode: "B19 2UJ",
          },
        }}
      >
        <ReturnCollectionAddress />
      </FormWrapper>
    );

    expect(screen.queryByText("10 Test St")).toBeNull();
    expect(screen.queryByText("TestVille")).toBeNull();
    expect(screen.queryByText("West Midlands")).toBeNull();
    expect(screen.queryByText("B19 2UJ")).toBeNull();

    const radioButtons = container.getElementsByClassName(
      "wmnds-fe-radios__input"
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
        <ReturnCollectionAddress setGoToPage={mockCallback} />
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
