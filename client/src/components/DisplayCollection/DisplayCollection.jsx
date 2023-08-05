import React, { useEffect, useState, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Collectible from '../Collectible/Collectible';
import { fadeIn } from '../../utils/motion';
import Loader from '../Loader';
import { WebContext } from '../../context/WebContext';

/**
 * DisplayCollection component displays the user's card collection and allows
 * them to add cards to their deck for a game.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.index - The index of the current card page in the collection.
 * @param {Object[]} props.userCards - An array of collectible cards in the user's collection.
 * @param {boolean} props.loading - Flag indicating if the component is in a loading state.
 * @param {Object[]} props.deck - An array of cards currently in the user's deck for the game.
 * @returns {JSX.Element} The JSX element representing the DisplayCollection component.
 */
function DisplayCollection({
  index, userCards, loading, deck,
}) {
  // State for the loader and cards currently in the game
  const [loader, setLoader] = useState(true);
  const [cardsInGame, setCardsInGame] = useState([]);

  // Accessing context data from WebContext
  const {
    setShowAlert, setAlertMessage, setSuccess, currentAccount,
  } = useContext(WebContext);

  // useEffect to control the loader display
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  }, [loading]);

  // useEffect to update the cardsInGame state when the deck prop changes
  useEffect(() => {
    if (deck.length > 0) {
      setCardsInGame(deck);
    }
  }, [deck]);

  /**
   * Adds a card to the user's deck for the game.
   * @param {Object} card - The card object to be added to the deck.
   * @returns {void}
   */
  const addCard = (card) => {
    if (cardsInGame.length === 15) {
      setShowAlert(true);
      setAlertMessage('You can only have 15 cards in your deck');
      setSuccess(false);
      return;
    }
    setCardsInGame([...cardsInGame, card]);
  };

  /**
   * Removes a card from the user's deck for the game.
   * @param {Object} card - The card object to be removed from the deck.
   * @returns {void}
   */
  const removeCard = (card) => {
    const loc = cardsInGame.findIndex((c) => c.name === card.name);
    setCardsInGame([
      ...cardsInGame.slice(0, loc),
      ...cardsInGame.slice(loc + 1),
    ]);
  };

  /**
   * Handles the deck submission for the game.
   * Sends a request to update the database with the selected cards.
   * @returns {void}
   */
  const handleSubmit = async () => {
    if (cardsInGame.length !== 15) {
      setShowAlert(true);
      setAlertMessage('Please select 15 cards');
      setSuccess(false);
      return;
    }
    setLoader(true);
    await fetch('https://metaverse-mayhem.onrender.com/api/v1/game/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: currentAccount,
        cards: cardsInGame,
      }),
    });
    setLoader(false);
    setShowAlert(true);
    setAlertMessage('Deck Submitted Successfully');
    setSuccess(true);
  };

  return (
    <>
      {loader && <Loader />}

      <div className="pt-4 mt-4">
        <h1 className="px-16 font-semibold text-white text-left text-[18px]">
          All Collection &#40;
          {userCards.length}
          &#41;
        </h1>
        <div className="pr-10 pl-4 mt-4 flex flex-row justify-end">
          <div className="bg-siteDimBlack w-[20%] mr-12 mt-4 rounded-2xl justify-top align-center flex flex-col">
            {cardsInGame.length === 0 && (
              <p className="text-gray-300 mx-auto text-[16px] mt-4">
                No Cards in your Deck
              </p>
            )}
            {cardsInGame.length > 0 && (
              <p className="text-gray-400 mx-auto text-[16px] my-4 font-semibold">
                {cardsInGame.length}
                {' '}
                Cards in your Deck
              </p>
            )}
            {cardsInGame.slice().sort((a, b) => a.mana - b.mana).map((card) => (
              <p
                onClick={() => removeCard(card)}
                className="text-white mx-auto my-2 cursor-pointer hover:text-gray-300"
              >
                {card.name}
                {' '}
                <span className="text-blue-500 font-semibold">{card.mana}</span>
                {' '}
                <span className="text-yellow-500 font-semibold">
                  {card.attack}
                </span>
                {' '}
                <span className="text-red-500 font-semibold">
                  {card.defense}
                </span>
              </p>
            ))}
            {cardsInGame.length > 0 && (
              <button
                type="button"
                className="justify-center relative h-fit mx-8 py-4 px-6 hover:bg-[#25718B] bg-[#25618B] rounded-[32px]"
                onClick={handleSubmit}
              >
                <p className="text-white text-[16px] font-semibold">
                  Submit Deck
                </p>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-[2rem] mt-[20px] flex-wrap">
            {new Array(4).fill(0).map(() => (
              <div className="md:w-[12rem] 2xl:w-[288px] rounded-[15px] bg-[#1c1c24]">
                <img
                  alt="cardback"
                  src="/cards/1.png"
                  className="h-full w-full object-cover rounded-[15px]"
                />
              </div>
            ))}
          </div>

          {userCards.length > 0 ? (
            <div className="grid grid-cols-2 gap-[2rem] mt-[20px] ml-[8%]">
              {userCards.slice(index, index + 4).map((collectible, _i) => (
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
                      handleClick={addCard}
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
