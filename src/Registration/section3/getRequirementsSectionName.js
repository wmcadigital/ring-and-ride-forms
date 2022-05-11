const getRequirementsSectionName = (stateApi) => {
  const formValues = stateApi.values;
  if (formValues["registerForYourself"] === "yes") {
    return "Your requirements";
  } else {
    return "Applicant requirements";
  }
};

export default getRequirementsSectionName;
