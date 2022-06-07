import { createRenderer } from "react-test-renderer/shallow";

import Confirmation from "./Confirmation";

describe("Confirmation - Booking", () => {
  it("renders Confirmation for Booking correctly", () => {
    const renderer = createRenderer();

    renderer.render(<Confirmation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
