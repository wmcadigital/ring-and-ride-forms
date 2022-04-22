import { render, screen, fireEvent } from "@testing-library/react";

import CheckAnswerRow from "./CheckAnswerRow";

describe("CheckAnswerRow", () => {
  it("shows label, value and change button on a table row", () => {
    render(
      <table>
        <tbody>
          <CheckAnswerRow label="Label" value="Value" />
        </tbody>
      </table>
    );

    const labelCell = screen.getByRole("rowheader");
    expect(labelCell.innerHTML).toEqual("Label");

    const cells = screen.getAllByRole("cell");
    expect(cells[0].innerHTML).toEqual("Value");

    const button = cells[1].firstChild;
    expect(button.nodeName).toEqual("BUTTON");
    expect(button.innerHTML).toEqual("Change");
  });

  it("shows value and change button on a table row", () => {
    render(
      <table>
        <tbody>
          <CheckAnswerRow value="Value" />
        </tbody>
      </table>
    );

    expect(screen.queryAllByRole("rowheader").length).toBe(0);

    const cells = screen.getAllByRole("cell");
    expect(cells[0].innerHTML).toEqual("Value");

    const button = cells[1].firstChild;
    expect(button.nodeName).toEqual("BUTTON");
    expect(button.innerHTML).toEqual("Change");
  });

  it("clicking on change button will invoke provided callback", () => {
    const mockCallback = jest.fn();

    render(
      <table>
        <tbody>
          <CheckAnswerRow
            label="Label"
            value="Value"
            changeValueCallback={mockCallback}
          />
        </tbody>
      </table>
    );

    expect(mockCallback).toBeCalledTimes(0);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockCallback).toBeCalledTimes(1);
  });
});
