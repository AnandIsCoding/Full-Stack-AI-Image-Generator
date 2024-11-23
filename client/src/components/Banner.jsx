import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";

const Banner = () => {
  const navigate = useNavigate()
  const {isLoggedIn, setIsLoggedIn} = useContext(Appcontext);
  const { showAuth, setShowauth } = useContext(Appcontext);
    const Demoimages = ['https://images.deepai.org/machine-learning-models/af4d384431974ab5bfda622a20a27695/anime_fairy.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbCLhWAEcKDFFJWZliYitygdMkPkokKQKqFA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyXpojRvumpsdxXiNOZCtBkU6kVb9zjbScg&s' , 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJwZK5iMjbA8TMbI5FbCpCdJp9gIVWH2XDg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4PN2WwQrWogueXj1Do1bw9-XJEOk8nQZEw&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7FqFnNPjvIaPwVAdTjhy7fma7ByrYxACXEg&s']

    const handleGeneratebtn = () =>{
      if(isLoggedIn){
        navigate('/result')
      }else{
          setShowauth(true)
      }
    }
  return (
    <div className="flex flex-col">
      <div className="w-[75%] mx-auto min-h-[5vw] mt-10 flex flex-col items-center">
        <span className="px-1 py-1  bg-zinc-100 text-black  rounded-full border-2 border-zinc-500 hover:scale-125 duration-[1s] cursor-pointer  ">
          ✨Best text to image generator✨
        </span>
        <h1 className="text-center text-7xl md:text-8xl mt-4 font-semibold">Turn text to <br></br> <span className="text-violet-600">image</span>, in Seconds.</h1>
        <p className="mt-5  text-zinc-300 text-center ">Unleash your cretivity with AI. Turn your imagination into <br></br> visual art in seconds -just type and watch the magic happens</p>
        <button onClick={handleGeneratebtn}  className="md:min-h-[4vw]  px-10  md:mt-5 text-2xl font-bold border-4  bg-violet-700 hover:bg-violet-900  rounded-full text-white mt-2  hover:text-white ">Generate images ✨</button>

      </div>

      <div className="w-full md:w-[60%] mx-auto pt-4 flex items-center justify-center gap-4 overflow-x-auto">
                {
                    Demoimages.map((image,index) =>{
                        return <img key={index} src={image} alt='demo_img' className=" w-[15vw] h-[15vw] md:w-[6vw] md:h-[6vw] rounded-xl " />
                    })
                }
     </div>



    </div>
  );
};

export default Banner;
