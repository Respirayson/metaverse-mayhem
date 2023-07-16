import React from 'react';
import { useNavigate } from 'react-router-dom';
import Listing from '../Listing/Listing';
import Loader from '../Loader';

function DisplayMarketplace({ listings, loading, subtitle }) {
  const navigate = useNavigate();

  const handleNavigate = (listing) => {
    navigate(`/marketplace/listing-details/${listing.id}/${listing.card.name}`, { state: listing });
  };

  return (
    <>
      <h1 className="font-semibold text-white text-left text-[18px]">
        Total Listings &#40;
        {listings.length}
        &#41;
      </h1>
      {loading && (
        <div className="mt-16 scale-[100%]">
          <Loader />
        </div>
      )}
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {!loading && listings.length === 0 && (
          <p className="font-semibold text-[14px] leading-[30px] text-[#818183]">
            {subtitle}
          </p>
        )}

        {!loading
          && listings.length > 0
          && listings.map((listing, index) => (
            <Listing
              card={listing.card}
              seller={listing.seller}
              price={listing.price}
              handleClick={() => handleNavigate(listing)}
            />
          ))}
      </div>
    </>
  );
}

export default DisplayMarketplace;
