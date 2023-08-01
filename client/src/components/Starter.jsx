/**
 * Represents a starter component with a number and text.
 * @param {Object} props - The props passed to the Starter component.
 * @param {string} props.number - The number to be displayed in the starter.
 * @param {string} props.text - The text to be displayed in the starter.
 * @returns {JSX.Element} Starter component.
 */
function Starter({ number, text }) {
  return (
    <div className="flex justify-center items-center flex-row">
      <div
        className="flex justify-center items-center w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]"
      >
        <p className="font-bold text-[20px] text-white">
          {number}
        </p>
      </div>
      <p className="flex-1 ml-[30px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px]">
        {text}
      </p>
    </div>
  );
}

export default Starter;
