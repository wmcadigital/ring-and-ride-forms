import { render, screen, fireEvent } from "@testing-library/react";

import MobilityAidsQuery from "./MobilityAidsQuery";
import FormWrapper from "../../common/FormWrapper";

describe("MobilityAidsQuery", () => {
  it("clicking on a check box will invoke callback with value", () => {
    const mockCallback = jest.fn();

    render(
      <FormWrapper>
        <MobilityAidsQuery setMobilityAids={mockCallback} />
      </FormWrapper>
    );

    const checkboxes = screen.getAllByRole("checkbox");

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(checkboxes[0]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith({ manualWheelchair: true });
  });
});
