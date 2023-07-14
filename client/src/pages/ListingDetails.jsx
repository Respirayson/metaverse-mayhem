import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader, Sidebar } from '../components';

function ListingDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {

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
        <p className="font-normal text-[24px] text-white my-10">{state.name}</p>

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
                      src={state.cardImage}
                      alt="listing"
                      className="w-full h-[410px] object-contain rounded-xl"
                    />
                    <img
                      src={state.portrait}
                      alt="listing"
                      className="w-full h-[410px] object-contain rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                  <div className="flex flex-col items-center w-[150px]">
                    <h4 className="font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
                      {state.mana}
                    </h4>
                    <p className="font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
                      Mana
                    </p>
                  </div>
                  <div className="flex flex-col items-center w-[150px]">
                    <h4 className="font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
                      {state.attack}
                    </h4>
                    <p className="font-normal text-[16px] text-[#808191] bg-[#28282e] px-3 py-2 w-full rouned-b-[10px] text-center">
                      Attack
                    </p>
                  </div>
                  <div className="flex flex-col items-center w-[150px]">
                    <h4 className="font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
                      {state.defense}
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
                      Creator
                    </h4>

                    <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                      <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                        <img
                          src="/my-listings.svg"
                          alt="user"
                          className="w-[60%] h-[60%] object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[14px] text-white break-all">
                          {state.seller || 'hello'}
                        </h4>
                        <p className="mt-[4px] font-normal text-[12px] text-[#808191]">
                          Avid Collector
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[18px] text-white uppercase">
                      Description
                    </h4>

                    <div className="mt-[20px]">
                      <p className="font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                        {state.description || 'test'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                    Price
                  </h4>

                  <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                    <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                      Price:
                      {' '}
                      {state.price || 0.0}
                    </p>
                    <div className="mt-[30px]">
                      <div className="p-4 bg-[#13131a] rounded-[10px]">
                        <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                          Buy it to instantly own it
                        </h4>
                        <p className="my-4 font-epilogue font-normal leading-[22px] text-[#808191]">
                          Conquer the Metaverse with this new addition to your
                          collection.
                        </p>
                        <button
                          type="button"
                          className="font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#25618B] hover:bg-[#25718B]"
                        >
                          Buy Now
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

export default ListingDetails;
