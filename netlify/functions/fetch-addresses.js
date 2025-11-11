// Netlify function: proxies postcode lookup to the address API
// so the Power Automate key remains server-side and never reaches the client.

exports.handler = async function (event) {
  try {
    const postcode = (event.queryStringParameters && event.queryStringParameters.postcode) || null;

    if (!postcode) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing postcode query parameter' }),
      };
    }

    const addressEndPointBase = process.env.API_ENDPOINT_POSTCODE || process.env.REACT_APP_API_ENDPOINT_POSTCODE;
    const powerAutomateKey = process.env.POWER_AUTOMATE_KEY || process.env.REACT_APP_POWER_AUTOMATE_KEY;

    if (!addressEndPointBase) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing API endpoint configuration on server' }),
      };
    }

    if (!powerAutomateKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing POWER_AUTOMATE_KEY on server' }),
      };
    }

    const postCodeEndPoint = `${addressEndPointBase}/${postcode}`;

    // Use fetch - Node 18+ runtimes on Netlify provide global fetch.
    const response = await fetch(postCodeEndPoint, {
      headers: {
        'power-automate': powerAutomateKey,
      },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
