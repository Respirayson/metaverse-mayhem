import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader, Sidebar } from '../components';
import { NftMarketplaceContext } from '../context/NftMarketplace';
import { TradingCardMinterContext } from '../context/TradingCardMinter';

function SellingDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addListing } = useContext(NftMarketplaceContext);
  const { approveMarketplaceContract } = useContext(TradingCardMinterContext);

  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState();

  const handleClick = async (collectible) => {
    setIsLoading(true);
    await approveMarketplaceContract(collectible.tokenId);
    await addListing(collectible, price);
    setIsLoading(false);
    navigate('/marketplace');
  };

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-row">
      <Sidebar url="" />
      <div className="flex-1 flex flex-col xl:mt-0 my-16">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            Listing Details
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          {state.card.name}
        </p>

        <div>
          {isLoading && (
            <div className="mt-16 scale-[100%]">
              <Loader />
            </div>
          )}

          {!isLoading && (
            <>
              <div className="w-full flex md:flex-row flex-col gap-[30px]">
                <div className="flex-1 flex-col">
                  <div className="flex flex-row bg-white rounded-xl">
                    <img
                      src={state.card.cardImage}
                      alt="listing"
                      className="w-full h-[410px] object-contain rounded-xl"
                    />
                    <img
                      src={state.card.portrait}
                      alt="listing"
                      className="w-full h-[410px] object-contain rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                  <div className="flex flex-col items-center w-[150px]">
                    <h4 className="font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
                      {state.card.mana}
                    </h4>
                    <p className="font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
                      Mana
                    </p>
                  </div>
                  <div className="flex flex-col items-center w-[150px]">
                    <h4 className="font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
                      {state.card.attack}
                    </h4>
                    <p className="font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
                      Attack
                    </p>
                  </div>
                  <div className="flex flex-col items-center w-[150px]">
                    <h4 className="font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
                      {state.card.defense}
                    </h4>
                    <p className="font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
                      Health
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                <div className="flex-[2] flex flex-col gap-[40px]">
                  <div>
                    <h4 className="font-semibold text-[18px] text-white uppercase">
                      Description
                    </h4>

                    <div className="mt-[20px]">
                      <p className="font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                        {state.card.description || 'test'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                    Price
                  </h4>

                  <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                    <input
                      type="number"
                      placeholder="ETH 0.1"
                      step="0.01"
                      className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="mt-[30px]">
                      <div className="p-4 bg-[#13131a] rounded-[10px]">
                        <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                          Sell your collectible for a fixed price
                        </h4>
                        <p className="my-4 font-epilogue font-normal leading-[22px] text-[#808191]">
                          Exchange your NFTs for real money
                        </p>
                        <button
                          type="button"
                          className="font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#25618B] hover:bg-[#25718B]"
                          onClick={() => handleClick(state)}
                        >
                          Sell Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellingDetails;
