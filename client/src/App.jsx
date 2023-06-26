import React, { useContext, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import {
    Home,
    Marketplace,
    Game,
    Collection,
    GameNewScreen,
    StartScreen,
    CreateListing,
} from "./pages";

import { Login, PrivateRoutes } from "./components";

import { TradingCardMinterContext } from "./context/TradingCardMinter";

import { socketActions } from "./utils/socketActions";
import { socket } from "./utils/socket";
import { useDispatch } from "react-redux";

const App = () => {
    const [authenticated, setAuthenticated] = React.useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        socketActions(dispatch, socket);
    }, [dispatch]);

    const { value } = useContext(TradingCardMinterContext);
    console.log(value);

    const checkAuthenticated = () => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("https://metaverse-mayhem.onrender.com/api/v1/auth/verify", {
                body: JSON.stringify({ token: token }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
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
        localStorage.setItem("token", token);
        setAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuthenticated(false);
    };

    return (
        <BrowserRouter>
            <header className="w-full flex justify-between items-center bg-primary sm:px-8 px-4 py-4">
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
                            className="flex flex-row justify-center items-center bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] font-semibold"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <Login onLoggedIn={handleLogin} />
                    )}
                </div>
            </header>

            <main className="w-full min-h-[calc(100vh-73px)] bg-hero-pattern bg-no-repeat bg-cover">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                currentAccount={checkAuthenticated()}
                                connectWallet={handleLogin}
                            />
                        }
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
        </BrowserRouter>
    );
};

export default App;
