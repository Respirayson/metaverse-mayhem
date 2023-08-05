/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState, useContext } from 'react';
import {
  Link, Route, Routes, useNavigate,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
  Home,
  Marketplace,
  Game,
  Collection,
  GameNewScreen,
  StartScreen,
  CreateListing,
  JoinBattle,
  MyListings,
  ListingDetails,
  Store,
  SellingDetails,
  ProfileDetails,
  Battleground,
} from './pages';

import {
  Login, Footer, Alert, Logout,
} from './components';
import { navVariants } from './utils/motion';

import { socketActions } from './utils/socketActions';
import { socket } from './utils/socket';

import { WebContext } from './context/WebContext';

import menu from '/menu.svg'; //eslint-disable-line
import close from '/close.svg'; //eslint-disable-line

/**
 * The main App component that renders the entire application.
 * @returns {JSX.Element} - The JSX element representing the App component.
 */
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [toggle, setToggle] = useState(false);
  const {
    showAlert, alertMessage, success, ethBalance,
  } = useContext(WebContext);
  console.log(ethBalance);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socketActions(dispatch, socket);
  }, [dispatch]);

  /**
   * Checks if the user is authenticated by verifying the token with the server.
   * @returns {boolean} - Returns true if the user is authenticated, false otherwise.
   */
  const checkAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://metaverse-mayhem.onrender.com/api/v1/auth/verify', {
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .catch((errors) => {
          console.warn(errors);
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setAuthenticated(false);
          } else {
            setAuthenticated(true);
          }
        });
    }
    return authenticated;
  };

  /**
   * Handles user login by setting the authentication status and saving the token to localStorage.
   * @param {string} token - The authentication token.
   */
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
  };

  /**
   * Handles user logout by removing the token from
   * localStorage and resetting the authentication status.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      {/* Header */}
      <header>
        {/* Navigation bar */}
        <motion.nav
          variants={navVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full flex justify-between items-center bg-primary-black sm:px-8 px-4 py-4"
        >
          {/* Logo */}
          <div className="md:flex-[0.5] flex-initial justify-center items-center text-white font-bold text-2xl">
            <Link to="/">
              <h1>Metaverse Mayhem</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="relative z-20 text-white md:flex hidden list-none flex-row justify-between items-center flex-initial text-l">
            <Link to="/game" className="mx-6 hover:scale-[1.1]">
              Game
            </Link>
            <Link to="/marketplace" className="mx-6 hover:scale-[1.1]">
              Marketplace
            </Link>
            <Link to="/collection" className="mx-6 hover:scale-[1.1]">
              Collection
            </Link>
            <a href="https://discord.gg/YW9zE7t3KC" target="_blank" className="mx-6 hover:scale-[1.1]" rel="noreferrer">
              Discord
            </a>
            {/* Check if the user is authenticated */}
            {checkAuthenticated() ? (
              // If authenticated, show the logout button
              <Logout handleLogout={handleLogout} ethBalance={ethBalance} />
            ) : (
              // If not authenticated, show the login button
              <Login onLoggedIn={handleLogin} text="Connect Wallet" />
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex flex-1 items-end justify-end">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
            <div
              className={`${
                !toggle ? 'hidden' : 'flex'
              } p-6 bg-siteDimBlack mx-4 my-2 top-20 right-0 absolute z-20 rounded-xl`}
            >
              <div className="flex justify-end items-center flex-1 flex-col gap-4 text-white">
                <Link to="/game" className="mx-6 hover:scale-[1.1]">
                  Game
                </Link>
                <Link to="/marketplace" className="mx-6 hover:scale-[1.1]">
                  Marketplace
                </Link>
                <Link to="/collection" className="mx-6 hover:scale-[1.1]">
                  Collection
                </Link>
                {/* Check if the user is authenticated */}
                {checkAuthenticated() ? (
                  // If authenticated, show the logout button
                  <button
                    type="button"
                    className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px] hover:bg-[#25718B]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  // If not authenticated, show the login button
                  <Login onLoggedIn={handleLogin} text="Connect Wallet" />
                )}
              </div>
            </div>
          </div>
        </motion.nav>
      </header>

      {/* Main content */}
      <main className="w-full min-h-[100vh] bg-primary-black overflow-hidden">
        {showAlert && <Alert success={success} message={alertMessage} />}
        <Routes>
          <Route path="/" element={<Home handleLogin={handleLogin} />} />

          <Route path="/game">
            <Route path="" element={<StartScreen />} />
            <Route path="new" element={<GameNewScreen />} />
            <Route path="join-battle" element={<JoinBattle />} />
            <Route path=":id" element={<Game />} />
            <Route path="change-battleground" element={<Battleground />} />
          </Route>

          <Route path="/marketplace">
            <Route path="" element={<Marketplace />} />
            <Route path="create-listing" element={<CreateListing />} />
            <Route path="my-listings" element={<MyListings />} />
            <Route path="store" element={<Store />} />
            <Route
              path="listing-details/:id/:name"
              element={<ListingDetails />}
            />
            <Route path="selling-details/:name" element={<SellingDetails />} />
          </Route>

          <Route path="/collection" element={<Collection />} />
          <Route path="/profile" element={<ProfileDetails />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-primary-black">
        <Footer
          handleLogin={handleLogin}
          authenticated={checkAuthenticated()}
          handleLogout={handleLogout}
        />
      </footer>
    </>
  );
}

export default App;
