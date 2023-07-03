import Collectible from "../Collectible/Collectible";
import { cards } from "../../utils/cards";
import { motion } from "framer-motion";
import { slideAnimation } from "../../utils/motion";

const DisplayCollection = () => {
    console.log(cards);
    return (
        <div className="p-16">
            <h1 className="font-semibold text-white text-left text-[18px]">
                All Collection &#40;{cards.length}&#41;
            </h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {cards.map((card, index) => {
                    return (
                        <motion.div key={index} {...slideAnimation("left")}>
                            <Collectible
                                image={card.portrait}
                                key={index}
                                name={card.name}
                                description={card.description}
                                mana={card.mana}
                                attack={card.attack}
                                defense={card.defense}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default DisplayCollection;
