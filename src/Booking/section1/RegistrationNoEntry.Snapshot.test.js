import { useFormState } from "react-final-form";
import { create } from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import RegistrationNoEntry from "./RegistrationNoEntry";

jest.mock("react-final-form");

describe("RegistrationNoEntry - snap shots", () => {
  it("individual is filling out form for themselves", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
    }));
    const renderer = create(
      <BrowserRouter>
        <RegistrationNoEntry />
      </BrowserRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "behalfSomeone",
        firstName: "John",
      },
    }));
    const renderer = create(
      <BrowserRouter>
        <RegistrationNoEntry />
      </BrowserRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        bookingParty: "mySelf",
      },
      submitFailed: true,
      errors: { registrationNo: "Required" },
    }));
    const renderer = create(
      <BrowserRouter>
        <RegistrationNoEntry />
      </BrowserRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
