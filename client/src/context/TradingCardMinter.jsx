import React, {
  useEffect, useState, useRef, createContext, useContext,
} from 'react';

import {
  contractABI,
  contractAddress,
  marketplaceAddress,
} from '../utils/constants';
import { cards } from '../utils/cards';
import { getEthereumContract } from '../utils/connect';
import { WebContext } from './WebContext';

export const TradingCardMinterContext = createContext();

const { ethereum } = window;

export function TradingCardMinterProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);
  const { setShowAlert, setSuccess, setAlertMessage } = useContext(WebContext);
  const player1Ref = useRef();
  const player2Ref = useRef();

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        setAlertMessage('Make sure you have metamask!');
        setShowAlert(true);
        setSuccess(false);
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
        const contract = getEthereumContract(contractAddress, contractABI);

        const transaction = await contract.requestNewCard();
        await transaction.wait();
        console.log(
          `1 Card successfully sent - Transaction hash: ${transaction.hash}`,
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
        if (!currentAccount) {
          return [];
        }
        const contract = getEthereumContract(contractAddress, contractABI);

        const data = await contract.getCardsUnderOwner(currentAccount);
        const ids = data.map((card) => ({
          card: cards[card.cardId.toNumber()],
          tokenId: card.tokenId.toNumber(),
        }));
        return ids;
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  };

  const approveMarketplaceContract = async (tokenId) => {
    try {
      if (ethereum) {
        const contract = getEthereumContract(contractAddress, contractABI);

        const transaction = await contract.approve(marketplaceAddress, tokenId);
        await transaction.wait();
        console.log(
          `Approved marketplace contract to sell card with id ${tokenId} - Transaction hash: ${transaction.hash}`,
        );
      } else {
        console.log('Ethereum is not present');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestNewPack = async () => {
    try {
      if (ethereum) {
        const contract = getEthereumContract(contractAddress, contractABI);

        const transaction = await contract.buyCardPack();
        await transaction.wait();
        console.log(
          `1 Pack successfully sent - Transaction hash: ${transaction.hash}`,
        );
      } else {
        console.log('Ethereum is not present');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <TradingCardMinterContext.Provider
      value={{
        mintTradingCard,
        getCardsUnderAddress,
        currentAccount,
        player1Ref,
        player2Ref,
        approveMarketplaceContract,
        requestNewPack,
      }}
    >
      {children}
    </TradingCardMinterContext.Provider>
  );
}
