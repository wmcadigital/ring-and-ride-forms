/* eslint-disable no-undef */
const formEndPoint = `https://internal-api.wmca.org.uk/emails/api/email`;
// const formEndPoint = `${process.env.FORM_END_POINT_BASE}/emails/api/email`;

const sendFormData = async (formData, formSubject) => {
  // flatten the formdata to send to the api
  const flattenJSON = (obj = {}, res = {}, extraKey = "") => {
    for (let key in obj) {
      if (typeof obj[key] !== "object") {
        res[extraKey + key] = obj[key];
      } else {
        flattenJSON(obj[key], res, `${extraKey}${key}.`);
      }
    }
    return res;
  };

  try {
    const rawResponse = await fetch(formEndPoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: 13,
        body: JSON.stringify(flattenJSON(formData)),
        from: formData.emailAddress,
        subject: formSubject,
      }),
    })
    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export default sendFormData;
