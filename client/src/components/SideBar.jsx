import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import { sideBarLinks } from '../constants';
import { fadeAnimation } from '../utils/motion';

function Icon({
  styles, name, imgUrl, isActive, disabled, handleClick, id,
}) {
  return (
    <motion.div
      id={id}
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && 'bg-[#2c2f32]'
      } flex justify-center items-center ${
        !disabled && 'cursor-pointer'
      } ${styles}`}
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

  return (
    <>
      <div className="sm:flex hidden mr-10 relative">
        <div className="flex justify-between items-center flex-col sticky top-5 h-[80vh]">
          <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
            <div className="flex flex-col justify-center items-center gap-3">
              {sideBarLinks.map((link) => (
                <Icon
                  {...link}
                  id={link.id}
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
          </div>
        </div>
      </div>
      {sideBarLinks.map((link) => (
        <Tooltip anchorSelect={`#${link.id}`} place="right">
          <p className="font-medium">
            {link.name}
          </p>
        </Tooltip>
      ))}
    </>
  );
}

export default Sidebar;
