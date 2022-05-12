import { validateReturnPickupTime } from "./validation";

describe("validateReturnPickupTime", () => {
  it("Return pickup time cannot be less than outward pick up time - different hours", () => {
    const values = {
      outwardPickup: { hour: "10", minute: "15" },
      returnPickup: { hour: "08", minute: "30" },
    };
    expect(validateReturnPickupTime(values)).toEqual({
      "returnPickup.timeInput": "Invalid",
    });
  });

  it("Return pickup time cannot be less than outward pick up time - different minutes", () => {
    const values = {
      outwardPickup: { hour: "10", minute: "15" },
      returnPickup: { hour: "10", minute: "00" },
    };
    expect(validateReturnPickupTime(values)).toEqual({
      "returnPickup.timeInput": "Invalid",
    });
  });

  it("Return pickup time must be greater than outward pick up time", () => {
    const values = {
      outwardPickup: { hour: "10", minute: "15" },
      returnPickup: { hour: "19", minute: "30" },
    };
    expect(validateReturnPickupTime(values)).toEqual({});
  });
});
