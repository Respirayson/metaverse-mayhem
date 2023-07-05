import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Listing } from '..';
import { cards } from '../../utils/cards';
import { TradingCardMinterContext } from '../../context/TradingCardMinter';

function DisplayMarketplace() {
  const navigate = useNavigate();
  const [userCards, setUserCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { mintTradingCard, getCardsUnderAddress } = React.useContext(TradingCardMinterContext);

  React.useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const data = await getCardsUnderAddress();
      setUserCards(data);
      setLoading(false);
    };

    fetchCards();
  }, [getCardsUnderAddress]);

  return (
    <div className="p-16">
      <h1 className="font-semibold text-white text-left text-[18px]">
        All Listings &#40;3&#41;
      </h1>
      <button className="text-white" onClick={() => navigate('/create')}>Create Listing</button>
      <button className="text-white" onClick={() => getCardsUnderAddress()}>Test Contract</button>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {cards.map((card, index) => (
          <Listing
            key={index}
            name={card.name}
            description="test"
            seller="hello"
            price={Math.random()}
            minion={card.minion}
            image={card.portrait}
          />
        ))}
      </div>
    </div>
  );
}

export default DisplayMarketplace;
