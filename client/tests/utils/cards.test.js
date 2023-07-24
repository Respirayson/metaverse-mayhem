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
      id: 20,
      name: "Capybara",
      mana: 2,
      attack: 2,
      defense: 3,
      portrait: "/portraits/23.jpg",
      description:
        "Capybara is a friendly and sociable creature found in the wild. With a mana cost of 2, it has moderate attack and defense capabilities. Its friendly nature can sometimes influence the actions of opponents.",
      cardImage: "/cards/23.png",
      type: "Minion",
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
      id: 12,
      name: "Poison Flower",
      mana: 5,
      attack: 5,
      defense: 4,
      portrait: "https://i.imgur.com/6X8bwdM.jpg",
      description:
        "The Poison Flower is a sinister and deadly card. With a mana cost of 5, it can poison enemies with its toxic attacks, gradually wearing them down. It possesses high attack and defense capabilities.",
      cardImage: "/cards/15.png",
      type: "Minion",
    };
    const expectedCard2 = {
      id: 28,
      name: "Seashell",
      mana: 1,
      attack: 3,
      defense: 1,
      portrait: "/portraits/31.jpg",
      description:
        "Seashell is a beautiful shell found on beaches. With a mana cost of 1, it has no attack power and low defense. It serves as a decorative piece rather than a formidable minion.",
      cardImage: "/cards/31.png",
      type: "Minion",
    };

    const card1 = newRandomCard();
    const card2 = newRandomCard();

    expect(mockRandom).toHaveBeenCalledTimes(2);
    expect(card1).toEqual(expectedCard1);
    expect(card2).toEqual(expectedCard2);
  });
});
