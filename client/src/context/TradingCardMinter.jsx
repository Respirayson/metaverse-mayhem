import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TradingCardMinterContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  if (!ethereum) return alert("Please install MetaMask");
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log({
    provider,
    signer,
    contract,
  });

  return contract;
};

export const TradingCardMinterProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState({
    addressTo: "",
    name: "",
  });

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        window.alert("Please install MetaMask");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mintTradingCard = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const { addressTo, name } = formData;
      const contract = getEthereumContract();

      const transaction = await contract.mint(name);
      await transaction.wait();
      console.log(
        `1 Card successfully sent to ${addressTo} - Transaction hash: ${transaction.hash}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TradingCardMinterContext.Provider value={{  }}>
      {children}
    </TradingCardMinterContext.Provider>
  );
};
