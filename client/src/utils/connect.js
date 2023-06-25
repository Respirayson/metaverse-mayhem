import Web3 from "web3";

// Create a new instance of Web3 with the given provider or local node URL
var web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8546");

/**
 * Connects the wallet using MetaMask
 * @returns {Promise<string>} - The connected account address
 */
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

/**
 * Checks if the wallet is currently connected using MetaMask
 * @returns {Promise<string>} - The connected account address, or an empty string if not connected
 */
const checkWalletConnected = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
        return;
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
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
