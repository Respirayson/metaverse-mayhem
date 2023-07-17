import { render, screen } from "@testing-library/react";
import { EnemyMinion } from "../../src/containers";
import { useDrop } from "react-dnd";

vi.mock("react-dnd", () => ({
  useDrop: vi.fn(),
}));

describe("EnemyMinion", () => {
  const mockDrop = vi.fn();
  const isOver = false;
  beforeEach(() => {
    useDrop.mockReturnValue([{ isOver }, mockDrop]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it("should render the enemy minion with correct content", () => {
    // Set up the test data
    const card = {
      key: "123",
      attack: 2,
    };
    const attackMinion = vi.fn();
    const exhaustedMinions = ["456"];
    const turn = true;

    // Render the component
    render(
      <EnemyMinion
        card={card}
        attackMinion={attackMinion}
        exhaustedMinions={exhaustedMinions}
        turn={turn}
      />
    );

    // Assert that the enemy minion content is rendered correctly
    expect(screen.getByText(card.attack)).toBeInTheDocument();
  });
});
