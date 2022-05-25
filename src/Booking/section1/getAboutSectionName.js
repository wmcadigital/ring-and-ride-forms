const getAboutSectionName = (stateApi) => {
  const formValues = stateApi.values;
  if (formValues["bookingParty"] === "behalfSomeone") {
    return "About the applicant";
  } else {
    return "About you";
  }
};

export default getAboutSectionName;
