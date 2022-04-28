import { BrowserRouter } from "react-router-dom";
import { createRenderer } from "react-test-renderer/shallow";
import { screen, render, fireEvent } from "@testing-library/react";

import OutsideWmca from "./OutsideWmca";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/",
    state: { formValues: { name: "Test" } },
  }),
  useNavigate: () => mockNavigate,
}));

describe("OutsideWmca", () => {
  it("renders the page as expected", () => {
    const renderer = createRenderer();

    renderer.render(
      <BrowserRouter>
        <OutsideWmca />
      </BrowserRouter>
    );

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("clicking back will navigate to registration form with form state", () => {
    render(
      <BrowserRouter>
        <OutsideWmca />
      </BrowserRouter>
    );

    const backLink = screen.getByText("< Back");

    expect(mockNavigate).toBeCalledTimes(0);

    fireEvent.click(backLink);

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith("/registration", {
      state: { formValues: { name: "Test" } },
      replace: true,
    });
  });
});
