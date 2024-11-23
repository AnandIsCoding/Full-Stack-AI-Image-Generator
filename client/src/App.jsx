import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredits from "./pages/BuyCredits";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Auth from "./components/Auth";
import { Appcontext } from "./context/Appcontext";
import axios from "axios";

function App() {
  const { showAuth, setShowauth } = useContext(Appcontext);
  const { isLoggedIn, setIsLoggedIn } = useContext(Appcontext);

 

  
  return (
    <div>
      <Navbar />
      {showAuth && <Auth />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredits />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
