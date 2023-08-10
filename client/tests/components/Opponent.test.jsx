import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Opponent } from "../../src/components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WebProvider } from "../../src/context/WebContext";

describe("Opponent", () => {
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
      hitFace: mockHitFace,
      minions: [<div key="minion1" />, <div key="minion2" />],
    };

    render(
      <WebProvider>
        <DndProvider backend={HTML5Backend}>
          <Opponent {...defaultProps} />
        </DndProvider>
      </WebProvider>
    );
  });

  it("renders opponent character", () => {
    expect(screen.getByTestId("targetable-hero")).toBeInTheDocument();
  });
});
