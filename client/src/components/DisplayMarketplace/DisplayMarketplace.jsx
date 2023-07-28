import React from 'react';
import { useNavigate } from 'react-router-dom';
import Listing from '../Listing/Listing';
import Loader from '../Loader';

/**
 * DisplayMarketplace component displays the marketplace listings and allows
 * users to navigate to the details of a listing.
 *
 * @component
 * @param {Object[]} listings - An array of marketplace listings.
 * @param {boolean} loading - Flag indicating if the component is in a loading state.
 * @param {string} subtitle - The subtitle to display when there are no listings.
 * @returns {JSX.Element} The JSX element representing the DisplayMarketplace component.
 */
function DisplayMarketplace({ listings, loading, subtitle }) {
  // Importing hook for navigation
  const navigate = useNavigate();

  /**
   * Handles navigation to the details page of a listing.
   * @param {Object} listing - The listing object to be displayed in the details page.
   * @returns {void}
   */
  const handleNavigate = (listing) => {
    navigate(`/marketplace/listing-details/${listing.id}/${listing.card.name}`, {
      state: listing,
    });
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

        {!loading &&
          listings.length > 0 &&
          listings.map((listing, _index) => (
            <Listing
              key={listing.id} // Consider adding a unique key prop for the Listing component
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
