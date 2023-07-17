import React from "react";
import { render, screen } from "@testing-library/react";
import NewFeatures from "../../src/components/NewFeatures";

describe("NewFeatures", () => {
  it("renders the component with correct content", () => {
    render(<NewFeatures />);

    const titleElement = screen.getByText(/what's new about metaverse mayhem?/i);
    const featureCards = screen.getAllByRole("img");

    expect(titleElement).toBeInTheDocument();
    expect(featureCards).toHaveLength(2);

  });
});
