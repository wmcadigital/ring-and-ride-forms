import { createRenderer } from "react-test-renderer/shallow";

import AddressFormatted from "./AddressFormatted";

const testAddress = {
  addressLine1: "20 Test St",
  townOrCity: "Birmingham",
  county: "West Midlands",
  postCode: "B17 7UJ",
};

describe("testAddress", () => {
  it("formats an address for display", () => {
    const renderer = createRenderer();

    renderer.render(<AddressFormatted addressObj={testAddress} />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it("formats an address for display with address line 2", () => {
    const testAddressWithLine2 = {
      ...testAddress,
      addressLine2: "additional line",
    };

    const renderer = createRenderer();

    renderer.render(<AddressFormatted addressObj={testAddressWithLine2} />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
