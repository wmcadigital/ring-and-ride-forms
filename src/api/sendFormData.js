/* eslint-disable no-undef */
const formEndPoint = `https://internal-api.wmca.org.uk/emails/api/email`;
// const formEndPoint = `${process.env.FORM_END_POINT_BASE}/emails/api/email`;

const sendFormData = async (formData, formSubject) => {
  console.log('sendFormData');
  console.log(formData);
  // flatten the formdata to send to the api
  const flattenJSON = (obj = {}, res = {}, extraKey = "") => {
    for (key in obj) {
      if (typeof obj[key] !== "object") {
        res[extraKey + key] = obj[key];
      } else {
        flattenJSON(obj[key], res, `${extraKey}${key}.`);
      }
    }
    return res;
  };

  console.log('rawResponse Start');

  const rawResponse = await fetch(formEndPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: 7,
      body: JSON.stringify(flattenJSON(formData)),
      from: formData.emailAddress,
      subject: formSubject,
    }),
  }).catch(function (error) {
    // TypeError: Failed to fetch
    console.log('There was an error', error);
  });

  console.log('rawResponse Finish');

  console.log(rawResponse);

  const response = await rawResponse.json();

  console.log(response);

  return response;
};

export default sendFormData;
