const formatOptions = (optionsObj, keyLabelObj) => {
  const filteredObj = Object.keys(optionsObj).filter(
    (key) => key !== "other" && optionsObj[key] === true
  );

  return filteredObj.map((key) => keyLabelObj[key]).join(", ");
};

export default formatOptions;
