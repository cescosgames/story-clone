import React from 'react'

const Story = ({ image, openStory, storyID, storyURL, storySeen }) => {
  return (
    <button 
        // openStory takes in image, storyID
        onClick={() => openStory(storyURL, storyID)}
        className={`cursor-pointer text-md rounded-full border-3 h-10 aspect-square text-vintage-tan flex justify-center items-center ${storySeen ? 'border-vintage-orange' : 'border-vintage-teal'}`}
        >
        <img src={image} alt='404' className='rounded-full w-full h-full object-cover backdrop-blur-2xl'/>
        {/* <p>{`${storyID}`}</p> */}
    </button>
  )
}

export default Story