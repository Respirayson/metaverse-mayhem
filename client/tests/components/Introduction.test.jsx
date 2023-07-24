import React from "react";
import { render, screen } from "@testing-library/react";
import Introduction from "../../src/components/Introduction";

describe("Introduction", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with the correct content", () => {
    render(<Introduction />);

    const heading1 = screen.getByText("Join the");
    const heading2 = screen.getByText("Battle");
    const image = screen.getByAltText("intro_cover");
    const stamp = screen.getByAltText("stamp");

    expect(heading1).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(stamp).toBeInTheDocument();
  });
});
