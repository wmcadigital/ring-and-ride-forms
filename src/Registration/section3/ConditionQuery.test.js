import { render, fireEvent } from "@testing-library/react";

import ConditionQuery from "./ConditionQuery";
import FormWrapper from "../../common/FormWrapper";

describe("ConditionQuery", () => {
  it("clicking on a radio button will invoke callback with value", () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper>
        <ConditionQuery setHasCondition={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[0]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("yes");
  });
});
