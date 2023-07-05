const hre = require("hardhat");

const main = async () => {
  const lockedAmount = hre.ethers.utils.parseEther("0.5");

  const TradingCardMinter = await hre.ethers.getContractFactory("TradingCardMinter");
  const cardMinter = await TradingCardMinter.deploy({ value: lockedAmount });

  await cardMinter.deployed();

  const NftMarketplace = await hre.ethers.getContractFactory("NftMarketplace");
  const nftMarketplace = await NftMarketplace.deploy();

  console.log("TradingCardMinter deployed to:", cardMinter.address);
  console.log("NftMarketplace deployed to:", nftMarketplace.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

runMain();
