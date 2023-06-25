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
        it("should create an action to add maximum mana", () => {
            const target = "PLAYER";
            const amount = 2;
            const viaServer = true;
            const expectedAction = {
                type: "ADD_MAX_MANA",
                payload: { target, amount, viaServer },
            };

            expect(
                allActions.gameActions.addMaxMana(target, amount, viaServer)
            ).toEqual(expectedAction);
        });

        it("should create an action to add playable mana", () => {
            const target = "PLAYER";
            const amount = 2;
            const expectedAction = {
                type: "ADD_PLAYABLE_MANA",
                payload: { target, amount },
            };

            expect(
                allActions.gameActions.addPlayableMana(target, amount)
            ).toEqual(expectedAction);
        });

        it("should create an action to fill mana", () => {
            const target = "PLAYER";
            const viaServer = false;
            const expectedAction = {
                type: "FILL_MANA",
                payload: { target, viaServer },
            };

            expect(allActions.gameActions.fillMana(target, viaServer)).toEqual(
                expectedAction
            );
        });
    });

    describe("newGame", () => {
        it("should create an action to start a new game", () => {
            const user = "123";
            const opponent = "456";
            const playerStarts = true;
            const viaServer = true;
            const expectedActions = [
                {
                    type: "ADD_MAX_MANA",
                    payload: { target: "PLAYER", amount: 1, viaServer },
                },
                {
                    type: "FILL_MANA",
                    payload: { target: "PLAYER", viaServer },
                },
                {
                    type: "NEW_GAME",
                    payload: { user, opponent, playerStarts, viaServer },
                },
            ];

            store.dispatch(
                allActions.gameActions.newGame(
                    user,
                    opponent,
                    playerStarts,
                    viaServer
                )
            );

            expect(store.getActions()).toEqual(expectedActions);
        });

        it("should create actions to end the turn", () => {
            const expectedActions = [
                { type: "END_TURN", payload: { source: "OPPONENT" } },
                {
                    type: "ADD_MAX_MANA",
                    payload: {
                        target: "OPPONENT",
                        amount: 1,
                        viaServer: undefined,
                    },
                },
                {
                    type: "FILL_MANA",
                    payload: { target: "OPPONENT", viaServer: undefined },
                },
                {
                    type: "DRAW_CARD",
                    payload: { target: "OPPONENT", viaServer: undefined },
                },
            ];

            const store = mockStore({ turn: true });
            store.dispatch(allActions.gameActions.endTurn());

            expect(store.getActions()).toEqual(expectedActions);
        });

        it("should create an action to end the game", () => {
            const target = "PLAYER";
            const expectedAction = {
                type: "END_GAME",
                payload: { target },
            };

            expect(allActions.gameActions.endGame(target)).toEqual(expectedAction);
        });
    });

    describe("Async Actions", () => {
        it("should dispatch addMaxMana and fillMana actions", () => {
            const target = "PLAYER";
            const amount = 2;
            const viaServer = false;
            const expectedActions = [
                {
                    type: "ADD_MAX_MANA",
                    payload: { target, amount, viaServer },
                },
                { type: "FILL_MANA", payload: { target, viaServer } },
            ];

            store.dispatch(allActions.gameActions.addAndFillMana(target, amount, viaServer));

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
