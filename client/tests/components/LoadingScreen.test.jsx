import { render, screen, fireEvent } from "@testing-library/react";
import LoadingScreen from "../../src/components/LoadingScreen";
import { BrowserRouter, useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    // your mocked methods
    useNavigate: vi.fn(),
  };
});

describe("LoadingScreen", () => {
  // Set up the test data
  const loading = true;
  const gameId = "ABC123";
  const battleName = "Battle Name";
  const navigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigate);
    // Render the component
    render(
      <BrowserRouter>
        <LoadingScreen
          loading={loading}
          gameId={gameId}
          battleName={battleName}
        />
      </BrowserRouter>
    );
  });

  it("should render the loading screen with correct content", () => {
    // Assert that the loading screen content is rendered correctly
    expect(
      screen.getByText(/waiting for a worthy opponent/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/protip: send the game id to your friends/i)
    ).toBeInTheDocument();
    expect(screen.getByAltText("player01")).toBeInTheDocument();
    expect(screen.getByAltText("player02")).toBeInTheDocument();
    expect(screen.getByText(battleName)).toBeInTheDocument();
    expect(screen.getByText(/join an existing game/i)).toBeInTheDocument();
  });

  it("should render the loading screen without loading state", () => {
    // Assert that the loading screen content is rendered correctly
    expect(
      screen.getByText(/waiting for a worthy opponent/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/protip: send the game id to your friends/i)
    ).toBeInTheDocument();
    expect(screen.getByAltText("player01")).toBeInTheDocument();
    expect(screen.getByAltText("player02")).toBeInTheDocument();
    expect(screen.getByText(battleName)).toBeInTheDocument();
    expect(screen.getByText(/join an existing game/i)).toBeInTheDocument();
  });

  it("should render the loading screen with game id", () => {
    render(
      <BrowserRouter>
        <LoadingScreen
          loading={!loading}
          gameId={gameId}
          battleName={battleName}
        />
      </BrowserRouter>
    );

    // Assert that the loading screen content is rendered correctly
    expect(screen.getByText(/ABC123/i)).toBeInTheDocument();
  });

  it("should navigate", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalled();
  });
});
