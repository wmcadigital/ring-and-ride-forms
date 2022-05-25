const getSectionLength = (behalfGroup) => {
  if (behalfGroup) {
    return "5";
  } else {
    return "4";
  }
};

const getSectionPositionInfo = (position, stateApi) => {
  const formValues = stateApi.values;
  const onBehalfGroup = formValues["bookingParty"] === "behalfGroup";
  if (position > 1 && onBehalfGroup) {
    return `Section ${parseInt(position) + 1} of ${getSectionLength(
      onBehalfGroup
    )}`;
  }
  return `Section ${position} of ${getSectionLength(onBehalfGroup)}`;
};

export default getSectionPositionInfo;
