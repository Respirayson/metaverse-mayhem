import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import wallet from '/wallet.svg'; // eslint-disable-line
import { sideBarLinks } from '../constants';
import { fadeAnimation } from '../utils/motion';
import { NftMarketplaceContext } from '../context/NftMarketplace';

/**
 * Represents an icon component for the sidebar navigation.
 * @param {Object} props - The props passed to the Icon component.
 * @param {string} props.name - The name of the icon.
 * @param {string} props.imgUrl - The URL of the icon image.
 * @param {string} props.isActive - The name of the currently active icon.
 * @param {boolean} props.disabled - Indicates if the icon is disabled or not.
 * @param {Function} props.handleClick - The function to handle click events on the icon.
 * @param {string} props.id - The unique ID of the icon.
 * @returns {JSX.Element} Icon component.
 */
function Icon({
  name, imgUrl, isActive, disabled, handleClick, id,
}) {
  return (
    <motion.div
      id={id}
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && 'bg-[#2c2f32]'
      } flex justify-center items-center ${
        !disabled && 'cursor-pointer'
      }`}
      onClick={!disabled ? handleClick : null}
      {...fadeAnimation}
    >
      {!isActive ? (
        <img src={imgUrl} alt="logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="logo"
          className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
        />
      )}
    </motion.div>
  );
}

/**
 * Component for rendering the sidebar navigation and withdraw button with tooltips.
 * @param {string} url - The current URL path.
 * @returns {JSX.Element} Sidebar component.
 */
function Sidebar({ url }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(url);
  const [proceeds, setProceeds] = useState(0);
  const [hasProceeds, setHasProceeds] = useState(false);

  const { getProceeds, withdrawProceeds } = useContext(NftMarketplaceContext);

  useEffect(() => {
    const checkProceeds = async () => {
      const amount = await getProceeds();
      setProceeds(amount);
      setHasProceeds(amount > 0);
    };
    checkProceeds();
  }, [getProceeds, proceeds]);

  /**
   * Handles the click event for the sidebar icons 
   * and navigates to the corresponding link if not disabled.
   * @param {string} name - The name of the sidebar icon.
   */
  const handleClick = async (name) => {
    if (name === 'withdraw') {
      await withdrawProceeds();
      setProceeds(0);
      setHasProceeds(false);
    } else {
      const link = sideBarLinks.find((link) => link.name === name);
      if (link && !link.disabled) {
        setIsActive(name);
        navigate(link.link);
      }
    }
  };

  return (
    <>
      {/* Sidebar navigation */}
      <div className="sm:flex hidden mr-10 relative z-[100000]">
        <div className="flex justify-between items-center flex-col sticky top-5 h-[80vh]">
          <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
            <div className="flex flex-col justify-center items-center gap-3 relative">
              {sideBarLinks.map((link) => (
                <Icon
                  {...link}
                  key={link.id}
                  isActive={isActive}
                  handleClick={() => handleClick(link.name)}
                />
              ))}
            </div>
            {/* Withdraw button */}
            <Icon
              id="withdraw"
              styles="bg-[#1c1c24]"
              imgUrl={wallet}
              handleClick={() => handleClick('withdraw')}
              disabled={!hasProceeds}
            />
          </div>
        </div>
      </div>

      {/* Tooltips for sidebar links */}
      {sideBarLinks.map((link) => (
        <Tooltip key={link.id} anchorSelect={`#${link.id}`} place="right">
          <p className="font-medium">{link.name}</p>
        </Tooltip>
      ))}

      {/* Tooltip for withdraw button */}
      <Tooltip anchorSelect="#withdraw" place="right">
        <p className="font-medium">
          Withdraw:
          <br />
          {proceeds}
          ETH
        </p>
      </Tooltip>
    </>
  );
}

export default Sidebar;
