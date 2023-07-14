import React, { useState } from 'react';
import { Sidebar, DisplayMarketplace } from '../components';
import { cards } from '../utils/cards';

function MyListings() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-row">
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

        <DisplayMarketplace loading={loading} cards={cards} />
      </div>
    </div>
  );
}

export default MyListings;
