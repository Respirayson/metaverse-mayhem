import React, { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';

import {
  marketplaceABI,
  marketplaceAddress,
  contractAddress,
} from '../utils/constants';
import { getEthereumContract } from '../utils/connect';

export const NftMarketplaceContext = createContext();

const { ethereum } = window;

export function NftMarketplaceProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addListing = async (collectible, price) => {
    try {
      if (ethereum) {
        const contract = getEthereumContract(
          marketplaceAddress,
          marketplaceABI,
        );
        const parsedPrice = ethers.utils.parseEther(price.toString());
        const transaction = await contract.listItem(
          contractAddress,
          collectible.tokenId,
          parsedPrice,
        );
        await transaction.wait();
        console.log(
          `Successfully listed NFT with id ${collectible.tokenId} for ${price} ETH`,
        );

        await fetch('http://localhost:8000/api/v1/marketplace', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenId: collectible.tokenId,
            price,
            seller: currentAccount,
            cardId: collectible.card.id,
          }),
        });
        console.log('Successfully listed NFT');
      } else {
        console.log('Ethereum is not present');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const buyItem = async (listingId, tokenId) => {
    try {
      if (ethereum) {
        const contract = getEthereumContract(
          marketplaceAddress,
          marketplaceABI,
        );
        const listing = await contract.getListing(contractAddress, tokenId);
        const transaction = await contract.buyItem(contractAddress, tokenId, {
          value: listing.price,
        });
        await transaction.wait();
        console.log(`Successfully bought NFT with id ${tokenId}`);
        await fetch(`http://localhost:8000/api/v1/marketplace/${listingId}`, {
          method: 'DELETE',
        });
        console.log('Successfully deleted listing');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NftMarketplaceContext.Provider value={{ addListing, buyItem, currentAccount }}>
      {children}
    </NftMarketplaceContext.Provider>
  );
}
