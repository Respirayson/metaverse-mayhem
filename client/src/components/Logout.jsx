import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ handleLogout, ethBalance, profileIcon }) {
  const navigate = useNavigate();
  console.log(profileIcon);
  return (
    <div
      className="glassmorphism flex rounded-xl justify-center items-center"
    >
      <p className="text-[18px] text-white mx-4">
        {ethBalance}
        {' '}
        ETH
      </p>
      <div className="absolute right-1/3 w-0.5 h-full bg-gray-400" />
      <button
        type="button"
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        data-dropdown-offset-skidding="-58"
      >
        <img
          src={`/player${profileIcon}.jpg`}
          alt="player01"
          className="w-10 h-10 object-contain rounded-full drop-shadow-lg mx-2 flex items-center justify-center my-2"
        />
      </button>

      <div
        id="dropdownHover"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full flex justify-start items-start"
            >
              Edit Profile
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => navigate('/profile/edit')}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full flex justify-start items-start"
            >
              Edit Profile Icon
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => navigate('/game/change-battleground')}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full flex justify-start items-start"
            >
              Edit Battleground
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full flex justify-start items-start"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Logout;
