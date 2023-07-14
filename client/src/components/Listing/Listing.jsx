function Listing({
  name, description, seller, price, image, handleClick, card, type,
}) {
  return (
    <div
      className="sm:w-[250px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt=""
        className="h-[158px] w-full object-contain rounded-[15px] bg-white"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src="/tag.svg"
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-medium text-[12px] text-[#808191]">
            {type}
          </p>
        </div>

        <div className="block">
          <h3 className="font-semibold text-white text-[16px] text-left leading-[26px] truncate">
            {name}
          </h3>
          <p className="mt-[5px] font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
            .
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-2 mt-[15px]">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              Price:
              {' '}
              {price}
            </h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Mana
              {' '}
              {card.mana}
            </p>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Attack
              {' '}
              {card.attack}
            </p>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Health
              {' '}
              {card.defense}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              Buy
            </h4>
            <p className="mt-[3px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Now
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src=""
              alt="seller"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by
            {' '}
            <span className="text-[#b2b3bd]">{seller}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Listing;
