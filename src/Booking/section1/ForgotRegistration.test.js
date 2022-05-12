import { BrowserRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import { screen, render, fireEvent } from "@testing-library/react";

import ForgotRegistration from "./ForgotRegistration";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: { formValues: { name: "Test" } },
  }),
  useNavigate: () => mockNavigate,
}));

describe("ForgotRegistration", () => {
  it("renders the page as expected", () => {
    const renderer = create(
      <BrowserRouter>
        <ForgotRegistration />
      </BrowserRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it("clicking back will navigate to registration form with form state", () => {
    render(
      <BrowserRouter>
        <ForgotRegistration />
      </BrowserRouter>
    );

    const backLink = screen.getByText("< Back");

    expect(mockNavigate).toBeCalledTimes(0);

    fireEvent.click(backLink);

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith("/booking", {
      state: { formValues: { name: "Test" } },
      replace: true,
    });
  });
});
