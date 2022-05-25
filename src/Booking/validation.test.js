import { validateBookingDate } from "./validation";

describe("validation", () => {
  describe("validateBookingDate", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2022, 4, 17).getTime());
    });

    it("returns 'Required' if no part of the date is populated", () => {
      expect(validateBookingDate({})).toEqual({ bookingDate: "Required" });
    });

    it("returns 'Invalid' if only part of the date is populated", () => {
      expect(
        validateBookingDate({ bookingDateDay: "1", bookingDateMonth: "2" })
      ).toEqual({
        bookingDate: "Invalid",
      });
    });

    it("returns 'Invalid' if all of the date is populated but is invalid", () => {
      expect(
        validateBookingDate({
          bookingDateDay: "31",
          bookingDateMonth: "11",
          bookingDateYear: "2022",
        })
      ).toEqual({
        bookingDate: "Invalid",
      });
    });

    it("returns 'Invalid' if the date is populated but with non numeric text", () => {
      expect(
        validateBookingDate({
          bookingDateDay: "A4",
          bookingDateMonth: "11",
          bookingDateYear: "2022",
        })
      ).toEqual({
        bookingDate: "Invalid",
      });
    });

    it("returns 'Date is not available' if date is in the past", () => {
      expect(
        validateBookingDate({
          bookingDateDay: "16",
          bookingDateMonth: "5",
          bookingDateYear: "2022",
        })
      ).toEqual({
        bookingDate: "Date is not available",
      });
    });

    it("returns 'Date is not available' if date is today", () => {
      expect(
        validateBookingDate({
          bookingDateDay: "17",
          bookingDateMonth: "5",
          bookingDateYear: "2022",
        })
      ).toEqual({
        bookingDate: "Date is not available",
      });
    });

    it("returns empty error object if date is tomorrow and current time is NOT past 14.30", () => {
      expect(
        validateBookingDate({
          bookingDateDay: "18",
          bookingDateMonth: "5",
          bookingDateYear: "2022",
        })
      ).toEqual({});
    });

    it("returns 'Date is not available' if date is tomorrow and current time IS past 14.30", () => {
      jest.setSystemTime(new Date(2022, 5, 17, 14, 31).getTime());

      expect(
        validateBookingDate({
          bookingDateDay: "18",
          bookingDateMonth: "5",
          bookingDateYear: "2022",
        })
      ).toEqual({ bookingDate: "Date is not available" });
    });
  });
});
