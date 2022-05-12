import { createRenderer } from "react-test-renderer/shallow";
import { BrowserRouter } from "react-router-dom";

import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  it("renders Booking Form as expected", () => {
    const renderer = createRenderer();

    renderer.render(
      <BrowserRouter>
        <BookingForm />
      </BrowserRouter>
    );

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
