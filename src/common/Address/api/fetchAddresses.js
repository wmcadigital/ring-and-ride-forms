const addressEndPointBase =
  process.env.REACT_APP_API_ENDPOINT_POSTCODE;

const fetchAddresses = async (postCode) => {
  const postCodeTrimmed = postCode.trim();
  const postCodeEndPoint = `${addressEndPointBase}/${postCodeTrimmed}`;

  const powerAutomateKey = process.env.REACT_APP_POWER_AUTOMATE_KEY;
  if (!powerAutomateKey) {
    throw new Error('Missing REACT_APP_POWER_AUTOMATE_KEY in environment');
  }

  const response = await fetch(postCodeEndPoint, {
    headers: {
      'power-automate': powerAutomateKey
    }
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};

export default fetchAddresses;
