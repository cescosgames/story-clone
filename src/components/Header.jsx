import React from 'react'

const Header = () => {
  return (
    <div className='h-[10%] w-full flex justify-between px-2 border-vintage-tan'>
        {/* left side */}
        <div className='flex justify-center items-center'>
            <p>24 hours story</p>
        </div>
        {/* right side */}
        <div className='flex justify-center items-center'>
            <a href="#">Github</a>
        </div>
    </div>
  )
}

export default Header