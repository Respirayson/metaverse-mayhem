import React, { useEffect, useState } from 'react';
import Collectible from '../Collectible/Collectible';
import { TradingCardMinterContext } from '../../context/TradingCardMinter';

function DisplayCollection() {
  const [userCards, setUserCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getCardsUnderAddress, mintTradingCard } = React.useContext(
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
  }, [getCardsUnderAddress]);

  return (
    <>
      <button className="text-white" onClick={() => mintTradingCard()}>
        Test Contract
      </button>
      <h1 className="font-semibold text-white text-left text-[18px]">
        All Collection &#40;
        {userCards.length}
        &#41;
      </h1>
      <div className="flex flex-row">
        <div className="w-[50%] flex flex-wrap justify-end mt-[20px] gap-[26px]">
          {userCards.map((card, index) => (
            <div key={index}>
              <Collectible
                image={card.portrait}
                key={index}
                name={card.name}
                description={card.description}
                mana={card.mana}
                attack={card.attack}
                defense={card.defense}
              />
            </div>
          ))}
        </div>

        <div className="w-[50%] flex flex-wrap justify-end mt-[20px] gap-[26px]">
          {userCards.map((card, index) => (
            <div key={index}>
              <Collectible
                image={card.portrait}
                key={index}
                name={card.name}
                description={card.description}
                mana={card.mana}
                attack={card.attack}
                defense={card.defense}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DisplayCollection;
