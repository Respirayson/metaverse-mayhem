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
  'Blue is for mana, yellow is for attack, and red is for health',
  "Minions can be placed on the game board and can attack enemy minions or the opponent's hero.",
  "The game ends when one player's health reaches zero, declaring the opposing player as the winner.",
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

const loadingScreenQuotes = [
  'Loading... Traveling through virtual dimensions. Please refrain from pushing buttons in real life.',
  'Patience, young padawan. The metaverse is aligning its pixels just for you.',
  "Loading... It's not a glitch; we're just borrowing some time from the Matrix.",
  "Time dilation detected! Loading... Don't worry, it's just a minor side effect.",
  "Hold tight! The metaverse's intergalactic hamster is powering up the servers.",
  'Loading... Did you know the metaverse is powered by the collective energy of memes?',
  'Grab some virtual popcorn! Our AI technician is doing stand-up comedy while you wait.',
  "Loading... Sorry, our teleportation device is stuck in traffic. We'll be with you shortly.",
  'Entering metaverse simulation... Remember to stretch your virtual legs!',
  'Loading... Our virtual elves are handcrafting every pixel. Quality takes time!',
  'Loading... Please refrain from feeding the virtual ducks. They tend to multiply.',
  'Hold on tight! The metaverse is experiencing a virtual traffic jam. Virtual horns are not recommended.',
  "Loading... Our virtual hamsters are running on tiny treadmills to power up your experience. Don't forget to cheer them on!",
  "Caution: Time loops detected. You might experience déjà vu while loading. It's a feature, not a bug!",
  'Loading... Fun fact: Metaverse pixels are made of 87% stardust and 13% kitten memes.',
  'Preparing your digital cocoon. Loading... Metaverse butterflies are known to cause temporary euphoria.',
  'Loading... Our virtual architect is constructing skyscrapers of code. Careful not to get lost in the virtual clouds.',
  "Strap on your virtual seatbelt! We're about to take off on a wild adventure through the metaverse. In-flight snacks are not included.",
  'Loading... Be patient. The metaverse is performing its daily sun salutations.',
  'Hold your breath... Loading metaverse secrets. Just kidding! Breathe normally, please.',
  'Loading... The metaverse gremlins are busy combing their virtual mustaches.',
  'Hold your horses! The metaverse stable is still calibrating.',
  'Loading... Please keep your hands and virtual limbs inside the loading screen at all times.',
  "Patience, young metaverse explorer. Rome wasn't built in a virtual day.",
  'Loading... Metaverse tip: Wearing a VR headset doubles your chances of spontaneously teleporting!',
  'Hang in there! The metaverse is just giving you a virtual high-five before launching.',
  "Loading... Did you know the metaverse has its own version of the moonwalk? It's called the code slide.",
  'Loading in progress... Counting virtual sheep to ensure a peaceful and glitch-free experience.',
  'Keep calm and wait for the metaverse to load. Panicking will only summon pixelated gremlins.',
  'Loading... Please be patient while our digital wizards conjure your metaverse dreams into reality.',
  'Loading... The metaverse is preparing a grand welcome, complete with confetti cannons and virtual fanfare.',
  'Hold on tight! The metaverse is revving its engines for a virtual roller coaster ride.',
  "Loading... Metaverse fact: The virtual clouds are made of cotton candy. But don't try to eat them!",
  "Loading... The metaverse's resident DJ is spinning some sick beats while you wait. Get ready to groove!",
  'Sit back and relax. The metaverse is brewing a virtual cup of coffee to fuel your adventure.',
  'Loading... The metaverse is brushing up on its magic spells. Expect some enchanting surprises!',
  'Hang on! The metaverse is untangling a virtual ball of yarn. Cats are involved, naturally.',
  "Loading... The metaverse's virtual aquarium is making sure the fish are swimming in the right direction.",
  'Patience, young Jedi. The metaverse force is strong with this loading screen.',
  "Loading... Please refrain from attempting to juggle virtual flaming torches. It's harder than it looks!",
];

export const randomQuote = () => loadingScreenQuotes[Math.floor(Math.random() * loadingScreenQuotes.length)];

export default itemTypes;
