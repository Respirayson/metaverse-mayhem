import React from 'react';
import { useNavigate } from 'react-router-dom';
import Listing from '../Listing/Listing';
import Loader from '../Loader';

function DisplayMarketplace({ cards, loading }) {
  const navigate = useNavigate();

  const handleNavigate = (listing) => {
    navigate(`/marketplace/listing-details/${listing.name}`, { state: listing });
  };

  return (
    <>
      <h1 className="font-semibold text-white text-left text-[18px]">
        Total Listings &#40;
        {cards.length}
        &#41;
      </h1>
      {loading && (
        <div className="mt-16 scale-[100%]">
          <Loader />
        </div>
      )}
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {!loading && cards.length === 0 && (
          <p className="font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any listings yet.
          </p>
        )}

        {!loading
          && cards.length > 0
          && cards.map((card, _index) => (
            <Listing
              card={card}
              name={card.name}
              description={card.description}
              type={card.type}
              seller="hello"
              price={Math.floor(Math.random() * 1000) / 1000}
              image={card.cardImage}
              handleClick={() => handleNavigate(card)}
            />
          ))}
      </div>
    </>
  );
}

export default DisplayMarketplace;
