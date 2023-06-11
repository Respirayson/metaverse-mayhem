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
      id: 3,
      name: "Fire Phoenix",
      mana: 3,
      attack: 3,
      defense: 5,
      portrait: "https://www.crystalinks.com/PhoenixBlueYellow.jpg",
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
      id: 2,
      name: "The Onion",
      mana: 1,
      attack: 10,
      defense: 1,
      portrait:
        "https://www.macmillandictionary.com/external/slideshow/full/135967_full.jpg",
    };
    const expectedCard2 = {
      id: 4,
      name: "Poison Flower",
      mana: 5,
      attack: 4,
      defense: 4,
      portrait:
        "https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg",
    };

    const card1 = newRandomCard();
    const card2 = newRandomCard();

    expect(mockRandom).toHaveBeenCalledTimes(2);
    expect(card1).toEqual(expectedCard1);
    expect(card2).toEqual(expectedCard2);
  });
});
