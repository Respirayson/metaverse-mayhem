import React from "react";
import { Listing } from "..";
import { useNavigate } from "react-router-dom";
import { cards } from "../../utils/cards";

const DisplayMarketplace = () => {
    const navigate = useNavigate();

    return (
        <div className="p-16">
            <h1 className="font-semibold text-white text-left text-[18px]">
                All Listings &#40;3&#41;
            </h1>
            <button className="text-white" onClick={() => navigate("/create")}>Create Listing</button>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {cards.map((card, index) => {
                    return (
                        <Listing
                            key={index}
                            name={card.name}
                            description={"test"}
                            seller={"hello"}
                            price={Math.random()}
                            minion={card.minion}
                            image={card.portrait}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default DisplayMarketplace;
