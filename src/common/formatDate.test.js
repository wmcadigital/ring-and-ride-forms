import formatDate from "./formatDate";

describe("formatDate", () => {
  it("converts parts of date to a string for display", () => {
    expect(formatDate("09", "05", "2022")).toEqual("9 May 2022");
  });
});
