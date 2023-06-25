import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Player } from "../../src/components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

describe("Player", () => {
    const mockOnClick = vi.fn();
    const mockDrawCard = vi.fn();

    const mockStore = configureMockStore();
    const initialState = {
        // Define your initial state here
        hand: {
            cards: [],
        },
    };
    const store = mockStore(initialState);

    var defaultProps;

    beforeEach(() => {
        vi.clearAllMocks();
        defaultProps = {
            name: "Player Name",
            board: {
                board: [], // Player's board of cards
                exhaustedMinions: [], // Array of IDs of exhausted minions
            },
            character: {
                health: 30,
                mana: {
                    current: 0,
                    total: 0,
                },
            },
            playerTurn: true,
            onClick: mockOnClick,
            turn: 5,
            drawCard: mockDrawCard,
        };

        render(
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <Player {...defaultProps} />
                </DndProvider>
            </Provider>
        );
    });

    it("renders player name", () => {
        expect(screen.getByText("Player Name")).toBeInTheDocument();
        expect(screen.getByText("Player Name").nodeName).toBe("H1");
        expect(screen.getByText("Player Name").className).toBe("PlayerName");
    });

    it('renders player name as "Unnamed" when name prop is not provided', () => {
        defaultProps.name = "";
        render(
            <Provider store={store}>
                <DndProvider backend={HTML5Backend}>
                    <Player {...defaultProps} />
                </DndProvider>
            </Provider>
        );

        expect(screen.getByText("Unnamed")).toBeInTheDocument();
    });

    it("renders targetable hero", () => {
        expect(
            screen.getAllByTestId("targetable-player-hero")[0]
        ).toBeInTheDocument();
    });

    it("calls drawCard when player name is clicked", () => {
        fireEvent.click(screen.getByText("Player Name"));
        expect(mockDrawCard).toHaveBeenCalled();
    });

    it("renders end turn button", () => {
        expect(screen.getByText("End Turn")).toBeInTheDocument();
    });

    it("calls onClick when end turn button is clicked", () => {
        fireEvent.click(screen.getByText("End Turn"));
        expect(mockOnClick).toHaveBeenCalled();
    });
});
