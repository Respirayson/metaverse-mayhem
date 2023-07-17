import React from "react";
import { render, screen } from "@testing-library/react";
import FeatureCard from "../../src/components/FeatureCard";

describe("FeatureCard", () => {
  it("renders the card correctly with provided props", () => {
    const imgUrl = "image.jpg";
    const title = "Feature Title";
    const subtitle = "Feature Subtitle";

    render(
      <FeatureCard imgUrl={imgUrl} title={title} subtitle={subtitle} />
    );

    const cardImage = screen.getByAltText("icon");
    const cardTitle = screen.getByText(title);
    const cardSubtitle = screen.getByText(subtitle);

    expect(cardImage).toBeInTheDocument();
    expect(cardImage.getAttribute("src")).toBe(imgUrl);
    expect(cardTitle).toBeInTheDocument();
    expect(cardSubtitle).toBeInTheDocument();
  });
});
