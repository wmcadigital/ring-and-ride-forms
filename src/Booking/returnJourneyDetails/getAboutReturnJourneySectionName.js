const getAboutReturnJourneySectionName = (stateApi) => {
  const formValues = stateApi.values;
  if (formValues["bookingParty"] === "mySelf") {
    return "Plan your return journey";
  } else {
    return "Plan their return journey";
  }
};

export default getAboutReturnJourneySectionName;
