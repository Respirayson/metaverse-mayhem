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

    it("renders targetable hero", () => {
        expect(
            screen.getAllByTestId("targetable-player-hero")[0]
        ).toBeInTheDocument();
    });

    it("renders end turn button", () => {
        expect(screen.getByText("End Turn")).toBeInTheDocument();
    });

    it("calls onClick when end turn button is clicked", () => {
        fireEvent.click(screen.getByText("End Turn"));
        expect(mockOnClick).toHaveBeenCalled();
    });
});
