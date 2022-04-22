import {
  required,
  numbersOnly,
  numbersAndSpacesOnly,
  email,
} from "./validation";

describe("validation", () => {
  describe("required", () => {
    it("should return 'Required' if passed in value is null", () => {
      expect(required(null)).toBe("Required");
    });

    it("should return 'Required' if passed in value is undefined", () => {
      expect(required(undefined)).toBe("Required");
    });

    it("should return 'Required' if passed in value is empty string", () => {
      expect(required("")).toBe("Required");
    });

    it("should return undefined if passed in value is tangible", () => {
      expect(required("1ab345")).toBe(undefined);
    });
  });

  describe("numbersOnly", () => {
    it("should return 'Invalid' if passed in value is not a number", () => {
      expect(numbersOnly("1ab345")).toBe("Invalid");
    });

    it("should return undefined if passed in value is a number", () => {
      expect(numbersOnly("12345")).toBe(undefined);
    });

    it("should return undefined if passed in value is not a tangible", () => {
      expect(numbersOnly("")).toBe(undefined);
    });

    it("should return 'Invalid' if passed in value is a number with spaces", () => {
      expect(numbersOnly("12 345")).toBe("Invalid");
    });
  });

  describe("numbersAndSpacesOnly", () => {
    it("should return 'Invalid' if passed in value is not a number", () => {
      expect(numbersAndSpacesOnly("1ab345")).toBe("Invalid");
    });

    it("should return undefined if passed in value is a number", () => {
      expect(numbersAndSpacesOnly("12345")).toBe(undefined);
    });

    it("should return undefined if passed in value is not a tangible", () => {
      expect(numbersAndSpacesOnly("")).toBe(undefined);
    });

    it("should return undefined if passed in value is a number with spaces", () => {
      expect(numbersAndSpacesOnly("12 345")).toBe(undefined);
    });
  });

  describe("email", () => {
    it("should return 'Invalid' if passed in value is not formatted as an email", () => {
      expect(email("Email")).toBe("Invalid");
    });

    it("should return 'Invalid' if passed in value is not formatted as an email", () => {
      expect(email("Email@")).toBe("Invalid");
    });

    it("should return 'Invalid' if passed in value is not formatted as an email", () => {
      expect(email("Email@test")).toBe("Invalid");
    });

    it("should return undefined if passed in value is formatted as an email", () => {
      expect(email("Email@test.com")).toBe(undefined);
    });

    it("should return undefined if passed in value is not a tangible", () => {
      expect(email("")).toBe(undefined);
    });
  });
});
