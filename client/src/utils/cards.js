
const cards = [
    { id: 1, name: 'The Red Dragon', mana: 1, attack: 5, defense: 1, portrait: 'https://yt3.googleusercontent.com/ytc/AGIKgqP8PTJwSyasyskt6sJ5zY48TTeZHmWQOMcPp7S9Nw=s900-c-k-c0x00ffffff-no-rj' },
    { id: 2, name: 'The Onion', mana: 1, attack: 10, defense: 1, portrait: 'https://www.macmillandictionary.com/external/slideshow/full/135967_full.jpg' },
    { id: 3, name: 'Fire Phoenix', mana: 3, attack: 3, defense: 5, portrait: 'https://www.crystalinks.com/PhoenixBlueYellow.jpg' },
    { id: 4, name: 'Poison Flower', mana: 5, attack: 4, defense: 4, portrait: 'https://static.pexels.com/photos/36753/flower-purple-lical-blosso.jpg' },
    { id: 5, name: 'Rare Parrot', mana: 10, attack: 8, defense: 10, portrait: 'http://i.imgur.com/PYe4A3T.gif' },
]

export function newRandomCard() {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    return randomCard;
}