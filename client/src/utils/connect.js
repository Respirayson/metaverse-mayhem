import Web3 from "web3";

var web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8546");

const connectWallet = async () => {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    window.alert("Please install MetaMask first.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // console.log("Connected: " + accounts[0]);
    return accounts[0];
  } catch (err) {
    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log("Please connect to MetaMask.");
    } else {
      console.error(err);
    }
  }
};

const checkWalletConnected = async () => {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    window.alert("Please install MetaMask first.");
    return;
  }

  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  // console.log(window.ethereum)
  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Connected: " + account);
    return account;
  } else {
    console.log("Not connected");
    return "";
  }
};

export { connectWallet, checkWalletConnected };
