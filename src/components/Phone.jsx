import React from 'react'
import StoryHolder from './StoryHolder'
import BodyDisplay from './BodyDisplay'
import ImageModal from './ImageModal'

const Phone = () => {
  return (
    // centering the whole thing on the screen
    <div className='h-full w-full flex justify-center pt-10'>
        {/* the 'interior' of the phone */}
        <div className='bg-vintage-mango rounded-2xl w-xs relative flex flex-col p-5 gap-2'>
            <StoryHolder />
            <BodyDisplay />
            {/* <ImageModal /> */}
        </div>
    </div>
  )
}

export default Phone