import { DisplayCollection } from '../components';

function Collection() {
  return (
    <div className="flex flex-1 justify-between py-8 sm:px-12 px-8 flex-col">
      <div className="flex-1 flex justify-center flex-col xl:mt-0">
        <div className="flex flex-row w-full">
          <h1 className="flex font-bold text-white sm:text-6xl text-4xl head-text">
            My Collection
          </h1>
        </div>
        <p className="font-normal text-[24px] text-white my-10">
          View your Trading Cards in your own Wallet
        </p>
        <div className="glassmorphism rounded-3xl h-full w-full px-16 pt-4">
          <DisplayCollection />
        </div>
      </div>
    </div>
  );
}

export default Collection;
