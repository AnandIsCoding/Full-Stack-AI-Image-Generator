import React from 'react'
import Banner from '../components/Banner'
import Guide from '../components/Guide'
import Testimonials from '../components/Testimonials'


function Home() {
  return (
    <div className='w-full min-h-full px-5 py-3'>
      <Banner/>
      <Guide/>
      <Testimonials/>
      
    </div>
  )
}

export default Home
