import { render } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  it("renders with heading that is passed to it", () => {
    const { container } = render(
      <Header heading="This will be shown as a heading" />
    );

    expect(container.getElementsByTagName("h1")[0].innerHTML).toEqual(
      "This will be shown as a heading"
    );
  });
});
