import { create } from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  it("renders Booking Form as expected", () => {
    const renderer = create(
      <BrowserRouter>
        <BookingForm />
      </BrowserRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
