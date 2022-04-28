const getAboutSectionName = (stateApi) => {
  const formValues = stateApi.values;
  if (formValues["registerForYourself"] === "yes") {
    return "About you";
  } else {
    return "About the applicant";
  }
};

export default getAboutSectionName;
