const getAboutJourneySectionName = (stateApi) => {
  const formValues = stateApi.values;
  if (formValues["bookingParty"] === "mySelf") {
    return "Plan your journey";
  } else {
    return "Plan their journey";
  }
};

export default getAboutJourneySectionName;
