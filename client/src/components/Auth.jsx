import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../context/Appcontext";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import axios from 'axios'
import toast from 'react-hot-toast';

function Auth() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { showAuth, setShowauth, setTotalCredits, setLoggedinuser } = useContext(Appcontext);
  const { isLoggedIn, setIsLoggedIn, appToken, setAppToken } = useContext(Appcontext);
  const [showSignup, setShowsignup] = useState(false);
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Retrieve token and user data from localStorage if available
    

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [setAppToken, setLoggedinuser, setIsLoggedIn]);

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log("Username = ", userName);
    console.log("email", email);
    console.log("password", password);
    try {
      const { data } = await axios.post('https://genmyimage.onrender.com/api/v1/user/signup', { userName, email, password });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setUsername(""), setEmail(""), setPassword("");
        setShowsignup(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const { data } = await axios.post('https://genmyimage.onrender.com/api/v1/user/login', { email, password }, { withCredentials: true });
    
      if (data.success) {
        toast.success(data.message);
        setTotalCredits(data.userCredits);
        setLoggedinuser(data.userName);
        setAppToken(data.userToken);
       
        setUsername(""), setEmail(""), setPassword("");
        setIsLoggedIn(true);
        setShowauth(false);
      } else {
        toast.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    showAuth && (
      <div className="absolute left-0 right-0 top-0 bottom-0 h-[100vh] w-full bg-[#000000ca]  backdrop-blur-5xl bg-blend-color-burn flex justify-center items-center">
        <form className="w-[95%] md:w-[24%] bg-white rounded-xl min-h-[27vw] fixed text-black py-1">
          <IoCloseSharp
            onClick={() => setShowauth(false)}
            size={32}
            className="absolute cursor-pointer top-2 right-2 text-[blue]"
          />
          <IoPersonCircleSharp
            size={42}
            className="mx-auto mt-1 text-violet-500"
          />
          <h1 className="text-center text-3xl font-extrabold text-violet-700">
            {!showSignup ? "Login" : "SignUp"}
          </h1>
          <div className="w-[75%] h-[2px] mt-2 mx-auto bg-violet-600 rounded-full"></div>
          <p className="text-center text-sm font-bold text-black mt-2">
            {!showSignup ? "welcome back ! please sign in to continue" : "Here you sign in to platform"}
          </p>

          {!showSignup ? (
            <div className="flex flex-col items-center mt-5">
              <input
                type="email"
                placeholder="Your email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="bg-transparent outline-none border-2 border-violet-800 rounded-xl w-[80%]  mt-2 px-5 py-3"
              />

              <input
                type="password"
                placeholder="your password"
                autoComplete="true"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="bg-transparent outline-none border-2 border-violet-800 rounded-xl w-[80%]  mt-3 px-5 py-3 "
              />
              <button
                onClick={(event) => handleLogin(event)}
                className="w-[80%] mx-auto px-5 py-2 mt-3 rounded-xl bg-[blue] text-white text-xl font-bold"
              >
                Login
              </button>
              <p className="mt-3 font-extrabold text-lg text-[#978e8e] ml-[-2vw]">
                Don't have an account{" "}
                <span
                  className="text-[blue] cursor-pointer underline"
                  onClick={() => setShowsignup(true)}
                >
                  Sign Up
                </span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-5">
              <input
                value={userName}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="Full name"
                required
                className="bg-transparent outline-none border-2 border-violet-800 rounded-xl w-[80%]  mt-2 px-5 py-3"
              />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="your email"
                required
                className="bg-transparent outline-none border-2 border-violet-800 rounded-xl w-[80%]  mt-3 px-5 py-3 "
              />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Enter a strong password"
                required
                className="bg-transparent outline-none border-2 border-violet-800 rounded-xl w-[80%]  mt-3 px-5 py-3 "
              />
              <button
                onClick={(event) => handleSignup(event)}
                className="w-[80%] mx-auto px-5 py-2 mt-3 rounded-xl bg-[#4444ff] text-white text-xl font-bold"
              >
                Sign Up
              </button>
              <p className="mt-3 font-extrabold text-lg text-[#978e8e] ml-[-2vw]">
                Already have an account{" "}
                <span
                  className="text-[blue] cursor-pointer underline"
                  onClick={() => setShowsignup(false)}
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </form>
      </div>
    )
  );
}

export default Auth;
