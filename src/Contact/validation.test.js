import { validateContactPreferences, validateCheckAnswers } from "./validation";

describe("validation", () => {
  describe("validateContactPreferences", () => {
    it("if nothing provided should return 'Required' for 'contactPreference'", () => {
      expect(validateContactPreferences({})).toEqual({
        contactPreference: "Required",
      });
    });

    it("if email preference is checked and no email should return 'Required' for 'emailAddress'", () => {
      expect(validateContactPreferences({ emailContact: true })).toEqual({
        emailAddress: "Required",
      });
    });

    it("if email preference is checked and invalid email should return 'Invalid' for 'emailAddress'", () => {
      expect(
        validateContactPreferences({
          emailContact: true,
          emailAddress: "invalidEmail",
        })
      ).toEqual({
        emailAddress: "Invalid",
      });
    });

    it("if email preference is checked and valid email should return undefined for 'emailAddress'", () => {
      expect(
        validateContactPreferences({
          emailContact: true,
          emailAddress: "valid@test.com",
        })
      ).toEqual({ emailAddress: undefined });
    });

    it("if phone preference is checked and no phone no. should return 'Required' for 'phoneNo'", () => {
      expect(validateContactPreferences({ phoneContact: true })).toEqual({
        phoneNo: "Required",
      });
    });

    it("if phone preference is checked and invalid phone no should return 'Invalid' for 'phoneNo'", () => {
      expect(
        validateContactPreferences({
          phoneContact: true,
          phoneNo: "657676DFT",
        })
      ).toEqual({
        phoneNo: "Invalid",
      });
    });

    it("if phone preference is checked and valid phone no should return undefined for 'phoneNo'", () => {
      expect(
        validateContactPreferences({
          phoneContact: true,
          phoneNo: "0121 200 2787",
        })
      ).toEqual({ phoneNo: undefined });
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
        })
      ).toEqual({ legal: undefined });
    });
  });
});
