const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TradingCardMinter", function () {
    let tradingCardMinter;
    let owner;

    beforeEach(async function () {
        [owner] = await ethers.getSigners();
        const TradingCardMinter = await ethers.getContractFactory(
            "TradingCardMinter"
        );
        tradingCardMinter = await TradingCardMinter.deploy({
            value: ethers.utils.parseEther("1"),
        });
        await tradingCardMinter.deployed();
    });

    it("should deploy the contract", async function () {
        expect(tradingCardMinter.address).to.not.equal(0);
        console.log("Contract deployed to:", tradingCardMinter.address);
    });

    it("should mint a card", async function () {
        await tradingCardMinter.mint("Card 1");
        const totalSupply = await tradingCardMinter.totalSupply();
        expect(totalSupply).to.equal(1);
    });

    it("should request a new card", async function () {
        await tradingCardMinter.connect(owner).requestNewCard("New Card");
        expect(await tradingCardMinter.totalSupply()).to.equal(1);
        expect(await tradingCardMinter.ownerOf(0)).to.equal(owner.address);
        expect(
            (await tradingCardMinter.getCardsUnderOwner(owner.address)).length
        ).to.equal(1);
    });

    it("should buy a card pack", async function () {
        await tradingCardMinter.connect(owner).buyCardPack("Card Pack");
        expect(await tradingCardMinter.totalSupply()).to.equal(5);
        expect(
            (await tradingCardMinter.getCardsUnderOwner(owner.address)).length
        ).to.equal(5);
    });
});
