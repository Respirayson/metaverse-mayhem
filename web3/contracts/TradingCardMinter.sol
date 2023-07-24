// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TradingCardMinter is ERC721, ERC721Enumerable {
    using SafeMath for uint256;
    using Strings for string;

    struct Card {
        uint256 cardId;
        uint256 tokenId;
    }

    Card[] public cards;

    mapping(address => Card[]) public userCards;

    uint public constant mintPrice = 0;
    uint256 internal fee = 0.1 * 10 ** 18;
    uint256 internal constant MAX_CARDS = 41;

    constructor() payable ERC721("MetaverseMayhemCards", "MMT") {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _uri) public payable {
        uint256 mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
    }

    function _createRandomNum(
        uint256 _max,
        address _sender
    ) internal view returns (uint256 randomValue) {
        uint256 randomNum = uint256(
            keccak256(
                abi.encodePacked(block.difficulty, block.timestamp, _sender, cards.length)
            )
        );

        randomValue = randomNum % _max;
        if (randomValue == 0) {
            randomValue = _max / 2;
        }

        return randomValue;
    }

    function requestNewCard() public payable returns (uint256) {
        require(
            address(this).balance >= fee,
            "Insufficient ETH - fill contract with ETH"
        );

        uint256 id = cards.length;
        uint256 cardId = _createRandomNum(MAX_CARDS, msg.sender);
        Card memory newCard = Card(cardId, id);
        userCards[msg.sender].push(newCard);

        cards.push(newCard);
        _safeMint(msg.sender, id);
        return id;
    }

    function buyCardPack() public payable {
        require(
            address(this).balance >= fee,
            "Insufficient ETH - fill contract with ETH"
        );

        for (int i = 0; i < 5; i++) {
            requestNewCard();
        }
    }

    function transferCardToNewOwner(
        uint256 tokenId,
        address from,
        address to
    ) public {
        Card memory card = cards[tokenId];

        for (uint256 i = 0; i < userCards[from].length; i++) {
            if (userCards[from][i].tokenId == card.tokenId) {
                userCards[from][i] = userCards[from][
                    userCards[from].length - 1
                ];
                userCards[from].pop();
                break;
            }
        }
        userCards[to].push(card);
    }

    function getCardsUnderOwner(
        address _address
    ) public view returns (Card[] memory) {
        return userCards[_address];
    }
}
