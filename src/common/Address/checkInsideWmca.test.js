import checkInsideWmca from "./checkInsideWmca";

describe("checkInsideWmca", () => {
  it("returns true if inside WMCA", () => {
    expect(
      checkInsideWmca([
        { county: "West Midlands" },
        { county: "West Midlands" },
      ])
    ).toBe(true);
  });

  it("returns false if outside WMCA", () => {
    expect(
      checkInsideWmca([
        { county: "Staffordshire" },
        { county: "Staffordshire" },
      ])
    ).toBe(false);
  });
});
