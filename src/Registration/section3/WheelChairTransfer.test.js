import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import WheelChairTransfer from "./WheelChairTransfer";

jest.mock("react-final-form");

describe("WheelChairTransfer", () => {
  it("individual is filling out form for themselves - manual wheel chair", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        mobilityAids: {
          manualWheelchair: true,
        },
      },
    }));
    const renderer = createRenderer();

    renderer.render(<WheelChairTransfer />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("individual is filling out form for someone else - powered wheel chair", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "no",
        firstName: "Test",
        lastName: "Testerson",
        mobilityAids: {
          powerWheelchair: true,
        },
      },
    }));
    const renderer = createRenderer();

    renderer.render(<WheelChairTransfer />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders with an error", () => {
    useFormState.mockImplementationOnce(() => ({
      values: {
        registerForYourself: "yes",
        mobilityAids: {
          manualWheelchair: true,
        },
      },
      submitFailed: true,
      errors: { wheelChairTransfer: "Required" },
    }));
    const renderer = createRenderer();

    renderer.render(<WheelChairTransfer />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
