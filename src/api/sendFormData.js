/* eslint-disable no-undef */
const formEndPoint =  process.env.REACT_APP_API_ENDPOINT;

const sendFormData = async (formData, formSubject) => {
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

  // escape formdata
  const data = flattenJSON(formData);
  const myJSONString = JSON.stringify(data);
  const myEscapedJSONString = myJSONString
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");

  const raw = JSON.stringify({
    to: 13,
    body: myEscapedJSONString,
    from: formData.emailAddress,
    subject: formSubject,
    displayName: formData.firstName + " " + formData.lastName,
  });

  try {
    const rawResponse = await fetch(formEndPoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: raw,
    });
    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export default sendFormData;
