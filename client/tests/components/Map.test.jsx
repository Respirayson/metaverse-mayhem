import React from "react";
import { render, screen } from "@testing-library/react";
import Map from "../../src/components/Map";

describe("Map", () => {
  it("renders the component with correct content", () => {
    render(<Map />);

    const inviteTextElement = screen.getByText(/invite your friends/i);
    const mapImageElement = screen.getByAltText(/map/i);
    const peopleIcons = screen.getAllByAltText(/people/i);

    expect(inviteTextElement).toBeInTheDocument();
    expect(mapImageElement).toBeInTheDocument();
    expect(peopleIcons).toHaveLength(3);
  });
});
