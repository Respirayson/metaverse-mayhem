import React, { useContext, useEffect, useState } from 'react';
import { Sidebar, DisplayMarketplace } from '../components';
import { cards } from '../utils/cards';
import { TradingCardMinterContext } from '../context/TradingCardMinter';

/**
 * Component for displaying the user's listings in the marketplace.
 * @returns {JSX.Element} - The JSX element representing the MyListings component.
 */
function MyListings() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const { currentAccount } = useContext(TradingCardMinterContext);

  /**
   * Fetches the user's listings from the server and updates the component state.
   * @param {string} address - The user's public address.
   */
  const fetchMyListings = async (address) => {
    setLoading(true);
    const data = await fetch(
      `https://metaverse-mayhem.onrender.com/api/v1/marketplace/${address}`,
    );
    const json = await data.json();
    const myListings = await Promise.all(json.map(async (listing) => ({
      card: cards[listing.cardId],
      price: listing.price,
      seller: await fetch(
        `https://metaverse-mayhem.onrender.com/api/v1/users/?publicAddress=${listing.seller}`,
      )
        .then((result) => result.json())
        .then((ans) => ({ username: ans.username, bio: ans.bio })),
      id: listing._id, // eslint-disable-line no-underscore-dangle
      tokenId: listing.tokenId,
    })));
    setListings(myListings);
    setLoading(false);
  };

  useEffect(() => {
    if (currentAccount) {
      fetchMyListings(currentAccount);
    }
  }, [currentAccount]);

  return (
    <>
      <div className="gradient-02 z-0" />
      <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-row relative z-10">
        <Sidebar url="My Listings" />
        <div className="flex-1 flex flex-col xl:mt-0 my-16">
          <div className="flex flex-row w-full">
            <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
              Your Listings
            </h1>
          </div>
          <p className="font-normal text-[24px] text-white my-10">
            Check out your listings here!
          </p>

          {/* Display the user's listings using the DisplayMarketplace component */}
          <DisplayMarketplace
            subtitle="You have not created any listings yet."
            loading={loading}
            listings={listings}
          />
        </div>
      </div>
    </>
  );
}

export default MyListings;
