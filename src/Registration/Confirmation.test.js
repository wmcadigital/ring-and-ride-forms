import { createRenderer } from "react-test-renderer/shallow";

import Confirmation from "./Confirmation";

describe("Confirmation - Registration", () => {
  it("renders Confirmation for Registration correctly", () => {
    const renderer = createRenderer();

    renderer.render(<Confirmation />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
