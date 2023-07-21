import React, { useContext, useState } from 'react';
import { Sidebar, Loader } from '../components';
import { TradingCardMinterContext } from '../context/TradingCardMinter';

function Store() {
  const { mintTradingCard, requestNewPack } = useContext(
    TradingCardMinterContext,
  );
  const [loading, setLoading] = useState(false);

  const buyCard = async () => {
    setLoading(true);
    await mintTradingCard();
    setLoading(false);
  };

  const buyPack = async () => {
    setLoading(true);
    await requestNewPack();
    setLoading(false);
  };

  return (
    <>
      <div className="gradient-04 z-0" />
      <div className="relative z-10 flex flex-1 justify-between py-8 sm:px-12 px-8 flex-row">
        <Sidebar url="Store" />
        <div className="flex-1 flex flex-col xl:mt-0 my-16">
          <div className="flex flex-row w-full">
            <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
              Store
            </h1>
          </div>
          <p className="font-normal text-[24px] text-white my-10">
            Buy new cards here!
          </p>
          {loading && (
            <div className="mt-16 scale-[100%]">
              <Loader />
            </div>
          )}

          {!loading && (
            <div className="flex flex-row gap-[24px] text-white font-semibold">
              <button
                type="button"
                className="flex items-center h-fit py-4 px-6 hover:bg-[#25718B] bg-[#25618B] rounded-[32px] gap-[12px]"
                onClick={buyCard}
              >
                Buy a Card
              </button>
              <button
                type="button"
                className="flex items-center h-fit py-4 px-6 hover:bg-[#25718B] bg-[#25618B] rounded-[32px] gap-[12px]"
                onClick={buyPack}
              >
                Buy a Pack
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Store;
