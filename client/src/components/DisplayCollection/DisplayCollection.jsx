import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Collectible from '../Collectible/Collectible';
import { fadeIn } from '../../utils/motion';
import Loader from '../Loader';

function DisplayCollection({ index, userCards, loading }) {
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
      {loader && <Loader />}

      <div className="px-16 pt-4 mt-4">
        <h1 className="font-semibold text-white text-left text-[18px]">
          All Collection &#40;
          {userCards.length}
          &#41;
        </h1>
        <div className="flex flex-row justify-end">
          <div className="grid grid-cols-2 gap-[2rem] mt-[20px] flex-wrap">
            {new Array(4).fill(0).map(() => (
              <div
                className="md:w-[12rem] 2xl:w-[288px] rounded-[15px] bg-[#1c1c24]"
              >
                <img
                  alt="cardback"
                  src="/cards/1.png"
                  className="h-full w-full object-cover rounded-[15px]"
                />
              </div>
            ))}
          </div>

          {userCards.length > 0 ? (
            <div className="grid grid-cols-2 gap-[2rem] mt-[20px] ml-[15%]">
              {userCards.slice(index, index + 4).map((collectible, _i) => (
                // Remove duplicates: change to [...new Set(userCards)]
                <AnimatePresence initial mode="wait">
                  <motion.div
                    key={collectible.card.name}
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
                      key={index}
                      card={collectible.card}
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
