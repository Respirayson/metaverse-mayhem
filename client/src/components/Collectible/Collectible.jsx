function Collectible({
  card, handleClick,
}) {
  return (
    <div data-testid="collectible-card" className="relative z-0 md:w-[12rem] 2xl:w-[288px] rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
      <img
        alt="portrait"
        src={card.cardImage}
        className="w-full h-full object-fill"
      />

      <div className="absolute w-[32px] 2xl:top-[5%] 2xl:left-[9%] h-[32px] rounded-[25px] top-[2.8%] left-[5.9%] flex items-center justify-center">
        <p className="2xl:text-[32px] text-[20px] font-bold text-blue-200 absolute">{card.mana || 0}</p>
      </div>
      <div className="absolute w-[32px] 2xl:top-[41%] 2xl:left-[8.5%] h-[32px] rounded-[25px] bottom-[51.2%] left-[5.9%] flex items-center justify-center">
        <p className="2xl:text-[32px] text-[20px] font-bold text-yellow-400">{card.attack || 0}</p>
      </div>
      <div className="absolute w-[32px] h-[32px] 2xl:top-[41%] 2xl:right-[8.5%] rounded-[25px] bottom-[51.2%] right-[5.2%] flex items-center justify-center">
        <p className="2xl:text-[32px] text-[20px] font-bold text-red-700">{card.defense || 0}</p>
      </div>
      <div className="absolute w-[80%] bottom-[7%] text-[9px] left-[10%]">
        <p className="text-white text-justify 2xl:text-[14px]">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default Collectible;
