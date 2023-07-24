import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { OpponentContainer } from "../../src/containers";
import { TradingCardMinterProvider } from "../../src/context/TradingCardMinter";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { WebProvider } from "../../src/context/WebContext";

describe("OpponentContainer", () => {
  const mockStore = configureStore();
  const initialState = {
    // Initial state for the store
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("renders the opponent container with the provided props", async () => {
    const name = "Opponent Name";
    const handCount = 3;
    const character = {
      health: 100,
      mana: {
        current: 50,
        total: 100,
      },
    };
    const turn = true;
    const board = [];
    const exhaustedMinions = [];
    window.alert = vi.fn();

    // Render the component with the provided props and store
    render(
      <WebProvider>
        <TradingCardMinterProvider>
          <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
              <OpponentContainer
                name={name}
                handCount={handCount}
                character={character}
                turn={turn}
                board={{ board, exhaustedMinions }}
              />
            </DndProvider>
          </Provider>
        </TradingCardMinterProvider>
      </WebProvider>
    );

    // Assert that the opponent name is rendered
    fireEvent.mouseEnter(screen.getByTestId("player"));
    expect(await screen.findByText(/Opponent Name/i)).toBeInTheDocument();
  });
});
