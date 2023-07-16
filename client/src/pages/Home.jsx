import {
  Introduction, About, Explore, GetStarted, Map, NewFeatures,
} from '../components';

function Home() {
  return (
    <>
      <Introduction />
      <div className="relative">
        <About />
        <div className="gradient-03 z-0" />
        <Explore />
      </div>
      <div className="relative">
        <GetStarted />
        <div className="gradient-04 z-0" />
        <NewFeatures />
      </div>
      <Map />
    </>
  );
}

export default Home;
