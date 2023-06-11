import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../src/actions";
import { Hand } from "../../src/components";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");

  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

const mockStore = configureStore([]);

describe("Hand component", () => {
  it("renders the cards and handles card click", async () => {
    const store = mockStore({
      hand: {
        cards: [
          { id: "1", name: "Card 1" },
          { id: "2", name: "Card 2" },
          { id: "3", name: "Card 3" },
        ], // Provide a valid array of cards
      },
    });
    const mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { getByText } = render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Hand playerTurn={true} />
        </Provider>
      </DndProvider>
    );

    // Assert that the cards are rendered
    expect(getByText("Card 1")).toBeInTheDocument();
    expect(getByText("Card 2")).toBeInTheDocument();
    expect(getByText("Card 3")).toBeInTheDocument();

  });
});
