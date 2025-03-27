import React from 'react'
import StoryHolder from './StoryHolder'
import BodyDisplay from './BodyDisplay'
import Header from './Header'
import Footer from './Footer'

const Phone = () => {
  return (
    // centering the whole thing on the screen
    <div className='h-full w-full flex justify-center overflow-hidden'>
        {/* the 'interior' of the phone */}
        <div className='w-full h-screen max-h-screen lg:max-h-[800px] lg:mt-10 sm:max-w-sm'>
            <Header />
            <StoryHolder />
            <BodyDisplay />
            <Footer />
        </div>
    </div>
  )
}

export default Phone