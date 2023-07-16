import { newRandomCard } from '../../src/utils/cards';

describe('newRandomCard', () => {
  let original;
  beforeEach(() => {
    original = Math.random;
    vi.resetAllMocks();
  });

  afterEach(() => {
    Math.random = original;
    vi.spyOn(Math, 'random').mockRestore();
  });

  it('should return a random card', () => {
    const mockRandom = vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const expectedCard = {
      id: 8,
      name: 'The onion',
      mana: 3,
      attack: 4,
      defense: 3,
      portrait: 'https://i.imgur.com/JXVC7lU.png?1',
      description:
        'The onion is a card with a peculiar set of abilities. With a mana cost of 3, it can make opponents shed tears with its potent attack and defense capabilities. It possesses an aura of protection that reduces incoming damage.',
      cardImage: '/cards/11.png',
      type: 'Minion',
    };

    const card = newRandomCard();

    expect(mockRandom).toHaveBeenCalled();
    expect(card).toEqual(expectedCard);
  });

  it('should return a different random card on subsequent calls', () => {
    const mockRandom = vi
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.7);
    const expectedCard1 = {
      id: 4,
      name: 'The Wizard Frog',
      mana: 3,
      attack: 4,
      defense: 3,
      portrait: 'https://i.imgur.com/JkZwHJG.jpg',
      description:
        'The Wizard Frog is a magical creature with impressive attack and defense capabilities. With a mana cost of 3, it can be a key player in battles, casting powerful spells and conjuring defensive shields.',
      cardImage: '/cards/7.png',
      type: 'Minion',
    };
    const expectedCard2 = {
      id: 11,
      name: 'Bee Bee',
      mana: 4,
      attack: 5,
      defense: 3,
      portrait: 'https://i.imgur.com/3RB2DYl.jpg',
      description:
        'Bee Bee is a buzzing card that commands the power of a swarm. With a mana cost of 4, it can overwhelm opponents with its high attack and disrupt their strategies. It has decent defense to withstand retaliation.',
      cardImage: '/cards/14.png',
      type: 'Minion',
    };

    const card1 = newRandomCard();
    const card2 = newRandomCard();

    expect(mockRandom).toHaveBeenCalledTimes(2);
    expect(card1).toEqual(expectedCard1);
    expect(card2).toEqual(expectedCard2);
  });
});
