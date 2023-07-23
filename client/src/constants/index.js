const itemTypes = {
  CARD: 'card',
  MINION: 'minion',
};

export const exploreCards = [
  {
    id: 'card-1',
    imgUrl: 'https://i.imgur.com/98C2bwX.jpg',
    title: 'SSS Snake',
  },
  {
    id: 'card-2',
    imgUrl: 'https://i.imgur.com/xD2yWMl.jpg',
    title: 'Booo',
  },
  {
    id: 'card-3',
    imgUrl: 'https://i.imgur.com/uSlX1eM.jpg',
    title: 'Angry Cat',
  },
  {
    id: 'card-4',
    imgUrl: 'https://i.imgur.com/JkZwHJG.jpg',
    title: 'The Wizard Frog',
  },
  {
    id: 'card-5',
    imgUrl: 'https://i.imgur.com/RvcO0pg.png',
    title: 'Fire Phoenix',
  },
];

export const features = [
  'Build a collection of unique digital cards',
  'Fight against other players in the arena',
  'Trade your cards with other players and have fun!',
];

export const newFeatures = [
  {
    imgUrl: '/vrpano.svg',
    title: 'Your Own Cards',
    subtitle:
      'Cards will be minted as NFTs on the Ethereum blockchain, and you will be able to trade them with other players',
  },
  {
    imgUrl: '/headset.svg',
    title: 'Fun Gameplay',
    subtitle:
      'You will be able to fight against other players in the arena, and win rewards for your victories',
  },
];

export const socials = [
  {
    name: 'twitter',
    url: '/twitter.svg',
  },
  {
    name: 'linkedin',
    url: '/linkedin.svg',
  },
  {
    name: 'instagram',
    url: '/instagram.svg',
  },
  {
    name: 'facebook',
    url: '/facebook.svg',
  },
];

export const gameRules = [
  'Players start with 15 cards in their deck, a hero, and 1 mana.',
  'The game progresses in turns, with players alternating.',
  'Each turn, players gain 1 mana, up to a maximum of 10, and draw a card.',
  'Cards can be played by spending the appropriate amount of mana.',
  'Minions can be placed on the game board and can attack enemy minions or the opponent\'s hero.',
  'The game ends when one player\'s health reaches zero, declaring the opposing player as the winner.',
];

export const sideBarLinks = [
  {
    name: 'All Listings',
    id: 'all-listings',
    imgUrl: '/marketplace.svg',
    link: '/marketplace',
  },
  {
    name: 'My Listings',
    id: 'my-listings',
    imgUrl: '/my-listings.svg',
    link: '/marketplace/my-listings',
  },
  {
    name: 'Store',
    id: 'store',
    imgUrl: '/store.svg',
    link: '/marketplace/store',
  },
  {
    name: 'Create Listing',
    id: 'create-listing',
    imgUrl: '/create-listing.svg',
    link: '/marketplace/create-listing',
  },
];

export default itemTypes;
