const addressEndPointBase =
  process.env.REACT_APP_API_ENDPOINT_POSTCODE;

const fetchAddresses = async (postCode) => {
  const postCodeTrimmed = postCode.trim();
  const postCodeEndPoint = `${addressEndPointBase}/${postCodeTrimmed}`;

  const response = await fetch(postCodeEndPoint, {
    headers: {
      'power-automate': process.env.REACT_APP_POWER_AUTOMATE,
    },
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};

export default fetchAddresses;