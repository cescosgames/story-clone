import React from 'react'

const ProgressBar = ({ progress }) => {
  return (
    // the progress bar 'filling' based off of progress (current question / max questions) passed down from quiz info
    <div className='w-full h-3'>
        <div className='h-3 transition-all ease-in-out border-1 border-vintage-white bg-vintage-white/50 rounded-sm w-full'>
            <div className='h-full transition-all duration-10 ease-in-out bg-vintage-teal rounded-sm w-full'
                style={{ width:`${progress}%`}}>
            </div>
        </div>
    </div>
  )
}

export default ProgressBar