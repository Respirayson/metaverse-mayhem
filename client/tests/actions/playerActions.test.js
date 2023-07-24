import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import playerActions from "../../src/actions/playerActions";
import allActions from "../../src/actions";
import gameActions, { USE_MANA } from "../../src/actions/gameActions";

describe("Player Actions", () => {
  let store;
  const mockStore = configureStore([thunk]);

  beforeEach(() => {
    store = mockStore({
      character: {
        Player: {
          health: 30,
          mana: {
            max: 0,
            current: 0,
          }
        }
      }
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  describe("playCard", () => {
    it("should create an action to play a card", () => {
      const card = { name: "Fireball", cost: 3 };
      const index = 1;
      const source = "PLAYER";
      const expectedAction = {
        type: "PLAY_CARD",
        payload: { card, index, source },
      };

      store.dispatch(playerActions.playCard(card, index, source));
      const actions = store.getActions();

      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("drawCard", () => {
    it("should create an action to draw a card", () => {
      const target = "PLAYER";
      const expectedAction = {
        type: "DRAW_CARD",
        payload: { target },
      };

      store.dispatch(playerActions.drawCard(target));
      const actions = store.getActions();

      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("hitFace", () => {
    it("should create an action to hit the face", () => {
      const card = { name: "Dragon", defense: 5, key: "Dragon123" };
      const target = "OPPONENT";
      const expectedAction = {
        type: "HIT_FACE",
        payload: { card, target },
      };

      store.dispatch(playerActions.hitFace(card, target));
      const actions = store.getActions();

      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("hitMinion", () => {
    it("should create an action to hit a minion", () => {
      const attack = 4;
      const minion = { name: "Dragon", defense: 5, key: "Dragon123" };
      const source = "PLAYER";
      const expectedAction = {
        type: "HIT_MINION",
        payload: { attack, minion, source },
      };

      store.dispatch(playerActions.hitMinion(attack, minion, source));
      const actions = store.getActions();

      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("killMinion", () => {
    it("should create an action to kill a minion", () => {
      const target = "Dragon123";
      const source = "PLAYER";
      const expectedAction = {
        type: "KILL_MINION",
        payload: { key: target, source },
      };

      store.dispatch(playerActions.killMinion(target, source));
      const actions = store.getActions();

      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("attackMinion", () => {
    it("should create actions to attack a minion and handle counter-attack", () => {
      const attack = 6;
      const counterAttack = 3;
      const minion = { name: "Dragon", defense: 5, key: "Dragon123" };
      const from = { name: "Knight", defense: 4, key: "Knight456" };
      const expectedActions = [
        {
          type: "HIT_MINION",
          payload: { attack, minion: minion, source: "PLAYER" },
        },
        {
          type: "HIT_MINION",
          payload: {
            attack: counterAttack,
            minion: from,
            source: "OPPONENT",
          },
        },
        {
          type: "KILL_MINION",
          payload: { key: minion.key, source: "PLAYER" },
        },
      ];

      store.dispatch(
        playerActions.attackMinion(attack, counterAttack, minion, from)
      );
      const actions = store.getActions();

      expect(actions).toEqual(expectedActions);
    });

    it("should not create a killMinion action if attack does not exceed target defense but create killMinion action for counterAttack", () => {
      const attack = 3;
      const counterAttack = 5;
      const target = { name: "Dragon", defense: 5, key: "Dragon123" };
      const source = { name: "Knight", defense: 4, key: "Knight456" };
      const expectedActions = [
        {
          type: "HIT_MINION",
          payload: { attack, minion: target, source: "PLAYER" },
        },
        {
          type: "HIT_MINION",
          payload: {
            attack: counterAttack,
            minion: source,
            source: "OPPONENT",
          },
        },
        {
          type: "KILL_MINION",
          payload: { key: source.key, source: "OPPONENT" },
        },
      ];

      store.dispatch(
        playerActions.attackMinion(attack, counterAttack, target, source)
      );
      const actions = store.getActions();

      expect(actions).toEqual(expectedActions);
    });

    it("should not create a killMinion action if counterAttack does not exceed source defense but create killMinion action for attack", () => {
      const attack = 6;
      const counterAttack = 2;
      const target = { name: "Dragon", defense: 5, key: "Dragon123" };
      const source = { name: "Knight", defense: 4, key: "Knight456" };
      const expectedActions = [
        {
          type: "HIT_MINION",
          payload: { attack, minion: target, source: "PLAYER" },
        },
        {
          type: "HIT_MINION",
          payload: {
            attack: counterAttack,
            minion: source,
            source: "OPPONENT",
          },
        },
        {
          type: "KILL_MINION",
          payload: { key: target.key, source: "PLAYER" },
        },
      ];

      store.dispatch(
        playerActions.attackMinion(attack, counterAttack, target, source)
      );
      const actions = store.getActions();

      expect(actions).toEqual(expectedActions);
    });
  });

  describe("attackHero", () => {
    it("should create actions to attack the hero", () => {
      const card = { name: "Dragon", defense: 5, key: "Dragon123" };
      const target = "OPPONENT";
      const expectedAction = {
        type: "HIT_FACE",
        payload: { card, target },
      };

      store.dispatch(playerActions.attackHero(card, target));
      const actions = store.getActions();

      expect(actions).toEqual([expectedAction]);
    });
  });

  describe("spendManaAndPlayCard", () => {
    it("should not create an action to play a card if there is not enough mana", () => {
      const card = { name: "Fireball", mana: 3 };
      const index = 1;
      const source = "PLAYER";
      const target = "OPPONENT";
      const amount = 1;
      const expectedAction = [
        {
          payload: { target: source, amount }, type: "ADD_PLAYABLE_MANA"
        },
        {
          type: "PLAY_CARD",
          payload: { card, index, source },
        },
        { payload: { target, amount }, type: "USE_MANA" },
      ];
      store.dispatch(gameActions.addPlayableMana(source, amount));
      store.dispatch(playerActions.spendManaAndPlayCard(card, index, source));
      const actions = store.getActions();

      expect(actions).not.toEqual(expectedAction);
    });

    it("should create an action to play a card if there is enough mana", () => {
      store = mockStore({
        character: {
          Player: {
            health: 30,
            mana: {
              max: 0,
              current: 6,
            }
          }
        }
      });
      const card = { name: "Fireball", mana: 1 };
      const index = 1;
      const source = "PLAYER";
      const expectedAction = [
        {
          type: "PLAY_CARD",
          payload: { card, index, source, viaServer: undefined },
        },
        { payload: { target: source, amount: card.mana }, type: "USE_MANA" },
      ];
      store.dispatch(playerActions.spendManaAndPlayCard(card, index, source));
      const actions = store.getActions();

      expect(actions).toEqual(expectedAction);
    });
  });
});
