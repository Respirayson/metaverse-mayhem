import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TradingCardMinterContext } from '../context/TradingCardMinter';
import { Sidebar, Loader } from '../components';
import Collectible from '../components/Collectible/Collectible';

function CreateListing() {
  const navigate = useNavigate();
  const [userCards, setUserCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getCardsUnderAddress, currentAccount } = useContext(
    TradingCardMinterContext,
  );

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const data = await getCardsUnderAddress();
      setUserCards(data);
      setLoading(false);
    };

    fetchCards();
  }, [getCardsUnderAddress, currentAccount]);

  const handleNavigate = (listing) => {
    navigate(
      `/marketplace/selling-details/${listing.card.name}`,
      { state: listing },
    );
  };

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-row">
      <Sidebar url="Create Listing" />
      <div className="flex-1 flex flex-col xl:mt-0 my-16">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            Create Listing
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          Sell your spare cards here
        </p>

        {loading && (
          <div className="mt-16 scale-[100%]">
            <Loader />
          </div>
        )}

        {userCards.length === 0 && !loading && (
          <div>
            <p className="font-semibold text-[14px] leading-[30px] text-[#818183]">
              You have no cards to sell
            </p>
          </div>
        )}

        {userCards.length > 0 && !loading && (
          <div className="flex flex-row gap-[5%] flex-wrap ml-20">
            {userCards.map((card) => (
              <Collectible
                card={card.card}
                handleClick={() => handleNavigate(card)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateListing;
