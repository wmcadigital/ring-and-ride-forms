import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";
import FormWrapper from "./FormWrapper";

describe("Dropdown", () => {
  it("shows label if passed in", () => {
    const { container } = render(
      <FormWrapper>
        <Dropdown fieldName="test-field-name" label="Test Label" />
      </FormWrapper>
    );

    const label = container.getElementsByClassName("wmnds-fe-label")[0];

    expect(label.innerHTML).toEqual("Test Label");
  });

  it("displays prompt as first option", () => {
    render(
      <FormWrapper>
        <Dropdown fieldName="test-field-name" prompt="Select an option" />
      </FormWrapper>
    );

    const option = screen.getByRole("option");

    expect(option.getAttribute("value")).toEqual("");
    expect(option.innerHTML).toEqual("Select an option");
  });

  it("prompt is optional", () => {
    render(
      <FormWrapper>
        <Dropdown
          fieldName="test-field-name"
          options={[{ value: "1", label: "One" }]}
        />
      </FormWrapper>
    );

    const option = screen.getByRole("option");

    expect(option.getAttribute("value")).toEqual("1");
    expect(option.innerHTML).toEqual("One");
  });

  it("displays renders passed in options", () => {
    const options = [
      { value: "1", label: "One" },
      { value: "2", label: "Two" },
      { value: "3", label: "Three" },
      { value: "4", label: "Four" },
      { value: "5", label: "Five" },
    ];

    render(
      <FormWrapper>
        <Dropdown
          fieldName="test-field-name"
          prompt="Select an option"
          options={options}
        />
      </FormWrapper>
    );

    const renderedOptions = screen.getAllByRole("option");

    expect(renderedOptions.length).toBe(6);
    expect(renderedOptions[1].getAttribute("value")).toEqual("1");
    expect(renderedOptions[1].innerHTML).toEqual("One");
    expect(renderedOptions[2].getAttribute("value")).toEqual("2");
    expect(renderedOptions[2].innerHTML).toEqual("Two");
    expect(renderedOptions[3].getAttribute("value")).toEqual("3");
    expect(renderedOptions[3].innerHTML).toEqual("Three");
    expect(renderedOptions[4].getAttribute("value")).toEqual("4");
    expect(renderedOptions[4].innerHTML).toEqual("Four");
    expect(renderedOptions[5].getAttribute("value")).toEqual("5");
    expect(renderedOptions[5].innerHTML).toEqual("Five");
  });

  it("shows error message if passed in", () => {
    const { container } = render(
      <FormWrapper>
        <Dropdown fieldName="test-field-name" error="Required" />
      </FormWrapper>
    );

    const error = container.getElementsByClassName(
      "wmnds-fe-error-message"
    )[0];

    expect(error.innerHTML).toEqual("Required");
  });
});
