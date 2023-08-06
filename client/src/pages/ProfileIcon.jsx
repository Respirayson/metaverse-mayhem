import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WebContext } from '../context/WebContext';
import { profileIcons } from '../constants';

function ProfileIcon() {
  const navigate = useNavigate();
  const {
    setShowAlert, setSuccess, setAlertMessage, setProfileIcon,
  } = useContext(WebContext);

  const handleIcon = (icon) => {
    setProfileIcon(icon.id);

    localStorage.setItem('profileIcon', icon.id);

    setShowAlert(true);
    setSuccess(true);
    setAlertMessage(`${icon.name} is battle ready!`);

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-col">
      <div className="flex-1 flex justify-center flex-col xl:mt-0">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            Choose your Profile Icon
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          What will your hero look like?
        </p>

        <div className="flex items-center justify-center flex-wrap max-w-[1200px]">
          {profileIcons.map((icon) => (
            <div
              key={icon.id}
              className="flex items-center justify-center w-56 h-56 p-2 glassmorphism m-4 rounded-lg cursor-pointer battle-card"
              onClick={() => handleIcon(icon)}
            >
              <img
                src={icon.image}
                alt="icon"
                className="w-full h-full object-cover rounded-full"
              />

              <div className="info absolute">
                <p className="font-semibold text-2xl text-white">
                  {icon.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileIcon;
