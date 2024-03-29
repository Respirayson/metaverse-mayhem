/**
 * Component for rendering a feature card with an icon, title, and subtitle.
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.imgUrl - URL of the icon image.
 * @param {string} props.title - Title of the feature.
 * @param {string} props.subtitle - Subtitle or description of the feature.
 * @returns {JSX.Element} FeatureCard component.
 */
function FeatureCard({ imgUrl, title, subtitle }) {
  return (
    <div className="flex-1 flex flex-col sm:max-w-[250px] min-w-[210px]">
      <div
        className="flex justify-center items-center w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]"
      >
        <img src={imgUrl} alt="icon" className="w-1/2 h-1/2 object-contain" />
      </div>
      <h1 className="mt-[26px] font-bold text-[24px] leading-[30.24px] text-white">
        {title}
      </h1>
      <p className="flex-1 mt-[16px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px]">
        {subtitle}
      </p>
    </div>
  );
}

export default FeatureCard;
