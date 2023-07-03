const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TradingCardMinter", function () {
    let tradingCardMinter;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const TradingCardMinter = await ethers.getContractFactory(
            "TradingCardMinter"
        );
        tradingCardMinter = await TradingCardMinter.deploy();
        await tradingCardMinter.deployed();
    });

    it("should deploy the contract correctly", async function () {
        expect(await tradingCardMinter.name()).to.equal("MetaverseMayhemCards");
        expect(await tradingCardMinter.symbol()).to.equal("MMT");
    });

    it("should mint a new card", async function () {
        const tokenId = await tradingCardMinter.mint(
            "https://example.com/card1"
        );
        expect(await tradingCardMinter.ownerOf(tokenId)).to.equal(
            owner.address
        );
    });

    it("should request a new card", async function () {
        const name = "Card2";
        const requestId = await tradingCardMinter.requestNewCard(name, {
            value: ethers.utils.parseEther("0.1"),
        });
        expect(await tradingCardMinter.ownerOf(requestId)).to.equal(
            owner.address
        );

        const card = await tradingCardMinter.cards(requestId);
        expect(card.name).to.equal(name);
        expect(card.rarity).to.equal("common");
    });

    it("should buy a card pack", async function () {
        const name = "Card3";
        await tradingCardMinter.buyCardPack(name, {
            value: ethers.utils.parseEther("0.1"),
        });

        const ownerCards = [];
        const totalSupply = await tradingCardMinter.totalSupply();
        for (let i = 0; i < totalSupply; i++) {
            const tokenId = await tradingCardMinter.tokenByIndex(i);
            const card = await tradingCardMinter.cards(tokenId);
            ownerCards.push(card);
        }

        expect(ownerCards.length).to.equal(5);
        for (let i = 0; i < ownerCards.length; i++) {
            expect(ownerCards[i].name).to.equal(name);
            expect(ownerCards[i].rarity).to.equal("common");
        }
    });
});
