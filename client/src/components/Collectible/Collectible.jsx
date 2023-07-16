import { useState, useRef } from "react";

function Collectible({ name, description, mana, attack, defense, image }) {
  return (
    <div className="md:w-[12rem] 2xl:w-[288px] rounded-[15px] bg-[#1c1c24] cursor-pointer">
      <img
        alt="portrait"
        src={image}
        className="md:h-[12rem] 2xl:h-[288px] w-full object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-semibold text-white text-[16px] text-left leading-[26px]">
            {name}
          </h3>
          <p className="mt-[5px] font-normal text-[#808191] text-left leading-[18px]">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-2 mt-[15px]">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              Mana: {mana}
            </h4>
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              Attack: {attack}
            </h4>
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              Defense: {defense}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collectible;
