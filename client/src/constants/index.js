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
  'Card with the same defense and attack point will cancel each other out.',
  'Attack points from the attacking card will deduct the opposing player’s health points.',
  'If P1 does not defend, their health wil be deducted by P2’s attack.',
  'If P1 defends, P2’s attack is equal to P2’s attack - P1’s defense.',
  'If a player defends, they refill 3 Mana',
  'If a player attacks, they spend 3 Mana',
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
    name: 'Create Listing',
    id: 'create-listing',
    imgUrl: '/create-listing.svg',
    link: '/marketplace/create-listing',
  },
];

export default itemTypes;
