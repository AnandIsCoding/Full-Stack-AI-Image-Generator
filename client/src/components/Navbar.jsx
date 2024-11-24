import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext"; // Use named import for Appcontext
import axios from 'axios';

function Navbar() {
  const savedUser = localStorage.getItem("user");
  const { isLoggedIn, totalCredits, setTotalCredits, loggedInuser } = useContext(Appcontext);
  const navigate = useNavigate();
  const { showAuth, setShowauth } = useContext(Appcontext);

  const handleShowauth = () => {
    setShowauth(true);
  };

  // Function to fetch the user credits
  const fetchDetails = async () => {
    try {
      const { data } = await axios.get('https://genmyimage.onrender.com/api/v1/user/credits', {
        withCredentials: true,  // Make sure to send cookies if needed
      });
      console.log(data); // Log the resp
      if (data.success) {
        setTotalCredits(data.user.userAvailablecredits);  // Set totalCredits if the request is successful
      } else {
        console.error('Failed to fetch credits:', data.message);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  // useEffect to fetch details when the component mounts
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     //fetchDetails();  
  //   }
  // }, [isLoggedIn, setTotalCredits]);

  return (
    <div>
      <div className="px-4 md:px-6 py-2 flex flex-col md:flex-row justify-between mt-3 rounded-xl w-[98%] mx-auto">
        <div onClick={() => navigate('/')} className="flex gap-2">
          <img
            src="https://media.craiyon.com/2023-06-01/7c9a14078a8f4c6498ea5c6307037b04.webp"
            alt="logo"
            className="w-[15vw] h-[15vw] md:w-[5vw] md:h-[5vw] rounded-[25%] border-2 border-blue-600 cursor-pointer"
          />
          <h1 className="mt-4 text-3xl text-violet-500 cursor-pointer">AI image builder</h1>
        </div>

        {/* when user is not logged in */}
        {!isLoggedIn ? (
          <div className="flex gap-4 mt-5 md:mt-0 animate-bounce duration-[2s]">
            <button
              onClick={() => navigate('/buy')}
              className="md:h-[3vw] px-10 py-2 mt-0 md:mt-3 text-xl rounded-full bg-violet-500 text-white hover:bg-white hover:text-black border-2 border-inner border-white"
            >
              Pricing
            </button>
            <button
              onClick={handleShowauth}
              className="md:h-[3vw] px-10 py-2 md:mt-3 text-xl bg-white rounded-full text-black hover:bg-violet-500 hover:text-white border-4 border-inner border-violet-400"
            >
              Login
            </button>
          </div>
        ) : (
          // when user is logged in
          <div className="flex gap-4 md:animate-bounce">
            <button
              onClick={() => navigate('/buy')}
              className="md:h-[3vw] px-10 py-2 mt-3 md:text-xl rounded-full bg-violet-500 text-white hover:bg-white hover:text-black border-2 border-inner border-white"
            >
              ⭐Credits {totalCredits ? totalCredits : 'NaN'}
            </button>
            <button className="md:h-[3vw] px-10 py-2 mt-3 md:text-xl bg-white rounded-full text-black hover:bg-violet-500 hover:text-white border-4 border-inner border-violet-400">
              { loggedInuser ?  loggedInuser : 'userName'} 🤹‍♂️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
