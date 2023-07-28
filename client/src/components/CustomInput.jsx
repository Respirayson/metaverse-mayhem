import React from 'react';

/**
 * Component for rendering a custom input field.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.placeHolder - The placeholder text for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.handleValueChange - Function to handle changes to the input field value.
 * @returns {JSX.Element} CustomInput component.
 */
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
