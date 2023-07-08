import React, { useEffect } from 'react';
import {
  BrowserRouter, Link, Route, Routes,
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
} from './pages';

import { Login, PrivateRoutes, Footer } from './components';
import { navVariants } from './utils/motion';

import { socketActions } from './utils/socketActions';
import { socket } from './utils/socket';

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    socketActions(dispatch, socket);
  }, [dispatch]);

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

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <header>
        <motion.nav
          variants={navVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full flex justify-between items-center bg-primary-black sm:px-8 px-4 py-4"
        >
          <div className="md:flex-[0.5] flex-initial justify-center items-center text-white font-bold text-2xl">
            <Link to="/">
              <h1>Metaverse Mayhem</h1>
            </Link>
          </div>

          <div className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial text-l">
            <Link to="/game" className="mx-6">
              Game
            </Link>
            <Link to="/marketplace" className="mx-6">
              Marketplace
            </Link>
            <Link to="/collection" className="mx-6">
              Collection
            </Link>
            {checkAuthenticated() ? (
              <button
                type="button"
                className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Login onLoggedIn={handleLogin} text="Connect Wallet" />
            )}
          </div>
        </motion.nav>
      </header>

      <main className="w-full min-h-[calc(100vh-73px)] bg-primary-black overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={<Home handleLogin={handleLogin} />}
          />

          <Route path="/game">
            <Route path="" element={<StartScreen />} />
            <Route path="new" element={<GameNewScreen />} />
            <Route path=":id" element={<Game />} />
          </Route>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/create" element={<CreateListing />} />

          <Route
            element={
              <PrivateRoutes authenticated={authenticated} />
                        }
          >
            <Route path="/collection" element={<Collection />} />
          </Route>
        </Routes>
      </main>
      <footer className="bg-primary-black">
        <Footer
          handleLogin={handleLogin}
          authenticated={checkAuthenticated()}
          handleLogout={handleLogout}
        />
      </footer>
    </BrowserRouter>
  );
}

export default App;
