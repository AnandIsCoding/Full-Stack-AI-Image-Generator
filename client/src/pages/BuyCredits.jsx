import React from 'react'
import { plans } from '../utils/data'

function BuyCredits() {
  return (
    <div>
      <div className='mt-8 flex flex-col items-center'>
        <span  className="md:h-[3vw] px-10 py-2 mt-0 md:mt-3 text-xl rounded-full border-2 border-violet-600 hover:bg-white hover:text-black bg-blue-200 text-black">Our plans</span>
        <h1 className="text-center text-5xl md:text-5xl mt-4 font-semibold">Choose the plan</h1>
        <div className='w-full flex flex-col md:flex-row md:items-center md:justify-center overflow-x-auto gap-4 mt-5 ml-4 md:ml-0 mb-5'>
        {
            plans.map((plan,index) =>{
                return <div key={index} className='w-[95%] min-h-[50vw] mt-5 md:mt-0 md:w-[25%] md:min-h-[20vw] rounded-xl py-3 bg-zinc-100 hover:scale-95 duration-[2s] '>
                <div className='px-2 flex flex-col items-center'>
                    <img src={plan.image} alt='testimonial_image' className='w-[15vw] h-[15vw] md:w-[4vw] md:h-[4vw] rounded-full mx-auto object-cover'/>
                    <h1 className='text-center text-3xl font-extrabold mt-1 text-violet-800'>{plan.name}</h1>
                    <p className='text-center text-4xl mt-2 font-extrabold text-violet-900'>{plan.price} 💲 </p>
                    <span className='flex justify-center mt-2 text-2xl font-bold text-green-800'>{plan.credits} credits ✨</span>
                    <div className='w-[40%] mx-auto mt-2 h-[3px] bg-violet-200 rounded-full'></div>
                    <p className='text-center text-lg font-extrabold mt-5  text-violet-800'> " {plan.description} " </p>
                    <button className='px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-900 text-white text-xl font-bold mt-2'>Get Started</button>
                </div>
            </div>
            })
      }
        </div>
      </div>
    </div>
  )
}

export default BuyCredits
