import { render, screen, fireEvent } from "@testing-library/react";

import NumberInput from "./NumberInput";
import FormWrapper from "./FormWrapper";

describe("NumberInput", () => {
  it("renders an input field and decrement/increment buttons", () => {
    render(
      <FormWrapper>
        <NumberInput fieldName="test" />
      </FormWrapper>
    );

    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs.length).toBe(1);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  it("shows a number given by default value", () => {
    render(
      <FormWrapper>
        <NumberInput fieldName="test" defaultValue={43} />
      </FormWrapper>
    );

    const inputs = screen.getAllByRole("spinbutton");

    expect(inputs[0].getAttribute("value")).toBe("43");
  });

  it("optionally renders a label", () => {
    const { container } = render(
      <FormWrapper>
        <NumberInput fieldName="test" label="Test Label" />
      </FormWrapper>
    );

    const labels = container.getElementsByClassName("wmnds-fe-label");

    expect(labels.length).toBe(1);
    expect(labels[0].innerHTML).toEqual("Test Label");
  });

  it("shows an error if passed in as a prop", () => {
    render(
      <FormWrapper>
        <NumberInput fieldName="test" error="An error occurred" />
      </FormWrapper>
    );

    expect(screen.getByText("An error occurred")).toBeDefined();
  });

  it("invokes relevant callback on clicking either the decrement or increment button", () => {
    const decrementMock = jest.fn();
    const incrementMock = jest.fn();

    render(
      <FormWrapper>
        <NumberInput
          fieldName="test"
          decreaseNumberCallback={decrementMock}
          increaseNumberCallback={incrementMock}
        />
      </FormWrapper>
    );

    const buttons = screen.getAllByRole("button");

    expect(decrementMock).toBeCalledTimes(0);

    fireEvent.click(buttons[0]);

    expect(decrementMock).toBeCalledTimes(1);

    expect(incrementMock).toBeCalledTimes(0);

    fireEvent.click(buttons[1]);

    expect(incrementMock).toBeCalledTimes(1);
  });
});
