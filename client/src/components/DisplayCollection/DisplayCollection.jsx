import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Collectible from '../Collectible/Collectible';
import { TradingCardMinterContext } from '../../context/TradingCardMinter';
import { cards } from '../../utils/cards';
import { fadeIn } from '../../utils/motion';

function DisplayCollection({ index, userCards, loading }) {
  const { mintTradingCard } = React.useContext(TradingCardMinterContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <>
      {loader && (
        <div className="preloader">
          <div className="preloader-wrapper">
            <div className="loading">
              <div className="circle" />
              <div className="circle" />
              <div className="circle" />
            </div>
          </div>
        </div>
      )}

      <div className="px-16 pt-4">
        <button type="button" className="text-white" onClick={() => mintTradingCard()}>
          Test Contract
        </button>
        <h1 className="font-semibold text-white text-left text-[18px]">
          All Collection &#40;
          {userCards.length}
          &#41;
        </h1>
        <div className="flex flex-row justify-end">
          <div className="grid grid-cols-2 gap-[26px] mt-[20px]">
            {cards.slice(index, index + 4).map((card, i) => (
              <AnimatePresence initial mode="wait">
                <motion.div
                  key={card.name}
                  whileHover={{ scale: 1.1 }}
                  variants={fadeIn(
                    'up',
                    'tween',
                    (loader ? 2 : 0) + index / 10,
                    0.5,
                  )}
                  initial="hidden"
                  whileInView="show"
                >
                  <Collectible
                    image={card.portrait}
                    key={i}
                    name={card.name}
                    description={card.description}
                    mana={card.mana}
                    attack={card.attack}
                    defense={card.defense}
                  />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>

          {userCards.length > 0 ? (
            <div className="grid grid-cols-2 gap-[26px] mt-[20px] ml-[15%]">
              {userCards.map((card, index) => (
                // Remove duplicates: change to [...new Set(userCards)]
                <AnimatePresence initial mode="wait">
                  <motion.div
                    key={card.name}
                    variants={fadeIn('up', 'tween', index / 10, 0.5)}
                    initial="hidden"
                    whileInView="show"
                  >
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
                </AnimatePresence>
              ))}
            </div>
          ) : (
            <div className="flex mt-[20px] ml-[15%]">
              <h1 className="font-semibold text-white text-left text-[18px]">
                No Trading Cards found in your Collection
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DisplayCollection;
