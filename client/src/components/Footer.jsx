import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

function Footer() {
  return (
    <div className='flex flex-col md:flex-row justify-between  mt-10 px-8 py-2'>
      <img
            src="https://media.craiyon.com/2023-06-01/7c9a14078a8f4c6498ea5c6307037b04.webp"
            alt="logo"
            className=" w-[15vw] h-[15vw] md:w-[2.5vw] md:h-[2.5vw] md:mt-3 rounded-[25%] border-2 border-blue-600 cursor-pointer"
          />
      <h2 className='text-xl font-serif mt-5'>All rights reserved &copy; 🌱🌱 Anand Jha || 2024</h2>
      <span className='flex gap-2 mr-5 mt-6'>
        <FaInstagram size={32} className='text-[red]'/>
        <FaSquareFacebook  size={32} className='text-[#4040c6]'/>
        <FaLinkedin  size={32} className='text-[#7f7ffe]'/>
      </span>
    </div>
  )
}

export default Footer
