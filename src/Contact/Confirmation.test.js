import { createRenderer } from "react-test-renderer/shallow";

import Confirmation from "./Confirmation";

describe("Confirmation - Contact", () => {
  it("renders Confirmation for Contact Us correctly", () => {
    const renderer = createRenderer();

    renderer.render(<Confirmation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
