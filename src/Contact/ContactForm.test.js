import { createRenderer } from "react-test-renderer/shallow";

import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  it("renders Contact Form as expected", () => {
    const renderer = createRenderer();

    renderer.render(<ContactForm />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
