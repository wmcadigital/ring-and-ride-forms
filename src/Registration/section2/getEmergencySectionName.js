const getEmergencySectionName = (stateApi) => {
  const formValues = stateApi.values;
  if (formValues["registerForYourself"] === "yes") {
    return "Emergency contact";
  } else {
    return "Applicant's emergency contact";
  }
};

export default getEmergencySectionName;
