import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import RegistrationNoEntry from "./RegistrationNoEntry";
import FormWrapper from "../../common/FormWrapper";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("RegistrationNoEntry", () => {
  it("redirects to help page if user clicks on forgotten registration no. link", () => {
    render(
      <BrowserRouter>
        <FormWrapper initialValues={{ firstName: "Joe", lastName: "Blogs" }}>
          <RegistrationNoEntry orderNo={2} />
        </FormWrapper>
      </BrowserRouter>
    );

    const buttonLink = screen.getByRole("button");

    expect(mockNavigate).toBeCalledTimes(0);

    fireEvent.click(buttonLink);

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith("/booking/forgotRegistration", {
      state: {
        formValues: { firstName: "Joe", lastName: "Blogs" },
        orderNo: 2,
      },
      replace: true,
    });
  });
});
