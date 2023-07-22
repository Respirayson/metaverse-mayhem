import React, { useContext, useEffect, useState } from 'react';
import { Sidebar, DisplayMarketplace } from '../components';
import { cards } from '../utils/cards';
import { TradingCardMinterContext } from '../context/TradingCardMinter';

function MyListings() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const { currentAccount } = useContext(TradingCardMinterContext);

  const fetchMyListings = async (address) => {
    setLoading(true);
    const data = await fetch(
      `https://metaverse-mayhem.onrender.com/api/v1/marketplace/${address}`,
    );
    const json = await data.json();
    const myListings = json.map((listing) => ({
      card: cards[listing.cardId],
      price: listing.price,
      seller: listing.seller,
      // eslint-disable-next-line no-underscore-dangle
      id: listing._id,
      tokenId: listing.tokenId,
    }));
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
