import {
  required,
  numbersOnly,
  numbersAndSpacesOnly,
  email,
  name,
  composeValidators,
  validateDate,
  validateDateOfBirth,
  postCode,
  validateSelectOneOption,
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

  describe("name", () => {
    it("should return 'Invalid' if passed in value is a number", () => {
      expect(name("23455l")).toBe("Invalid");
    });

    it("should return 'Invalid' if passed in value contains a number", () => {
      expect(name("fgfg23455l")).toBe("Invalid");
    });

    it("should return undefined if passed in value is a valid name", () => {
      expect(name("Fred")).toBe(undefined);
    });

    it("should return undefined if passed in value is a valid name", () => {
      expect(name("O'Brien")).toBe(undefined);
    });

    it("should return undefined if passed in value is not tangible", () => {
      expect(name("")).toBe(undefined);
    });
  });

  describe("composeValidators", () => {
    const validationFn = composeValidators(required, name);

    it("composed validator should return 'Required' if no value provided", () => {
      expect(validationFn()).toBe("Required");
    });

    it("composed validator should return 'Invalid' if value is number", () => {
      expect(validationFn("13232")).toBe("Invalid");
    });

    it("composed validator should return undefined if value is a valid name", () => {
      expect(validationFn("Fred")).toBe(undefined);
    });
  });

  describe("validateDate", () => {
    it("cannot have non numbers in the date", () => {
      expect(validateDate("a3", "11", "2022")).toEqual("Invalid");
    });

    it("cannot have dates greater than 31 days", () => {
      expect(validateDate("32", "10", "2022")).toEqual("Invalid");
    });

    it("cannot have dates less than 1 day", () => {
      expect(validateDate("-56", "10", "2022")).toEqual("Invalid");
    });

    it("cannot have months greater than 12", () => {
      expect(validateDate("13", "13", "2022")).toEqual("Invalid");
    });

    it("cannot have months less than 1", () => {
      expect(validateDate("13", "-1", "2022")).toEqual("Invalid");
    });

    it("cannot have years less than 1900", () => {
      expect(validateDate("05", "09", "1899")).toEqual("Invalid");
    });

    it("cannot have years greater than 4 characters", () => {
      expect(validateDate("05", "09", "20220")).toEqual("Invalid");
    });

    it("cannot have years less than 4 characters", () => {
      expect(validateDate("05", "09", "202")).toEqual("Invalid");
    });

    it("cannot have an invalid date such as 31st November", () => {
      expect(validateDate("31", "11", "2022")).toEqual("Invalid");
    });

    it("cannot have an invalid date such as 29th February 2015", () => {
      expect(validateDate("29", "02", "2015")).toEqual("Invalid");
    });

    it("returns undefined for a valid date", () => {
      expect(validateDate("05", "09", "2022")).toBe(undefined);
    });
  });

  describe("validateDateOfBirth", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2022, 3, 27).getTime());
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("cannot have a date of birth in the future", () => {
      expect(validateDateOfBirth("28", "04", "2022")).toEqual("Invalid");
    });

    it("valid date of birth", () => {
      expect(validateDateOfBirth("28", "04", "1989")).toBe(undefined);
    });
  });

  describe("postCode", () => {
    it("returns 'Invalid' for a post code not in the correct format", () => {
      expect(postCode("T0000 678u")).toEqual("Invalid");
    });

    it("returns undefined for a post code in the correct format", () => {
      expect(postCode("T10 6BY")).toEqual(undefined);
    });

    it("should return undefined if passed in value is not a tangible", () => {
      expect(postCode("")).toBe(undefined);
    });
  });

  describe("validateSelectOneOption", () => {
    const validateContactPreference = validateSelectOneOption(
      "contactPreference",
      "selectContactPref"
    );
    it("returns an error if no contact preference is selected", () => {
      expect(validateContactPreference()).toEqual({
        selectContactPref: "Select at least 1 topic",
      });
    });

    it("return an error if all contact preferences are false", () => {
      const contactPrefs = {
        contactPreference: {
          telephone: false,
          email: false,
        },
      };

      expect(validateContactPreference(contactPrefs)).toEqual({
        selectContactPref: "Select at least 1 topic",
      });
    });

    it("doesn't return an error if at least one contact preference is selected", () => {
      const contactPrefs = {
        contactPreference: {
          telephone: false,
          email: true,
        },
      };

      expect(validateContactPreference(contactPrefs)).toEqual({});
    });
  });
});
