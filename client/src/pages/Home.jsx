import { SiEthereum } from 'react-icons/si';
import { useLottie } from 'lottie-react';
import { Login } from '../components';
import bitcoinCity from '../assets/bitcoinCity.json';

const companyCommonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

function Home(props) {
  const { currentAccount, connectWallet } = props;

  const options = {
    animationData: bitcoinCity,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <>
      <div className="flex w-full justify-center items-center h-[750px]">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-5xl sm:text-6xl text-white text-gradient py-1">
              Join the Battle
              {' '}
              <br />
              {' '}
              for the Metaverse
            </h1>
            <p className="text-left my-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Enter the Battlegrounds, a world of infinite
              possibilities where you&apos;ll compete in fast-paced
              battles using powerful cards. Build your deck,
              collect your heroes, and earn all while playing.
            </p>
            {!currentAccount && (
            <Login
              onLoggedIn={connectWallet}
              bigButton={false}
            />
            )}

            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
              <div
                className={`rounded-tl-2xl ${companyCommonStyles}`}
              >
                Secure
              </div>
              <div className={companyCommonStyles}>Fun</div>
              <div
                className={`sm:rounded-tr-2xl ${companyCommonStyles}`}
              >
                Ethereum
              </div>
              <div
                className={`sm:rounded-bl-2xl ${companyCommonStyles}`}
              >
                Web 3.0
              </div>
              <div className={companyCommonStyles}>Exciting</div>
              <div
                className={`rounded-br-2xl ${companyCommonStyles}`}
              >
                Blockchain
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-96 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-40 h-40 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={100} color="#fff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[800px] w-full bg-about bg-cover">
        <h1 className="text-white flex justify-center items-center pt-16 text-4xl">
          The Ethereum Blockchain
        </h1>
        <div>
          <p className="text-white flex justify-center items-center text-center text-xl font-light w-2/3 mx-auto mt-4">
            Built on the Ethereum Net, Metaverse Mayhem is a
            cutting-edge web3 card game designed for players who
            crave excitement, competition, and endless
            possibilities. Buy and sell your trading cards. Build
            your decks. Everything is yours for the taking
          </p>
        </div>
        <div className="flex w-full items-center justify-center ">
          <div className="h-[500px] w-[500px] flex flex-row justify-start">
            {View}
          </div>
          <div className="flex flex-col p-24">
            <p className="text-white text-3xl my-4">
              Your Very Own Cards
            </p>
            <p className="text-white text-3xl my-4">
              A Game Like No Other
            </p>
            <p className="text-white text-3xl my-4">
              Rise to the top
            </p>
            <p className="text-white text-3xl my-4">
              Join the Community
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
