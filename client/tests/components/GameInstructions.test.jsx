import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import GameInstruction from "../../src/components/GameInstruction";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../utils/socket", () => ({
  socket: {
    emit: vi.fn(),
  },
}));

describe("GameInstruction", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("toggles the sidebar when the info icon is clicked", () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);

    render(<GameInstruction />);

    const infoIcon = screen.getAllByRole("button")[0];

    expect(screen.getByTestId("sidebar")).toHaveClass("translate-x-full");

    fireEvent.click(infoIcon);

    expect(screen.getByTestId("sidebar")).toHaveClass("translate-x-0");
  });

  it("leaves the game and navigates to home when the Quit Game button is clicked", () => {
    const navigate = vi.fn();
    useNavigate.mockReturnValue(navigate);
    
    render(<GameInstruction />);

    const quitButton = screen.getAllByRole("button")[1];
    fireEvent.click(quitButton);

    expect(navigate).toHaveBeenCalledWith("/");
  });
});
