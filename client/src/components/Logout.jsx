import React from 'react';

function Logout({ handleLogout, ethBalance }) {
  return (
    <div className="glassmorphism flex flex-row rounded-xl justify-center items-center">
      <p className="text-[18px] text-white mx-4">
        {ethBalance}
        {' '}
        ETH
      </p>
      <div className="absolute right-1/3 w-0.5 h-full bg-gray-400" />
      <img
        src="/player01.jpg"
        alt="player01"
        className="peer w-10 h-10 object-contain rounded-full drop-shadow-lg m-2"
      />
      <div
        className="hidden peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg absolute top-16 right-0 rounded-xl"
      >
        <a className="px-5 py-3 hover:bg-gray-200" href="#">
          About Us
        </a>
        <a className="px-5 py-3 hover:bg-gray-200" href="#">
          Contact Us
        </a>
        <a className="px-5 py-3 hover:bg-gray-200" href="#">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

{
  /* <button
      type="button"
      className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px] hover:bg-[#25718B]"
      onClick={handleLogout}
    >
      Logout
    </button> */
}

export default Logout;
