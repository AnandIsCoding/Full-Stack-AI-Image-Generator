import React from 'react'
import {testimonials} from '../utils/data'

function Testimonials() {
  return (
    <div className='flex flex-col w-full mt-10 md:mt-0'>
      <h1 className="text-5xl text-center font-thin">Testimonials</h1>
     <div className='w-full flex flex-col md:flex-row overflow-x-auto gap-4 mt-5'>
     {
            testimonials.map((person,index) =>{
                return <div key={index} className='w-[95%] min-h-[50vw] mt-5 md:mt-0 md:w-[25%] md:min-h-[20vw] border-2 border-violet-500 rounded-xl py-3 hover:-scale-x-100 duration-[2s] '>
                <div className='px-2'>
                    <img src={person.image} alt='testimonial_image' className='w-[15vw] h-[15vw] md:w-[4vw] md:h-[4vw] rounded-full mx-auto object-cover'/>
                    <h1 className='text-center text-xl font-semibold mt-1'>{person.name}</h1>
                    <p className='text-center text-sm font-thin'>{person.role}</p>
                    <span className='flex justify-center mt-2'>⭐⭐⭐⭐⭐</span>
                    <p className='text-center text-sm font-thin mt-5 text-violet-100'> " {person.feedback} " </p>
                </div>
            </div>
            })
      }
     </div>
    </div>
  )
}

export default Testimonials
