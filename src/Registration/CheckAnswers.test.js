import { useFormState } from "react-final-form";
import { createRenderer } from "react-test-renderer/shallow";

import CheckAnswers from "./CheckAnswers";

jest.mock("react-final-form");

const formApiReturn = {
  values: {
    registerForYourself: "yes",
    firstName: "Chan",
    lastName: "Singh",
    bdayDay: "01",
    bdayMonth: "01",
    bdayYear: "1990",
    phoneNo: "87098908",
    emailAddress: "test@testerson.com",
    registered: {
      searchPostCode: "B19 2NN",
      addressId: "f2c8b89b-4b11-4557-93cb-9f846748bcba",
      addressLine1: "Church Of Christ",
      addressLine2: "Summer Lane",
      townOrCity: "Birmingham",
      county: "West Midlands",
      postCode: "B19 2NN",
    },
    contactPreference: {
      email: true,
      letterAndEmail: false,
      largePrintLetter: true,
    },
    ethnicity: "asian",
    specificEthnicity: "indian",
    emergencyContact: "yes",
    emergencyFirstName: "Test",
    emergencyLastName: "Testerson",
    emergencyRelationship: "Carer",
    emergencyPhoneNo: "0800 555500",
    emergencyEmailAddress: "tester@testerson.com",
    emergency: {
      searchPostCode: "B19 3SD",
      addressId: "46091f33-ae00-4709-bbc8-38145f2233b1",
      addressLine1: "West Midlands Combined Authority",
      addressLine2: "16 Summer Lane",
      townOrCity: "Birmingham",
      county: "West Midlands",
      postCode: "B19 3SD",
    },
    standardBusProb: {
      cannotGetToBus: true,
      cannotTravelOnBus: true,
    },
    standardBusReason: {
      limitedMobility: true,
      other: true,
      otherReason: "Arthiritis",
      companionOrCarer: true,
    },
    hasCondition: "yes",
    conditionDetail: "Arthiritis",
    mobilityAids: {
      manualWheelchair: true,
      walkingFrame: true,
    },
    wheelChairTransfer: "no",
    additionalRequirements: "yes",
    additionalRequirementsDetails: "Extra requirement",
  },
};

describe("CheckAnswers", () => {
  it("renders CheckAnswers correctly", () => {
    useFormState.mockImplementationOnce(() => formApiReturn);
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers - register on behalf of someone else", () => {
    const formApiReturnOnBehalf = {
      ...formApiReturn,
      values: { ...formApiReturn.values, registerForYourself: "no" },
    };
    useFormState.mockImplementationOnce(() => formApiReturnOnBehalf);
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers - no emergency", () => {
    const formApiReturnNoEmergency = {
      ...formApiReturn,
      values: { ...formApiReturn.values, emergencyContact: "no" },
    };
    useFormState.mockImplementationOnce(() => formApiReturnNoEmergency);
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("renders CheckAnswers with an error if present", () => {
    const formApiReturnWithError = {
      ...formApiReturn,
      submitFailed: true,
      errors: { legal: "Required" },
    };
    useFormState.mockImplementationOnce(() => formApiReturnWithError);
    const renderer = createRenderer();

    renderer.render(<CheckAnswers />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
