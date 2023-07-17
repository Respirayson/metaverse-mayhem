import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { sideBarLinks } from '../constants';
import { fadeAnimation } from '../utils/motion';
import wallet from '/wallet.svg';
import { NftMarketplaceContext } from '../context/NftMarketplace';

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
      onClick={handleClick}
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
    }
    checkProceeds();
  }, [getProceeds, proceeds])

  const handleClick = async () => {
    await withdrawProceeds();
    setProceeds(0);
    setHasProceeds(false);
  }

  return (
    <>
      <div className="sm:flex hidden mr-10 relative z-[100000]">
        <div className="flex justify-between items-center flex-col sticky top-5 h-[80vh]">
          <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
            <div className="flex flex-col justify-center items-center gap-3 relative">
              {sideBarLinks.map((link) => (
                <Icon
                  {...link}
                  key={link.id}
                  isActive={isActive}
                  handleClick={() => {
                    if (!link.disabled) {
                      setIsActive(link.name);
                      navigate(link.link);
                    }
                  }}
                />
              ))}
            </div>
            <Icon id="withdraw" styles="bg-[#1c1c24]" imgUrl={wallet} handleClick={handleClick} disabled={!hasProceeds} />
          </div>
        </div>
      </div>
      {sideBarLinks.map((link) => (
        <Tooltip key={link.id} anchorSelect={`#${link.id}`} place="right">
          <p className="font-medium">
            {link.name}
          </p>
        </Tooltip>
      ))}
      <Tooltip anchorSelect={`#withdraw`} place="right">
          <p className="font-medium">
            Withdraw: <br /> {proceeds} ETH
          </p>
        </Tooltip>
    </>
  );
}

export default Sidebar;
