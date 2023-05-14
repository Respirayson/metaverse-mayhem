import React from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Home, Marketplace } from "./pages";
import { Login } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to='/'>
          <h1>Metaverse Mayhem</h1>
        </Link>
        <Link to="/marketplace" className="font-inter font-medium px-4 py-2">
          Marketplace
        </Link>
        <Login />
        
        
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App