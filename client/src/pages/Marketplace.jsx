import { useContext, useEffect, useState } from 'react';
import { DisplayMarketplace, Sidebar } from '../components';
import { cards } from '../utils/cards';
import { TradingCardMinterContext } from '../context/TradingCardMinter';

function Marketplace() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const { currentAccount } = useContext(TradingCardMinterContext);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/api/v1/marketplace/');
      const data = await res.json();
      const updatedListings = data
        .filter((listing) => listing.seller !== currentAccount)
        .map((listing) => ({
          card: cards[listing.cardId],
          price: listing.price,
          seller: listing.seller,
          // eslint-disable-next-line no-underscore-dangle
          id: listing._id,
          tokenId: listing.tokenId,
        }));
      setListings(updatedListings);
      setLoading(false);
    };
    fetchListings();
  }, [currentAccount]);

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-row">
      <Sidebar url="All Listings" />
      <div className='gradient-04 z-0' />
      <div className="flex-1 flex flex-col xl:mt-0 my-16 z-10">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            Marketplace
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          Buy, Sell, Trade your way to Victory
        </p>

        <DisplayMarketplace subtitle="No listings are available" loading={loading} listings={listings} />
      </div>
    </div>
  );
}

export default Marketplace;
