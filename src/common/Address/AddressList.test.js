import { screen, render, fireEvent } from "@testing-library/react";

import AddressList from "./AddressList";
import FormWrapper from "../FormWrapper";

describe("AddressList", () => {
  it("should show searched for post code", () => {
    render(
      <FormWrapper>
        <AddressList prefix="test" searchPostCode="B19 2BY" />
      </FormWrapper>
    );

    expect(screen.getByText("B19 2BY")).toBeDefined();
  });

  it("should invoke callback when Change button clicked", () => {
    const mockChangeCallBack = jest.fn();

    render(
      <FormWrapper>
        <AddressList
          prefix="test"
          searchPostCode="B19 2BY"
          changePostCodeCallback={mockChangeCallBack}
        />
      </FormWrapper>
    );

    const changeButton = screen.getByText("Change");

    expect(mockChangeCallBack).toBeCalledTimes(0);

    fireEvent.click(changeButton);

    expect(mockChangeCallBack).toBeCalledTimes(1);
  });

  it("shows list of addresses", () => {
    const addressList = [
      { guid: "1", summary_line: "1 Test St" },
      { guid: "2", summary_line: "2 Test St" },
      { guid: "3", summary_line: "3 Test St" },
    ];

    const { container } = render(
      <FormWrapper>
        <AddressList
          prefix="test"
          searchPostCode="B19 2BY"
          addresses={addressList}
        />
      </FormWrapper>
    );

    const label = container.getElementsByClassName("wmnds-fe-label")[1];

    expect(label.innerHTML).toEqual("Select an address");

    const renderedOptions = screen.getAllByRole("option");

    expect(renderedOptions.length).toBe(4);
    expect(renderedOptions[0].getAttribute("value")).toEqual("");
    expect(renderedOptions[0].innerHTML).toEqual("3 addresses found");
    expect(renderedOptions[1].getAttribute("value")).toEqual("1");
    expect(renderedOptions[1].innerHTML).toEqual("1 Test St");
    expect(renderedOptions[2].getAttribute("value")).toEqual("2");
    expect(renderedOptions[2].innerHTML).toEqual("2 Test St");
    expect(renderedOptions[3].getAttribute("value")).toEqual("3");
    expect(renderedOptions[3].innerHTML).toEqual("3 Test St");
  });

  it("should show a link to set an address manually", () => {
    render(
      <FormWrapper>
        <AddressList prefix="test" />
      </FormWrapper>
    );

    expect(screen.getAllByRole("button")[1].innerHTML).toEqual(
      "I can't find my address in the list"
    );
  });
});
