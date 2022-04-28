const whiteSpecfic = {
  british: { label: "British" },
  irish: { label: "Irish" },
  otherWhite: { label: "Any other White background" },
};

const mixedSpecific = {
  whiteBlackCarribean: { label: "White and Black Carribean" },
  whiteBlackAfrican: { label: "White and Black African" },
  whiteAsian: { label: "White and Asian" },
  otherMixed: { label: "Any other Mixed or Multiple ethnic background" },
};

const asianSpecific = {
  indian: { label: "Indian" },
  pakistani: { label: "Pakistani" },
  bangladeshi: { label: "Bangladeshi" },
  chinese: { label: "Chinese" },
  otherAsian: { label: "Any other Asian background" },
};

const blackSpecific = {
  african: { label: "African" },
  carribean: { label: "Carribean" },
  otherBlack: { label: "Any other Black, African or Carribean" },
};

const otherSpecific = {
  arab: { label: "Arab" },
  otherOther: { label: "Any other ethnic group" },
};

const Ethnicity = {
  white: { label: "White", specific: whiteSpecfic },
  mixed: { label: "Mixed or Multiple ethnic groups", specific: mixedSpecific },
  asian: { label: "Asian or Asian British", specific: asianSpecific },
  black: {
    label: "Black, African, Carribean or Black British",
    specific: blackSpecific,
  },
  other: { label: "Other", specific: otherSpecific },
};

export const PreferNotToSayLabel = { preferNotToSay: "Prefer not to say" };

export default Ethnicity;
