import React from 'react'

const Story = ({ image }) => {
  return (
    <button 
        onClick={()=> console.log('watch story')}
        className='cursor-pointer text-md rounded-full border-2 h-10 aspect-square text-vintage-tan flex justify-center items-center'
        >
        <img src={image} alt='Story Thumbnail' className='rounded-full w-full h-full object-cover backdrop-blur-2xl hover:animate-spin'/>
    </button>
  )
}

export default Story