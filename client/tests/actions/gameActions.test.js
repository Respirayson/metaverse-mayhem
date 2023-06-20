import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import allActions from "../../src/actions";

const mockStore = configureStore([thunk]);

describe("Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  describe("addMana", () => {
    it("should create an action to add mana with default amount", () => {
      const target = "PLAYER";
      const expectedAction = {
        type: "ADD_MANA",
        payload: { target, amount: 1 },
      };

      store.dispatch(allActions.gameActions.addMana(target));
      const actions = store.getActions();

      expect(actions).toEqual([expectedAction]);
    });

    it("should create an action to add mana with custom amount", () => {
      const target = "OPPONENT";
      const amount = 3;
      const expectedAction = {
        type: "ADD_MANA",
        payload: { target, amount },
      };

      store.dispatch(allActions.gameActions.addMana(target, amount));
      const actions = store.getActions();

      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("newGame", () => {
    it("should create an action to start a new game", () => {
      const user = "Alice";
      const opponent = "Bob";
      const playerStarts = true;
      const expectedActions = [
        {
          type: "ADD_MANA",
          payload: { target: "PLAYER", amount: 1 },
        },
        {
          type: "NEW_GAME",
          payload: { user, opponent, playerStarts },
        },
      ];

      store.dispatch(
        allActions.gameActions.newGame(user, opponent, playerStarts)
      );
      const actions = store.getActions();

      expect(actions).toEqual(expectedActions);
    });

    it("should create an action to start a new game with opponent starting", () => {
      const user = "Alice";
      const opponent = "Bob";
      const playerStarts = false;
      const expectedActions = [
        {
          type: "ADD_MANA",
          payload: { target: "OPPONENT", amount: 1 },
        },
        {
          type: "NEW_GAME",
          payload: { user, opponent, playerStarts },
        },
      ];

      store.dispatch(
        allActions.gameActions.newGame(user, opponent, playerStarts)
      );
      const actions = store.getActions();

      expect(actions).toEqual(expectedActions);
    });
  });

  describe("endTurn", () => {
    it("should create actions to end the turn and perform turn-specific actions (turn = true)", () => {
      store = mockStore({ turn: true }); // Set initial state with turn = false

      const expectedActions = [
        { type: "END_TURN", payload: { source: "OPPONENT" } },
        { type: "ADD_MANA", payload: { target: "OPPONENT", amount: 1 } },
        // Assuming playerActions.drawCard is a valid action creator
        allActions.playerActions.drawCard("OPPONENT"),
      ];

      store.dispatch(allActions.gameActions.endTurn());
      const actions = store.getActions();

      expect(actions).toEqual(expectedActions);
    });

    it("should create actions to end the turn and perform turn-specific actions (turn = false)", () => {
      store = mockStore({ turn: false }); // Set initial state with turn = false

      const expectedActions = [
        { type: "END_TURN", payload: { source: "PLAYER" } },
        { type: "ADD_MANA", payload: { target: "PLAYER", amount: 1 } },
        // Assuming playerActions.drawCard is a valid action creator
        allActions.playerActions.drawCard("PLAYER"),
      ];

      store.dispatch(allActions.gameActions.endTurn());
      const actions = store.getActions();

      expect(actions).toEqual(expectedActions);
    });
  });
});
