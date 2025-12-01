import { useState } from "react";
import { Field } from "react-final-form";

import FormWizard from "./FormWizard";

import { render, screen, fireEvent, act } from "@testing-library/react";

const Page1 = () => <div>Page 1</div>;
const Page2 = () => <div>Page 2</div>;
const Page3 = () => <div>Page 3</div>;
const Page4 = () => <div>Page 4</div>;
const Page5 = () => <div>Page 5</div>;

const Page1WithField = () => (
  <div className="page-1-with-field">
    <Field name="input-field" component="input" type="text" />
  </div>
);

const mockSubmit = jest.fn();

const renderForm = (goToPageParam = null, externalPageParam = null) => {
  const FormWizardWrapper = () => {
    const [goToPage, setGoToPage] = useState(goToPageParam);
    const [externalPage, setGoToExternalPage] = useState(externalPageParam);

    return (
      <FormWizard
        onSubmit={mockSubmit}
        goToPage={goToPage}
        setGoToPage={setGoToPage}
        externalPage={externalPage}
        setGoToExternalPage={setGoToExternalPage}
      >
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
        <Page5 />
      </FormWizard>
    );
  };
  render(<FormWizardWrapper />);
};

describe("FormWizard", () => {
  it("should initially render the form with page 1 with no back button", () => {
    renderForm();

    expect(screen.queryByText("< Back")).toBeNull();

    expect(screen.queryByText("Page 1")).not.toBeNull();
    expect(screen.queryByText("Page 2")).toBeNull();
    expect(screen.queryByText("Page 3")).toBeNull();
    expect(screen.queryByText("Page 4")).toBeNull();
    expect(screen.queryByText("Page 5")).toBeNull();
  });

  it(
    "clicking continue button will show next page and " +
      "submit function is not called as not on last page",
    () => {
      renderForm();

      const continueButton = screen.getByText("Continue");

      fireEvent.click(continueButton);

      expect(screen.queryByText("Page 1")).toBeNull();
      expect(screen.queryByText("Page 2")).not.toBeNull();
      expect(screen.queryByText("Page 3")).toBeNull();
      expect(screen.queryByText("Page 4")).toBeNull();
      expect(screen.queryByText("Page 5")).toBeNull();

      fireEvent.click(continueButton);

      expect(screen.queryByText("Page 1")).toBeNull();
      expect(screen.queryByText("Page 2")).toBeNull();
      expect(screen.queryByText("Page 3")).not.toBeNull();
      expect(screen.queryByText("Page 4")).toBeNull();
      expect(screen.queryByText("Page 5")).toBeNull();

      expect(mockSubmit).toBeCalledTimes(0);
    }
  );

  it("clicking back button will show previous page", () => {
    renderForm();

    const continueButton = screen.getByText("Continue");

    fireEvent.click(continueButton);

    expect(screen.queryByText("Page 1")).toBeNull();
    expect(screen.queryByText("Page 2")).not.toBeNull();

    const backButton = screen.getByText("< Back");

    expect(backButton).not.toBeNull();

    fireEvent.click(backButton);

    expect(screen.queryByText("Page 1")).not.toBeNull();
    expect(screen.queryByText("Page 2")).toBeNull();
  });

  it(
    "final page should show 'Accept and send' button " +
      "and when clicked on will run submit function",
    () => {
      renderForm();

      const continueButton = screen.getByText("Continue");

      fireEvent.click(continueButton);
      fireEvent.click(continueButton);
      fireEvent.click(continueButton);
      fireEvent.click(continueButton);

      expect(screen.queryByText("Continue")).toBeNull();

      const acceptAndSendButton = screen.getByText("Accept and send");

      fireEvent.click(acceptAndSendButton);

      expect(mockSubmit).toBeCalledTimes(1);
    }
  );

  it(
    "validate function is called at various points " +
      "should it be present as a prop on current page",
    () => {
      const mockValidate = jest.fn();

      render(
        <FormWizard onSubmit={() => {}}>
          <Page1WithField validate={mockValidate} />
          <Page2 />
        </FormWizard>
      );

      // Validate called initially
      expect(mockValidate).toBeCalledTimes(1);

      const textBox = screen.getByRole("textbox");
      fireEvent.change(textBox, { target: { value: "123" } });

      // Validate called again on when a field changes
      expect(mockValidate).toBeCalledTimes(2);

      const continueButton = screen.getByText("Continue");
      fireEvent.click(continueButton);

      // Validate called again when page is submitted
      expect(mockValidate).toBeCalledTimes(3);
    }
  );

  it("if 'go to' page set then that page will be rendered", () => {
    renderForm(2);

    expect(screen.queryByText("< Back")).not.toBeNull();

    expect(screen.queryByText("Page 1")).toBeNull();
    expect(screen.queryByText("Page 2")).toBeNull();
    expect(screen.queryByText("Page 3")).not.toBeNull();
    expect(screen.queryByText("Page 4")).toBeNull();
    expect(screen.queryByText("Page 5")).toBeNull();
  });

  it(
    "if 'go to' page set then when click continue on " +
      "current page it will go to last page",
    () => {
      renderForm(2);

      const continueButton = screen.getByText("Continue");
      fireEvent.click(continueButton);

      expect(screen.queryByText("Page 1")).toBeNull();
      expect(screen.queryByText("Page 2")).toBeNull();
      expect(screen.queryByText("Page 3")).toBeNull();
      expect(screen.queryByText("Page 4")).toBeNull();
      expect(screen.queryByText("Page 5")).not.toBeNull();
    }
  );

  it(
    "if 'go to' page is set and I click previous, once on previous page " +
      "if I click continue it will just go to next page",
    () => {
      renderForm(2);

      const backButton = screen.getByText("< Back");
      fireEvent.click(backButton);

      expect(screen.queryByText("Page 1")).toBeNull();
      expect(screen.queryByText("Page 2")).not.toBeNull();
      expect(screen.queryByText("Page 3")).toBeNull();
      expect(screen.queryByText("Page 4")).toBeNull();
      expect(screen.queryByText("Page 5")).toBeNull();

      const continueButton = screen.getByText("Continue");
      fireEvent.click(continueButton);

      expect(screen.queryByText("Page 1")).toBeNull();
      expect(screen.queryByText("Page 2")).toBeNull();
      expect(screen.queryByText("Page 3")).not.toBeNull();
      expect(screen.queryByText("Page 4")).toBeNull();
      expect(screen.queryByText("Page 5")).toBeNull();
    }
  );

  it("hides continue button if prop passed in to indicate this", () => {
    render(
      <FormWizard onSubmit={() => {}}>
        <Page1 hideSubmit />
        <Page2 />
      </FormWizard>
    );

    expect(screen.queryAllByText("Continue").length).toBe(0);
  });

  it("if 'external' page set then that page will be rendered", () => {
    renderForm(null, 3);

    expect(screen.queryByText("< Back")).not.toBeNull();

    expect(screen.queryByText("Page 1")).toBeNull();
    expect(screen.queryByText("Page 2")).toBeNull();
    expect(screen.queryByText("Page 3")).toBeNull();
    expect(screen.queryByText("Page 4")).not.toBeNull();
    expect(screen.queryByText("Page 5")).toBeNull();
  });

  it("if 'external' page set then when click continue on current page it will go to next page ", () => {
    renderForm(null, 2);

    const continueButton = screen.getByText("Continue");
    fireEvent.click(continueButton);

    expect(screen.queryByText("Page 1")).toBeNull();
    expect(screen.queryByText("Page 2")).toBeNull();
    expect(screen.queryByText("Page 3")).toBeNull();
    expect(screen.queryByText("Page 4")).not.toBeNull();
    expect(screen.queryByText("Page 5")).toBeNull();
  });

  it("if 'external' page set then when click back on current page it will go to previous page ", () => {
    renderForm(null, 2);

    const backButton = screen.getByText("< Back");
    fireEvent.click(backButton);

    expect(screen.queryByText("Page 1")).toBeNull();
    expect(screen.queryByText("Page 2")).not.toBeNull();
    expect(screen.queryByText("Page 3")).toBeNull();
    expect(screen.queryByText("Page 4")).toBeNull();
    expect(screen.queryByText("Page 5")).toBeNull();
  });

  it(
    "on final page and click 'Accept and send', " +
      "then button should be disabled and loading indicator appears on it ",
    async () => {
      const { container } = render(
        <FormWizard
          onSubmit={() => new Promise((resolve) => setTimeout(resolve, 1000))}
        >
          <Page1 />
          <Page2 />
        </FormWizard>
      );

      const continueButton = screen.getByText("Continue");
      fireEvent.click(continueButton);

      const acceptAndSendButton = screen.getByText("Accept and send");

      expect(acceptAndSendButton.getAttribute("disabled")).toBeNull();
      expect(container.getElementsByClassName("wmnds-loader").length).toBe(0);

      fireEvent.click(acceptAndSendButton);

      expect(acceptAndSendButton.getAttribute("disabled")).not.toBeNull();
      expect(container.getElementsByClassName("wmnds-loader").length).toBe(1);

      await act(() => new Promise((resolve) => setTimeout(resolve, 1500)));

      expect(acceptAndSendButton.getAttribute("disabled")).toBeNull();
      expect(container.getElementsByClassName("wmnds-loader").length).toBe(0);
    }
  );

  it("back button is disabled if corresponding prop passed down", () => {
    render(
      <FormWizard onSubmit={() => {}} disableBackButton>
        <Page1 />
        <Page2 />
      </FormWizard>
    );

    expect(screen.queryByText("Page 1")).not.toBeNull();
    expect(screen.queryByText("Page 2")).toBeNull();

    const continueButton = screen.getByText("Continue");
    fireEvent.click(continueButton);

    expect(screen.queryByText("Page 1")).toBeNull();
    expect(screen.queryByText("Page 2")).not.toBeNull();

    const backButton = screen.getByText("< Back");
    expect(backButton.getAttribute("disabled")).not.toBeNull();

    expect(screen.queryByText("Page 1")).toBeNull();
    expect(screen.queryByText("Page 2")).not.toBeNull();
  });
});
