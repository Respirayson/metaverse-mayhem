import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Opponent } from "../../src/components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

describe("Opponent", () => {
    const mockDrawCard = vi.fn();
    const mockHitFace = vi.fn();

    let defaultProps;

    beforeEach(() => {
        vi.clearAllMocks();

        defaultProps = {
            name: "Opponent Name",
            handCount: 3,
            character: {
                health: 30,
                mana: {
                    current: 0,
                    total: 0,
                },
            },
            drawCard: mockDrawCard,
            hitFace: mockHitFace,
            minions: [<div key="minion1" />, <div key="minion2" />],
        };

        render(
            <DndProvider backend={HTML5Backend}>
                <Opponent {...defaultProps} />
            </DndProvider>
        );
    });

    it("renders opponent name", () => {
        expect(screen.getByText("Opponent Name")).toBeInTheDocument();
        expect(screen.getByText("Opponent Name").className).toBe(
            "OpponentName"
        );
    });

    it('renders opponent name as "Unnamed" when name prop is not provided', () => {
        defaultProps.name = null;
        render(
            <DndProvider backend={HTML5Backend}>
                <Opponent {...defaultProps} />
            </DndProvider>
        );
        expect(screen.getByText("Unnamed")).toBeInTheDocument();
    });

    it("renders opponent character", () => {
        expect(screen.getByTestId("targetable-hero")).toBeInTheDocument();
    });

    it("calls drawCard when opponent name is clicked", () => {
        fireEvent.click(screen.getByText("Opponent Name"));
        expect(mockDrawCard).toHaveBeenCalled();
    });
});
