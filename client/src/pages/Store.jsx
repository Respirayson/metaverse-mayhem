import React, { useContext } from 'react';
import { Sidebar } from '../components';
import { TradingCardMinterContext } from '../context/TradingCardMinter';

function Store() {
  const { mintTradingCard, requestNewPack } = useContext(
    TradingCardMinterContext,
  );

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-row">
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
        <div className="flex flex-row gap-[24px] text-white font-semibold">
          <button
            type="button"
            className="flex items-center h-fit py-4 px-6 hover:bg-[#25718B] bg-[#25618B] rounded-[32px] gap-[12px]"
            onClick={mintTradingCard}
          >
            Buy a Card
          </button>
          <button
            type="button"
            className="flex items-center h-fit py-4 px-6 hover:bg-[#25718B] bg-[#25618B] rounded-[32px] gap-[12px]"
            onClick={requestNewPack}
          >
            Buy a Pack
          </button>
        </div>
      </div>
    </div>
  );
}

export default Store;
