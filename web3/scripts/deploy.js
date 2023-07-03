const hre = require("hardhat");

const main = async () => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const TradingCardMinter = await hre.ethers.getContractFactory("TradingCardMinter");
  const cardMinter = await TradingCardMinter.deploy({ value: lockedAmount });

  await cardMinter.deployed();

  // console.log(
  //   `Lock with ${ethers.utils.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

  console.log("TradingCardMinter deployed to:", cardMinter.address);
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
