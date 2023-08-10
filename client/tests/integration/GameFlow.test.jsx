import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import { WebProvider } from '../../src/context/WebContext';
import { TradingCardMinterProvider } from '../../src/context/TradingCardMinter';
import { Board } from '../../src/containers';

const mockStore = configureStore([thunk]);

describe('Game Flow', () => {
  const initialState = {
    // Initial state for the store
    user: 'you',
    opponent: 'opponent',
    hand: {
      cards: [
        {
          id: 0,
          name: 'The Red Dragon',
          mana: 1,
          attack: 2,
          defense: 2,
          portrait: 'https://i.imgur.com/atJRh8b.jpg',
          description:
            'The Red Dragon is a powerful creature with fiery scales and a fearsome presence. With a mana cost of 1, it can be summoned early in the game to unleash its impressive attack and defense abilities.',
          cardImage: '/cards/3.png',
          type: 'Minion',
        },
        {
          id: 1,
          name: 'Fire Phoenix',
          mana: 2,
          attack: 2,
          defense: 2,
          portrait: 'https://i.imgur.com/RvcO0pg.png',
          description:
            'The Fire Phoenix is a majestic bird that rises from the flames. With a mana cost of 2, it possesses moderate attack and defense capabilities. Its fiery nature makes it a formidable ally in battles.',
          cardImage: '/cards/4.png',
          type: 'Minion',
        },
      ],
    },
    character: {
      Player: {
        health: 30,
        mana: {
          current: 10,
          total: 10,
        },
      },
      Enemy: {
        health: 30,
        mana: {
          current: 0,
          total: 0,
        },
      },
    },
    board: {
      Player: {
        board: [],
        exhaustedMinions: [],
      },
      Opponent: {
        board: [],
        exhaustedMinions: [],
      },
    },
    turn: true,
    current: {
      loading: false,
      gameId: 'sadasdasdas',
      hasOpponent: true,
      gameOver: false,
      isPlayerWinner: false,
      errors: [],
    },
  };

  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    // Render the component with the provided props and store
    render(
      <WebProvider>
        <TradingCardMinterProvider>
          <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
              <BrowserRouter>
                <Board />
              </BrowserRouter>
            </DndProvider>
          </Provider>
        </TradingCardMinterProvider>
      </WebProvider>,
    );
  });

  it('should be able to drag and drop a card from the hand to the board', async () => {
    const card = screen.getAllByTestId('draggableCard')[0];
    const board = screen.getByTestId('dropBoard');

    const expectedActions = [
      {
        payload: {
          card: initialState.hand.cards[0],
          index: 1,
          source: 'PLAYER',
          viaServer: undefined,
        },
        type: 'PLAY_CARD',
      },
      { payload: { target: 'PLAYER', amount: 1 }, type: 'USE_MANA' },
    ];

    fireEvent.dragStart(card);
    fireEvent.dragEnter(board);
    fireEvent.drop(board);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
