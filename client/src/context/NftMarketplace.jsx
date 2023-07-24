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
    if (ethereum) {
      const contract = getEthereumContract(marketplaceAddress, marketplaceABI);
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

      await fetch('https://metaverse-mayhem.onrender.com/api/v1/marketplace', {
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
  };

  const buyItem = async (listingId, tokenId) => {
    if (ethereum) {
      const contract = getEthereumContract(marketplaceAddress, marketplaceABI);
      const listing = await contract.getListing(contractAddress, tokenId);
      const transaction = await contract.buyItem(contractAddress, tokenId, {
        value: listing.price,
      });
      await transaction.wait();
      console.log(`Successfully bought NFT with id ${tokenId}`);
      await fetch(
        `https://metaverse-mayhem.onrender.com/api/v1/marketplace/${listingId}`,
        {
          method: 'DELETE',
        },
      );
      console.log('Successfully deleted listing');
    }
  };

  const getProceeds = async () => {
    if (ethereum) {
      const contract = getEthereumContract(marketplaceAddress, marketplaceABI);
      const transaction = await contract.getProceeds(currentAccount);
      return ethers.utils.formatEther(transaction);
    }
    return 0;
  };

  const withdrawProceeds = async () => {
    if (ethereum) {
      const contract = getEthereumContract(marketplaceAddress, marketplaceABI);
      const transaction = await contract.withdrawProceeds();
      await transaction.wait();
      console.log('Successfully withdrew proceeds');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NftMarketplaceContext.Provider
      value={{
        addListing,
        buyItem,
        currentAccount,
        getProceeds,
        withdrawProceeds,
      }}
    >
      {children}
    </NftMarketplaceContext.Provider>
  );
}
