import { useState, useEffect, useContext } from 'react';
import { DisplayCollection } from '../components';
import { TradingCardMinterContext } from '../context/TradingCardMinter';

function Collection() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userCards, setUserCards] = useState([]);

  const { getCardsUnderAddress } = useContext(TradingCardMinterContext);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const data = await getCardsUnderAddress();
      setUserCards(data);
      setLoading(false);
    };

    fetchCards();
  }, [getCardsUnderAddress]);

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-col">
      <div className="flex-1 flex justify-center flex-col xl:mt-0">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            My Collection
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          View your Trading Cards in your own Wallet
        </p>
        <div className="glassmorphism relative rounded-3xl h-full w-full flex flex-col">
          <DisplayCollection
            index={index}
            userCards={userCards}
            loading={loading}
          />
          <div className="mt-16 ">
            {index > 0 && (
              <button type="button" onClick={() => setIndex(index - 4)}>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="absolute right-0 bottom-0 mb-4 mr-16 h-8 w-8 rotate-180 hover:scale-[1.1]"
                />
              </button>
            )}
            {index < userCards.length - 4 && (
              <button type="button" onClick={() => setIndex(index + 4)}>
                <img
                  src="/arrow-right.svg"
                  alt="arrow-right"
                  className="absolute right-0 bottom-0 mb-4 mr-4 h-8 w-8 hover:scale-[1.1]"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
