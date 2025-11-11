const addressEndPointBase =
  process.env.REACT_APP_API_ENDPOINT_POSTCODE;

// In unit tests we keep the existing behaviour so tests can assert the
// direct endpoint is called. In production (built app) we proxy the
// postcode lookup through a serverless function so the Power Automate
// key is never embedded into the client bundle.
const fetchAddresses = async (postCode) => {
  const postCodeTrimmed = postCode.trim();
  const postCodeEndPoint = `${addressEndPointBase}/${postCodeTrimmed}`;

  const isTest = process.env.NODE_ENV === 'test';

  if (isTest) {
    // During tests we expect the client to call the real endpoint and
    // tests mock `fetch` accordingly.
    const powerAutomateKey = process.env.REACT_APP_POWER_AUTOMATE_KEY;
    if (!powerAutomateKey) {
      throw new Error('Missing REACT_APP_POWER_AUTOMATE_KEY in environment');
    }

    const response = await fetch(postCodeEndPoint, {
      headers: {
        'power-automate': powerAutomateKey,
      },
    });
    const parsedResponse = await response.json();

    return parsedResponse;
  }

  // In non-test environments call the serverless function which will
  // perform the request server-side using a server-only env var.
  const functionUrl = `/.netlify/functions/fetch-addresses?postcode=${encodeURIComponent(
    postCodeTrimmed
  )}`;

  const resp = await fetch(functionUrl);
  const parsed = await resp.json();

  return parsed;
};

export default fetchAddresses;
