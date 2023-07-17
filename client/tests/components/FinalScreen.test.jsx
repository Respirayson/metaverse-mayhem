import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import FinalScreen from "../../src/components/FinalScreen";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("FinalScreen", () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders the correct content for a winner", () => {
    const isWinner = true;
    localStorage.setItem("username", "John Doe");

    render(<FinalScreen isWinner={isWinner} />);

    const congratulationsText = screen.getByText(/Congratulations/i);
    const playerName = screen.getByText(/John Doe/i);
    const goBackButton = screen.getByText(/Go back to /i);

    expect(congratulationsText).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(goBackButton).toBeInTheDocument();
  });

  it("renders the correct content for a loser", () => {
    const isWinner = false;
    localStorage.setItem("username", "John Doe");

    render(<FinalScreen isWinner={isWinner} />);

    const oopsSorryText = screen.getByText(/Oops sorry/i);
    const playerName = screen.getByText(/John Doe/i);
    const goBackButton = screen.getByText(/Go back to Home/i);

    expect(oopsSorryText).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(goBackButton).toBeInTheDocument();
  });

  it("calls the navigate and reload functions when the Go back button is clicked", () => {
    const isWinner = true;
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<FinalScreen isWinner={isWinner} />);

    const goBackButton = screen.getByRole('button');
    fireEvent.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
