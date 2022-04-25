import { render, screen } from "@testing-library/react";

import ProgressIndicator from "./ProgressIndicator";

describe("ProgressIndicator", () => {
  it("renders section position and section name appropriately", () => {
    render(
      <ProgressIndicator sectionPosition="1 of 2" sectionName="Test Section" />
    );

    expect(screen.getByText("1 of 2")).toBeDefined();

    const heading = screen.getByRole("heading");
    expect(heading.innerHTML).toEqual("Test Section");
  });
});
