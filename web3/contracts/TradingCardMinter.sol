// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

// Import required OpenZeppelin contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title TradingCardMinter
 * @dev ERC721 compliant contract to create and trade trading cards.
 */
contract TradingCardMinter is ERC721, ERC721Enumerable {
    using SafeMath for uint256;
    using Strings for string;

    /**
     * @dev Represents a trading card.
     */
    struct Card {
        uint256 cardId; // Unique ID of the card
        uint256 tokenId; // Token ID (for ERC721 token)
    }

    /**
     * @dev Array to store all the trading cards.
     */
    Card[] public cards;

    /**
     * @dev Mapping to store the trading cards owned by each user.
     */
    mapping(address => Card[]) public userCards;

    /**
     * @dev The price (in wei) to mint a card.
     */
    uint public constant mintPrice = 0;

    /**
     * @dev The fee (in wei) required to request a new card.
     */
    uint256 internal fee = 0.1 * 10 ** 18;

    /**
     * @dev The maximum number of cards that can be created.
     */
    uint256 internal constant MAX_CARDS = 41;

    /**
     * @notice Constructor for the TradingCardMinter contract.
     */
    constructor() payable ERC721("MetaverseMayhemCards", "MMT") {}

    /**
     * @dev Internal function to be executed before token transfer.
     * @param from address - The sender's address.
     * @param to address - The receiver's address.
     * @param tokenId uint256 - The token ID to be transferred.
     * @param batchSize uint256 - The number of tokens to be transferred in a batch.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev Internal function to handle token burning.
     * @param tokenId uint256 - The token ID to be burned.
     */
    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    /**
     * @notice Returns the token metadata URI.
     * @param tokenId uint256 - The token ID.
     * @return string - The URI string of the token's metadata.
     */
    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @notice Checks if the contract supports the given interface.
     * @param interfaceId bytes4 - The interface identifier.
     * @return bool - True if the interface is supported, false otherwise.
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @notice Mints a new card with the given URI (metadata).
     * @param _uri string - The URI string of the token's metadata.
     */
    function mint(string memory _uri) public payable {
        uint256 mintIndex = totalSupply();
        _safeMint(msg.sender, mintIndex);
    }

    /**
     * @dev Internal function to create a random number.
     * @param _max uint256 - The maximum value of the random number.
     * @param _sender address - The sender's address.
     * @return uint256 - The generated random number.
     */
    function _createRandomNum(uint256 _max, address _sender) internal view returns (uint256 randomValue) {
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, _sender, cards.length)));

        randomValue = randomNum % _max;
        if (randomValue == 0) {
            randomValue = _max / 2;
        }

        return randomValue;
    }

    /**
     * @notice Requests a new card and mints it to the caller.
     * @return uint256 - The token ID of the newly minted card.
     */
    function requestNewCard() public payable returns (uint256) {
        require(address(this).balance >= fee, "Insufficient ETH - fill contract with ETH");

        uint256 id = cards.length;
        uint256 cardId = _createRandomNum(MAX_CARDS, msg.sender);
        Card memory newCard = Card(cardId, id);
        userCards[msg.sender].push(newCard);

        cards.push(newCard);
        _safeMint(msg.sender, id);
        return id;
    }

    /**
     * @notice Buys a card pack containing 5 cards.
     */
    function buyCardPack() public payable {
        require(address(this).balance >= fee, "Insufficient ETH - fill contract with ETH");

        for (int i = 0; i < 5; i++) {
            requestNewCard();
        }
    }

    /**
     * @notice Transfers a card from one owner to another.
     * @param tokenId uint256 - The token ID of the card to be transferred.
     * @param from address - The current owner's address.
     * @param to address - The new owner's address.
     */
    function transferCardToNewOwner(uint256 tokenId, address from, address to) public {
        Card memory card = cards[tokenId];

        for (uint256 i = 0; i < userCards[from].length; i++) {
            if (userCards[from][i].tokenId == card.tokenId) {
                userCards[from][i] = userCards[from][userCards[from].length - 1];
                userCards[from].pop();
                break;
            }
        }
        userCards[to].push(card);
    }

    /**
     * @notice Gets all the cards owned by a specific address.
     * @param _address address - The address of the owner.
     * @return Card[] memory - An array of Card structs owned by the address.
     */
    function getCardsUnderOwner(address _address) public view returns (Card[] memory) {
        return userCards[_address];
    }
}
