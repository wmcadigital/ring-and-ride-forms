import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import FormWrapper from "../FormWrapper";
import Address from "./Address";
import fetchAddresses from "./api/fetchAddresses";

jest.mock("./api/fetchAddresses");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockAddresses = [
  { guid: "1", summary_line: "1 Test St" },
  { guid: "2", summary_line: "2 Test St" },
];

describe("Address", () => {
  it("shows error if fetch address service returns no addresses", async () => {
    fetchAddresses.mockImplementation(() => []);

    render(
      <BrowserRouter>
        <FormWrapper>
          <Address prefix="test" addressField="test-address-field" />
        </FormWrapper>
      </BrowserRouter>
    );

    const postcodeInput = screen.getByRole("textbox");
    await waitFor(() => userEvent.type(postcodeInput, "B16 7YH"));

    const searchButton = screen.getByRole("button");

    await waitFor(() => fireEvent.click(searchButton));

    await waitFor(() => expect(screen.getByText("Invalid")).toBeDefined());
  });

  it("diverts to Outside WMCA page if county is not West Midlands", async () => {
    fetchAddresses.mockImplementation(() => [{ county: "Not West Midlands" }]);

    render(
      <BrowserRouter>
        <FormWrapper>
          <Address prefix="test" checkInside orderNo={4} />
        </FormWrapper>
      </BrowserRouter>
    );

    const postcodeInput = screen.getByRole("textbox");
    await waitFor(() => userEvent.type(postcodeInput, "X16 7YH"));

    const searchButton = screen.getByRole("button");
    await waitFor(() => fireEvent.click(searchButton));

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith("/registration/outsideWmca", {
      state: {
        formValues: { test: { searchPostCode: "X16 7YH" } },
        orderNo: 4,
      },
      replace: true,
    });
  });

  it("sets callback to set addreses in state if api returns valid addresses", async () => {
    const mockSetAddresses = jest.fn();

    fetchAddresses.mockImplementation(() => mockAddresses);

    render(
      <BrowserRouter>
        <FormWrapper>
          <Address prefix="test" setAddresses={mockSetAddresses} />
        </FormWrapper>
      </BrowserRouter>
    );

    const postcodeInput = screen.getByRole("textbox");
    await waitFor(() => userEvent.type(postcodeInput, "B16 7YH"));

    const searchButton = screen.getByRole("button");
    await waitFor(() => fireEvent.click(searchButton));

    expect(mockSetAddresses).toBeCalledTimes(1);
    expect(mockSetAddresses).toBeCalledWith(mockAddresses);
  });

  it("should show post code search and hides address list if there are undefined valid addresses", () => {
    render(
      <BrowserRouter>
        <FormWrapper>
          <Address prefix="test" />
        </FormWrapper>
      </BrowserRouter>
    );

    const inputs = screen.queryAllByRole("textbox");
    expect(inputs.length).toBe(1);

    const selectControl = screen.queryByRole("combobox");
    expect(selectControl).toBe(null);
  });

  it("should hide post code search and show address list if there are valid addresses", () => {
    render(
      <BrowserRouter>
        <FormWrapper>
          <Address prefix="test" addresses={mockAddresses} />
        </FormWrapper>
      </BrowserRouter>
    );

    const inputs = screen.queryAllByRole("textbox");
    expect(inputs.length).toBe(0);

    const selectControl = screen.queryByRole("combobox");
    expect(selectControl).not.toBe(null);
  });

  it("should show address form if the address id is populated", () => {
    render(
      <BrowserRouter>
        <FormWrapper
          initialValues={{
            test: { addressId: "12345", searchPostCode: "B19 2BY" },
          }}
        >
          <Address prefix="test" addresses={mockAddresses} />
        </FormWrapper>
      </BrowserRouter>
    );

    const inputs = screen.queryAllByRole("textbox");
    expect(inputs.length).toBe(5);

    const selectControl = screen.queryByRole("combobox");
    expect(selectControl).toBe(null);
  });
});
