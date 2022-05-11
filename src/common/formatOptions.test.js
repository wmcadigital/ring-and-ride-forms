import formatOptions from "./formatOptions";

describe("formatOptions", () => {
  it("creates a string of selected options separated by a comma", () => {
    const options = {
      apple: true,
      banana: false,
      cherry: false,
      orange: true,
      pineapple: true,
    };

    const keyLabelObj = {
      apple: "Apple",
      banana: "Banana",
      cherry: "Cherry",
      orange: "Orange",
      pineapple: "Pine-apple",
    };

    expect(formatOptions(options, keyLabelObj)).toEqual(
      "Apple, Orange, Pine-apple"
    );
  });
});
