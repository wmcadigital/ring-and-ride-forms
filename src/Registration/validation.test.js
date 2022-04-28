import {
  validateDateOfBirth,
  addressIdPresent,
  validateCheckAnswers,
} from "./validation";

describe("validation", () => {
  describe("validateDateOfBirth", () => {
    it("returns 'Required' if no part of the date is populated", () => {
      expect(validateDateOfBirth({})).toEqual({ dateOfBirth: "Required" });
    });

    it("returns 'Invalid' if only part of the date is populated", () => {
      expect(validateDateOfBirth({ bdayDay: "1", bdayMonth: "2" })).toEqual({
        dateOfBirth: "Invalid",
      });
    });

    it("returns 'Invalid' if all of the date is populated but is invalid", () => {
      expect(
        validateDateOfBirth({ bdayDay: "30", bdayMonth: "2", bdayYear: "2022" })
      ).toEqual({
        dateOfBirth: "Invalid",
      });
    });

    it("returns empty error object if date is valid", () => {
      expect(
        validateDateOfBirth({ bdayDay: "1", bdayMonth: "2", bdayYear: "2022" })
      ).toEqual({});
    });
  });
  describe("addressIdPresent", () => {
    it("indicates required in errors if not there", () => {
      expect(addressIdPresent("test")()).toEqual({
        test: {
          addressId: "Required",
        },
      });
    });

    it("returns an empty error object for prefix if present", () => {
      expect(
        addressIdPresent("test")({ test: { addressId: "12345" } })
      ).toEqual({
        test: {},
      });
    });
  });

  describe("validateCheckAnswers", () => {
    it("no checkboxes checked then return 'Required' for 'legal'", () => {
      expect(validateCheckAnswers({})).toEqual({ legal: "Required" });
    });

    it("only one checkbox checked then return 'Required' for 'legal'", () => {
      expect(validateCheckAnswers({ agreeTermsAndConditions: true })).toEqual({
        legal: "Required",
      });
    });

    it("both checkboxes checked then return undefined for 'legal'", () => {
      expect(
        validateCheckAnswers({
          agreeTermsAndConditions: true,
          agreePrivacyPolicy: true,
          agreeRingAndRide: true,
        })
      ).toEqual({ legal: undefined });
    });
  });
});
