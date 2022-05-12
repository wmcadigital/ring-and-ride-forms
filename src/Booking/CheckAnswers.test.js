import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import CheckAnswers from "./CheckAnswers";

import mySelfNoReturnJourney from "./testData/mySelfNoReturnJourney.json";
import mySelfReturnJourney from "./testData/mySelfReturnJourney.json";
import behalfSomeoneReturnJourney from "./testData/behalfSomeoneReturnJourney.json";
import behalfSomeoneNoReturnJourney from "./testData/behalfSomeoneNoReturnJourney.json";
import behalfGroupNoReturnJourney from "./testData/behalfGroupNoReturnJourney.json"
import behalfGroupReturnJourney from "./testData/behalfGroupReturnJourney.json";
import behalfGroupReturnDifferentPassengersJourney from "./testData/behalfGroupReturnDifferentPassengersJourney.json"

jest.mock("react-final-form");

describe("CheckAnswers", () => {
  it("renders CheckAnswers behalf myself, no return", () => {
    useFormState.mockImplementationOnce(() => ({
      values: mySelfNoReturnJourney,
    }));
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers behalf myself, return", () => {
    useFormState.mockImplementationOnce(() => ({
      values: mySelfReturnJourney,
    }));
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers behalf someone, no return", () => {
    useFormState.mockImplementationOnce(() => ({
      values: behalfSomeoneNoReturnJourney,
    }));
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers behalf someone, return", () => {
    useFormState.mockImplementationOnce(() => ({
      values: behalfSomeoneReturnJourney,
    }));
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers behalf group, no return", () => {
    useFormState.mockImplementationOnce(() => ({
      values: behalfGroupNoReturnJourney,
    }));
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers behalf group, return", () => {
    useFormState.mockImplementationOnce(() => ({
      values: behalfGroupReturnJourney,
    }));
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers behalf group, return, different outward/return passengers", () => {
    useFormState.mockImplementationOnce(() => ({
      values: behalfGroupReturnDifferentPassengersJourney,
    }));
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers with an error if present", () => {
    const formApiReturnWithError = {
      values: mySelfNoReturnJourney,
      submitFailed: true,
      errors: { legal: "Required" },
    };
    useFormState.mockImplementationOnce(() => formApiReturnWithError);
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
