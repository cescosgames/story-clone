import React from 'react'
import githubLogoWhite from '../images/githubWhite.png'

const Header = () => {
  return (
    <div className='h-[10%] w-full flex justify-between items-center px-2 cursor-default'>
        {/* left side */}
        <div className='flex flex-col justify-center items-center'>
          <div className='flex gap-1'>
            <div className='h-1 w-1 bg-purple-500'></div>
            <div className='h-1 w-2 bg-purple-400'></div>
            <div className='h-1 w-3 bg-purple-300'></div>
            <div className='h-1 w-4 bg-purple-200'></div>
          </div>
          <p className='text-purple-300 font-bold text-2xl'>24h</p>
        </div>
        {/* right side */}
        <div className='flex justify-center items-center transition hover:text-vintage-tan'>
            <a href="https://github.com/cescosgames/story-clone" target='_blank'>
              <img src={githubLogoWhite} alt="Github Icon" className='w-8.5 aspect-square transition opacity-50 hover:opacity-100'/>
            </a>
        </div>
    </div>
  )
}

export default Header