import allActions from "../../src/actions";

describe("Action Creators", () => {
    it("should create newGameRequest action with type NEW_GAME_REQUEST", () => {
        const action = allActions.beforeGameActions.newGameRequest();
        expect(action).toEqual({ type: "NEW_GAME_REQUEST" });
    });

    it("should create newGameSuccess action with type NEW_GAME_SUCCESS and gameId payload", () => {
        const gameId = "123";
        const action = allActions.beforeGameActions.newGameSuccess(gameId);
        expect(action).toEqual({
            type: "NEW_GAME_SUCCESS",
            payload: {
                gameId: gameId,
            },
        });
    });

    it("should create newGameFailure action with type NEW_GAME_FAILURE and errors payload", () => {
        const errors = ["Error message 1", "Error message 2"];
        const action = allActions.beforeGameActions.newGameFailure(errors);
        expect(action).toEqual({
            type: "NEW_GAME_FAILURE",
            payload: {
                errors: errors,
            },
        });
    });

    it("should create updateHasOpponent action with type UPDATE_HAS_OPPONENT and hasOpponent payload", () => {
        const hasOpponent = true;
        const action =
            allActions.beforeGameActions.updateHasOpponent(hasOpponent);
        expect(action).toEqual({
            type: "UPDATE_HAS_OPPONENT",
            payload: {
                hasOpponent: hasOpponent,
            },
        });
    });

    it("should create resetGame action with type RESET_GAME", () => {
        const action = allActions.beforeGameActions.resetGame();
        expect(action).toEqual({ type: "RESET_GAME" });
    });

    it("should create newGameSuccess action when joinGame is called", () => {
        const gameId = "456";
        const action = allActions.beforeGameActions.joinGame(gameId);
        expect(action).toEqual(
            allActions.beforeGameActions.newGameSuccess(gameId)
        );
    });
});

describe("isNewGameFetched function", () => {
    it("should return true when force flag is true", () => {
        const state = { current: { gameId: "123" } };
        const force = true;
        const result = allActions.beforeGameActions.isNewGameFetched(
            state,
            force
        );
        expect(result).toBe(true);
    });

    it("should return false when current.gameId is not empty", () => {
        const state = { current: { gameId: "123" } };
        const force = false;
        const result = allActions.beforeGameActions.isNewGameFetched(
            state,
            force
        );
        expect(result).toBe(false);
    });

    it("should return true when current.gameId is empty", () => {
        const state = { current: { gameId: "" } };
        const force = false;
        const result = allActions.beforeGameActions.isNewGameFetched(
            state,
            force
        );
        expect(result).toBe(true);
    });

    it("should return false when current.gameId exists and force flag is false", () => {
        const state = { current: { gameId: "123" } };
        const force = false;
        const result = allActions.beforeGameActions.isNewGameFetched(
            state,
            force
        );
        expect(result).toBe(false);
    });

    it("should return true when current.gameId is empty and force flag is false", () => {
        const state = { current: { gameId: "" } };
        const force = false;
        const result = allActions.beforeGameActions.isNewGameFetched(
            state,
            force
        );
        expect(result).toBe(true);
    });

    it("should return true when force flag is true", () => {
        const state = { current: { gameId: "123" } };
        const force = true;
        const result = allActions.beforeGameActions.isNewGameFetched(
            state,
            force
        );
        expect(result).toBe(true);
    });
});

describe("fetchNewGame thunk action creator", () => {
    it("should not dispatch any actions when isNewGameFetched returns false", () => {
        const dispatchMock = vi.fn();
        const getStateMock = vi.fn(() => ({ current: { gameId: "123" } }));
        const thunk = allActions.beforeGameActions.fetchNewGame();

        thunk(dispatchMock, getStateMock);

        expect(dispatchMock).not.toHaveBeenCalled();
    });

    it("should dispatch newGameRequest action and fetch new game when isNewGameFetched returns true", async () => {
        const dispatchMock = vi.fn();
        const getStateMock = vi.fn(() => ({ current: { gameId: "" } }));

        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ gameId: "456" }),
            })
        );

        const thunk = allActions.beforeGameActions.fetchNewGame();

        await thunk(dispatchMock, getStateMock);

        expect(dispatchMock).toHaveBeenCalledWith(
            allActions.beforeGameActions.newGameRequest()
        );
        expect(dispatchMock).toHaveBeenCalledWith(
            allActions.beforeGameActions.newGameSuccess("456")
        );
    });

    it("should dispatch newGameFailure action when fetch fails", async () => {
        const dispatchMock = vi.fn();
        const getStateMock = vi.fn(() => ({ current: { gameId: "" } }));

        global.fetch = vi.fn(() => Promise.reject(new Error("Fetch error")));

        const thunk = allActions.beforeGameActions.fetchNewGame();

        await thunk(dispatchMock, getStateMock);

        expect(dispatchMock).toHaveBeenCalledWith(
            allActions.beforeGameActions.newGameFailure(
                new Error("Fetch error")
            )
        );
    });
});
