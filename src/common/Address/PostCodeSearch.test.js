import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PostCodeSearch from "./PostCodeSearch";
import FormWrapper from "../FormWrapper";

describe("PostCodeSearch", () => {
  it("with no value it renders with 'Find Address' button disabled", () => {
    const { container } = render(
      <FormWrapper>
        <PostCodeSearch prefix="test" />
      </FormWrapper>
    );

    const labels = container.getElementsByClassName("wmnds-fe-label");
    expect(labels[0].innerHTML).toEqual("Postcode");

    const findAddressButton = screen.getByRole("button");
    expect(findAddressButton.innerHTML).toEqual("Find Address");
    expect(findAddressButton.getAttributeNames()).toContain("disabled");
  });

  it("with an invalid value 'Find Address' button is disabled", async () => {
    render(
      <FormWrapper>
        <PostCodeSearch prefix="test" />
      </FormWrapper>
    );

    const postcodeInput = screen.getByRole("textbox");
    await waitFor(() => userEvent.type(postcodeInput, "B16 879898"));

    const findAddressButton = screen.getByRole("button");
    expect(findAddressButton.getAttributeNames()).toContain("disabled");
  });

  it("with an valid value 'Find Address' button is enabled", async () => {
    render(
      <FormWrapper>
        <PostCodeSearch prefix="test" />
      </FormWrapper>
    );

    const postcodeInput = screen.getByRole("textbox");
    await waitFor(() => userEvent.type(postcodeInput, "B16 7YH"));

    const findAddressButton = screen.getByRole("button");
    expect(findAddressButton.getAttributeNames()).not.toContain("disabled");
  });

  it("clicking on 'Find Address' button will make call to getAddresses", async () => {
    const mockGetAddresses = jest.fn();

    render(
      <FormWrapper>
        <PostCodeSearch prefix="test" getAddresses={mockGetAddresses} />
      </FormWrapper>
    );

    const postcodeInput = screen.getByRole("textbox");
    await waitFor(() => userEvent.type(postcodeInput, "B16 7YH"));

    const findAddressButton = screen.getByRole("button");
    fireEvent.click(findAddressButton);
    expect(mockGetAddresses).toBeCalledTimes(1);
    expect(mockGetAddresses).toBeCalledWith("B16 7YH");
  });

  it("passing loading prop should show loading indicator on button and also disable that button", () => {
    render(
      <FormWrapper>
        <PostCodeSearch prefix="test" loading />
      </FormWrapper>
    );

    const findAddressButton = screen.getByRole("button");
    expect(
      findAddressButton.getElementsByClassName("wmnds-loader")
    ).toBeDefined();
    expect(findAddressButton.getAttributeNames()).toContain("disabled");
  });

  it("passing error prop should show error", () => {
    render(
      <FormWrapper>
        <PostCodeSearch prefix="test" error="Invalid" />
      </FormWrapper>
    );

    expect(screen.getByText("Invalid")).toBeDefined();
  });
});
