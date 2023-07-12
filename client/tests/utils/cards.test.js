import { newRandomCard } from "../../src/utils/cards";

describe("newRandomCard", () => {
    let original;
    beforeEach(() => {
        original = Math.random;
        vi.resetAllMocks();
    });

    afterEach(() => {
        Math.random = original;
        vi.spyOn(Math, "random").mockRestore();
    });

    it("should return a random card", () => {
        const mockRandom = vi.spyOn(Math, "random").mockReturnValue(0.5);
        const expectedCard = {
            id: 9,
            name: "The onion",
            mana: 3,
            attack: 4,
            defense: 3,
            portrait: "https://i.imgur.com/JXVC7lU.png?1",
        };

        const card = newRandomCard();

        expect(mockRandom).toHaveBeenCalled();
        expect(card).toEqual(expectedCard);
    });

    it("should return a different random card on subsequent calls", () => {
        const mockRandom = vi
            .spyOn(Math, "random")
            .mockReturnValueOnce(0.3)
            .mockReturnValueOnce(0.7);
        const expectedCard1 = {
            id: 5,
            name: "The Wizard Frog",
            mana: 3,
            attack: 4,
            defense: 3,
            portrait: "https://i.imgur.com/JkZwHJG.jpg",
        };
        const expectedCard2 = {
            id: 12,
            name: "Bee Bee",
            mana: 4,
            attack: 5,
            defense: 3,
            portrait: "https://i.imgur.com/3RB2DYl.jpg",
        };

        const card1 = newRandomCard();
        const card2 = newRandomCard();

        expect(mockRandom).toHaveBeenCalledTimes(2);
        expect(card1).toEqual(expectedCard1);
        expect(card2).toEqual(expectedCard2);
    });
});
