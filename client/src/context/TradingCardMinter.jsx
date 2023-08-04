import React, {
  useRef,
  createContext,
  useContext,
} from 'react';

import {
  contractABI,
  contractAddress,
  marketplaceAddress,
} from '../utils/constants';
import { cards } from '../utils/cards';
import { getEthereumContract } from '../utils/connect';
import { WebContext } from './WebContext';

// Create a context for the Trading Card Minter
export const TradingCardMinterContext = createContext();

const { ethereum } = window;

/**
 * Component representing the Trading Card Minter provider
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The children to be rendered inside the provider
 * @returns {JSX.Element} - The JSX element
 */
export function TradingCardMinterProvider({ children }) {
  const { currentAccount } = useContext(WebContext);
  const player1Ref = useRef();
  const player2Ref = useRef();

  /**
   * Mint a new trading card
   */
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

  /**
   * Get the list of cards owned by the current account
   * @returns {Array} - An array of card objects with their respective token IDs
   */
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

  /**
   * Approve the marketplace contract to sell a card
   * @param {number} tokenId - The token ID of the card
   */
  const approveMarketplaceContract = async (tokenId) => {
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
  };

  /**
   * Request a new pack of cards
   */
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

  return (
    <TradingCardMinterContext.Provider
      value={{
        mintTradingCard,
        getCardsUnderAddress,
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
