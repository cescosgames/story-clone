import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    // the progress bar 'filling' based off of progress (current question / max questions) passed down from quiz info
    <div className='w-full h-1'>
        <div className='h-1 transition-all ease-in-out bg-gray-300/50 rounded-xs w-full'>
            <div className='h-full transition-all duration-10 ease-in-out bg-white/80 rounded-xs w-full'
                style={{ width:`${progress}%`}}>
            </div>
        </div>
    </div>
  )
}

export default ProgressBar