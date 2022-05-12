import formatTime from "./formatTime";

describe("formatTime", () => {
  it("formats a time selected in the morning", () => {
    expect(formatTime("10", "30")).toEqual("10:30am");
  });

  it("formats a time selected just after noon", () => {
    expect(formatTime("12", "15")).toEqual("12:15pm");
  });

  it("formats a time selected in the evening", () => {
    expect(formatTime("21", "45")).toEqual("09:45pm");
  });
});
