const cards = [
    { id: 1, name: 'The Red Dragon', mana: 1, attack: 5, defense: 1, portrait: 'https://i.imgur.com/4XO7X1o.png' },
    { id: 2, name: 'The Onion', mana: 1, attack: 2, defense: 1, portrait: 'https://i.imgur.com/4XO7X1o.png' },
    { id: 3, name: 'Fire Phoenix', mana: 3, portrait: 'https://i.imgur.com/4XO7X1o.png' },
    { id: 4, name: 'Poison Flower', mana: 5, attack: 4, defense: 4, portrait: 'https://i.imgur.com/4XO7X1o.png' },
    { id: 5, name: 'Rare Parrot', mana: 10, attack: 0, defense: 10, portrait: 'http://i.imgur.com/PYe4A3T.gif' },
]

export function newRandomCard() {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    return randomCard;
}