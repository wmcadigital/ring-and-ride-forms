const addressEndPointBase =
  "https://api.wmnetwork.co.uk/address/v1/AddressByPostcode/";

const fetchAddresses = async (postCode) => {
  const postCodeTrimmed = postCode.trim();
  const postCodeEndPoint = `${addressEndPointBase}${postCodeTrimmed}`;

  const response = await fetch(postCodeEndPoint);
  const parsedResponse = await response.json();

  return parsedResponse;
};

export default fetchAddresses;
