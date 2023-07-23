const { expect } = require("chai");

describe("NftMarketplace", function () {
    let nftMarketplace;
    let nftContract;
    let owner;
    let buyer;

    const tokenId = 0;
    const price = ethers.utils.parseEther("1.0");

    beforeEach(async function () {
        [owner, buyer] = await ethers.getSigners();

        const NftMarketplace = await ethers.getContractFactory(
            "NftMarketplace"
        );
        nftMarketplace = await NftMarketplace.deploy();
        await nftMarketplace.deployed();

        const NftContract = await ethers.getContractFactory(
            "TradingCardMinter"
        );
        nftContract = await NftContract.deploy({ value: price });
        await nftContract.deployed();
    });

    it("should list an NFT for sale", async function () {
        await nftContract.connect(owner).requestNewCard();
        await nftContract
            .connect(owner)
            .approve(nftMarketplace.address, tokenId);

        await nftMarketplace.listItem(nftContract.address, tokenId, price);

        const listing = await nftMarketplace.getListing(
            nftContract.address,
            tokenId
        );
        expect(listing.price).to.equal(price);
        expect(listing.seller).to.equal(owner.address);
    });

    it("should cancel a listing", async function () {
        await nftContract.connect(owner).requestNewCard();
        await nftContract
            .connect(owner)
            .approve(nftMarketplace.address, tokenId);

        await nftMarketplace.listItem(nftContract.address, tokenId, price);

        await nftMarketplace
            .connect(owner)
            .cancelListing(nftContract.address, tokenId);

        const listing = await nftMarketplace.getListing(
            nftContract.address,
            tokenId
        );
        expect(listing.price).to.equal(0);
        expect(listing.seller).to.equal(ethers.constants.AddressZero);
    });

    it("should buy an NFT", async function () {
        await nftContract.connect(owner).requestNewCard();
        await nftContract.approve(nftMarketplace.address, tokenId);

        await nftMarketplace.listItem(nftContract.address, tokenId, price);

        await nftMarketplace
            .connect(buyer)
            .buyItem(nftContract.address, tokenId, { value: price });

        const listing = await nftMarketplace.getListing(
            nftContract.address,
            tokenId
        );
        expect(listing.price).to.equal(0);
        expect(listing.seller).to.equal(ethers.constants.AddressZero);

        const sellerProceeds = await nftMarketplace.getProceeds(owner.address);
        expect(sellerProceeds).to.equal(price);
    });

    it("should update the price of a listed NFT", async function () {
        await nftContract.connect(owner).requestNewCard();
        await nftContract
            .connect(owner)
            .approve(nftMarketplace.address, tokenId);

        await nftMarketplace.listItem(nftContract.address, tokenId, price);

        const newPrice = ethers.utils.parseEther("1.5");
        await nftMarketplace.updateListing(
            nftContract.address,
            tokenId,
            newPrice
        );

        const listing = await nftMarketplace.getListing(
            nftContract.address,
            tokenId
        );
        expect(listing.price).to.equal(newPrice);
        expect(listing.seller).to.equal(owner.address);
    });

    it("should withdraw proceeds", async function () {
        await nftContract.connect(owner).requestNewCard();
        await nftContract.approve(nftMarketplace.address, tokenId);

        await nftMarketplace.listItem(nftContract.address, tokenId, price);

        await nftMarketplace
            .connect(buyer)
            .buyItem(nftContract.address, tokenId, { value: price });

        const initialBalance = await ethers.provider.getBalance(owner.address);

        await nftMarketplace.connect(owner).withdrawProceeds();

        const updatedBalance = await ethers.provider.getBalance(owner.address);
        expect(updatedBalance).to.be.gt(initialBalance);
    });
});
