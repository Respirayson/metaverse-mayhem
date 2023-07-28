import { useContext, useEffect, useState } from 'react';
import { DisplayMarketplace, Sidebar } from '../components';
import { cards } from '../utils/cards';
import { TradingCardMinterContext } from '../context/TradingCardMinter';

/**
 * Component for displaying the marketplace with listings of trading cards.
 * @returns {JSX.Element} - The JSX element representing the Marketplace component.
 */
function Marketplace() {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const { currentAccount } = useContext(TradingCardMinterContext);

  useEffect(() => {
    /**
     * Fetches the marketplace listings from the server and updates the component state.
     */
    const fetchListings = async () => {
      setLoading(true);
      const res = await fetch('https://metaverse-mayhem.onrender.com/api/v1/marketplace/');
      const data = await res.json();
      const updatedListings = data
        .filter((listing) => listing.seller !== currentAccount)
        .map((listing) => ({
          card: cards[listing.cardId],
          price: listing.price,
          seller: listing.seller,
          id: listing._id, // eslint-disable-line no-underscore-dangle
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
      <div className="gradient-04 z-0" />
      <div className="flex-1 flex flex-col xl:mt-0 my-16 z-10">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            Marketplace
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          Buy, Sell, Trade your way to Victory
        </p>

        {/* Display the marketplace listings using the DisplayMarketplace component */}
        <DisplayMarketplace subtitle="No listings are available" loading={loading} listings={listings} />
      </div>
    </div>
  );
}

export default Marketplace;
