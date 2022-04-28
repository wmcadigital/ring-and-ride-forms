import { render, fireEvent } from "@testing-library/react";

import EthnicGroup from "./EthnicGroup";
import FormWrapper from "../../common/FormWrapper";

describe("EthnicGroup", () => {
  it("clicking on an ethnic radio button will invoke callback with value", async () => {
    const mockCallback = jest.fn();

    const { container } = render(
      <FormWrapper
        mutators={{
          setFormAttribute: () => {},
        }}
      >
        <EthnicGroup setEthnicGroup={mockCallback} />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockCallback).toBeCalledTimes(0);

    fireEvent.click(radioButtons[0]);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith("white");
  });

  it("clicking on an ethnic radio button will clear specific ethnicity if changed", async () => {
    const mockSetFormAttribute = jest.fn();

    const { container } = render(
      <FormWrapper
        mutators={{
          setFormAttribute: mockSetFormAttribute,
        }}
      >
        <EthnicGroup
          setEthnicGroup={() => {}}
          initialValues={{ ethnicity: "white", specificEthnicity: "british" }}
        />
      </FormWrapper>
    );

    const radioButtons = container.getElementsByClassName(
      "wmrards-fe-radios__input"
    );

    expect(mockSetFormAttribute).toBeCalledTimes(0);

    fireEvent.click(radioButtons[1]);

    expect(mockSetFormAttribute).toBeCalledTimes(1);
    expect(mockSetFormAttribute.mock.calls[0][0]).toEqual([
      "specificEthnicity",
      undefined,
    ]);
  });
});
