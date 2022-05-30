import sendFormData from "./sendFormData";

describe("sendFormData", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ response: "success" }),
    })
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls form data end point with passed in form data", async () => {
    await sendFormData({
      field1: "value1",
      field2: "value2",
      field3: "value3",
    });

    expect(fetch).toBeCalledWith(
      "http://localhost:8081/send_ring_and_ride_form_data",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: '{"field1":"value1","field2":"value2","field3":"value3"}',
      }
    );
  });

  it("returns parsed data from the endpoint", async () => {
    const response = await sendFormData({ field1: "value1" });

    expect(response).toEqual({ response: "success" });
  });
});
