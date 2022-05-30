const formEndPoint = `${process.env.FORM_END_POINT_BASE}/send_ring_and_ride_form_data`;

const sendFormData = async (formData) => {
  const rawResponse = await fetch(formEndPoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const response = await rawResponse.json();

  return response;
};

export default sendFormData;
