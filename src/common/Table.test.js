import { render, screen } from "@testing-library/react";

import Table from "./Table";

describe("Table", () => {
  it("wraps children that are passed in", () => {
    render(
      <Table>
        <tbody>
          <tr>
            <td>Test Table Cell</td>
          </tr>
        </tbody>
      </Table>
    );

    expect(screen.getByText("Test Table Cell")).toBeDefined();
  });
});
