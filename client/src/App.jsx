import React from 'react'
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";

import { Home, Marketplace } from "./pages";
import { Login } from "./components";

const App = () => {

  const [authenticated, setAuthenticated ] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch("http://127.0.0.1:5000/api/v1/auth/verify", {
        body: JSON.stringify({ "token": token }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(res => res.json()).then(data => {
        if (data.error) {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }});
    }
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  }
  
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to='/'>
          <h1>Metaverse Mayhem</h1>
        </Link>
        <Link to="/game" className="font-inter font-medium px-4 py-2">
          Game
        </Link>
        <Link to="/marketplace" className="font-inter font-medium px-4 py-2">
          Marketplace
        </Link>
        <Link to="/community" className="font-inter font-medium px-4 py-2">
          Community
        </Link>
        {authenticated ? <button className="font-inter font-medium px-4 py-2" onClick={handleLogout}>Logout</button> : <Login onLoggedIn={handleLogin} />}
        
        
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/marketplace" element={ authenticated ? <Marketplace /> : <Navigate to="/" />} />
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App