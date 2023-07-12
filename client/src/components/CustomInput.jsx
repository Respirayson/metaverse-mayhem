import React from 'react';

function CustomInput({
  label, placeHolder, value, handleValueChange,
}) {
  return (
    <>
      <label htmlFor="name" className="font-semibold text-2xl text-white mb-3">{label}</label>
      <input
        id="name"
        type="text"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        className="bg-siteDimBlack text-white outline-none focus:outline-siteBlue p-4 rounded-md sm:max-w-[50%] max-w-full z-50"
      />
    </>
  );
}

export default CustomInput;
