import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';
import { cards } from '../utils/cards';

export const TradingCardMinterContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  if (!ethereum) {
    return alert('Please install MetaMask');
  }
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

export function TradingCardMinterProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);
  console.log(currentAccount);
  const [formData, setFormData] = useState({
    addressTo: '',
    name: '',
  });

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        // eslint-disable-next-line no-alert
        window.alert('Please install MetaMask');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        const account = accounts[0];
        console.log('Found an authorized account: ', account);
        setCurrentAccount(account);
      } else {
        console.log('No authorized account found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mintTradingCard = async () => {
    try {
      if (ethereum) {
        const { addressTo, name } = formData;
        const contract = getEthereumContract();

        const transaction = await contract.requestNewCard(
          'Hello World!',
        );
        await transaction.wait();
        console.log(
          `1 Card successfully sent to ${addressTo} under ${name} - Transaction hash: ${transaction.hash}`,
        );
      } else {
        console.log('Ethereum is not present');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCardsUnderAddress = async () => {
    try {
      if (ethereum) {
        const contract = getEthereumContract();

        const data = await contract.getCardsUnderOwner(currentAccount);
        const ids = data.map((card) => cards[card.cardId.toNumber()]);
        return ids;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    return [];
  };

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TradingCardMinterContext.Provider
      value={{
        handleChange,
        formData,
        mintTradingCard,
        getCardsUnderAddress,
        currentAccount,
      }}
    >
      {children}
    </TradingCardMinterContext.Provider>
  );
}
