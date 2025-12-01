import { render } from "@testing-library/react";

import AddressDetails from "./AddressDetails";
import FormWrapper from "../FormWrapper";

describe("AddressDetails", () => {
  it("should show 5 fields for entering an address", () => {
    const { container } = render(
      <FormWrapper>
        <AddressDetails prefix="test" />
      </FormWrapper>
    );

    const inputControls = container.getElementsByClassName("wmnds-fe-input");

    expect(inputControls[0].getAttribute("name")).toEqual("test.addressLine1");
    expect(inputControls[1].getAttribute("name")).toEqual("test.addressLine2");
    expect(inputControls[2].getAttribute("name")).toEqual("test.townOrCity");
    expect(inputControls[3].getAttribute("name")).toEqual("test.county");
    expect(inputControls[4].getAttribute("name")).toEqual("test.postCode");
  });

  it("for an address that is to be manually filled the postcode is initialised to the search postcode", () => {
    const { container } = render(
      <FormWrapper
        initialValues={{
          test: { addressId: "manual", searchPostCode: "B19 2BY" },
        }}
      >
        <AddressDetails prefix="test" />
      </FormWrapper>
    );

    const inputControls = container.getElementsByClassName("wmnds-fe-input");
    const postCodeInput = inputControls[4];

    expect(postCodeInput.getAttribute("value")).toEqual("B19 2BY");
  });

  it("for an address that is prefilled, address values are initialised to matching address", () => {
    const { container } = render(
      <FormWrapper
        initialValues={{
          test: { addressId: "12345", searchPostCode: "B19 2BY" },
        }}
      >
        <AddressDetails
          prefix="test"
          addresses={[
            {
              guid: "89101",
              line_1: "20 Summer Lane",
              line_2: "",
              post_town: "Birmingham",
              county: "West Mids",
              postcode: "B19 2BY",
            },
            {
              guid: "12345",
              line_1: "50 Matching Rd",
              line_2: "",
              post_town: "Brum",
              county: "West Midlands",
              postcode: "B19 2UK",
            },
          ]}
        />
      </FormWrapper>
    );

    const inputControls = container.getElementsByClassName("wmnds-fe-input");

    expect(inputControls[0].getAttribute("value")).toEqual("50 Matching Rd");
    expect(inputControls[1].getAttribute("value")).toEqual("");
    expect(inputControls[2].getAttribute("value")).toEqual("Brum");
    expect(inputControls[3].getAttribute("value")).toEqual("West Midlands");
    expect(inputControls[4].getAttribute("value")).toEqual("B19 2UK");
  });
});
