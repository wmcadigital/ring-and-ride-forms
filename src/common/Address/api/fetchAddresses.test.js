import fetchAddresses from "./fetchAddresses";

describe("fetchAddresses", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: "test" }),
    })
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls fetch with the passed in post code", async () => {
    await fetchAddresses("B19 3SD");

    expect(fetch).toBeCalledWith(
      "https://apis.networkwestmidlands.com/Addresses/AddressByPostcode/B19 3SD"
    );
  });

  it("returns parsed data from the endpoint", async () => {
    const response = await fetchAddresses("B19 3SD");

    expect(response).toEqual({ data: "test" });
  });
});
