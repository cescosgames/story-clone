import React from 'react'

const Story = ({ image, openStory, storyID, storyURL, storySeen, storyDate }) => {
  return (
    <button 
        // openStory takes in image, storyID
        onClick={() => openStory(storyURL, storyID, storyDate)}
        className={`cursor-pointer text-md rounded-full border-3 p-1 h-18 w-18 aspect-square flex justify-center items-center ${storySeen ? 'border-gray-200/50' : 'border-purple-600'}`}
        >
        <img src={image} alt='Alt' className={`rounded-full w-full h-full object-cover backdrop-blur-2xl ${storySeen ? 'opacity-70' : ''}`}/>
        {/* <p>{`${storyID}`}</p> */}
    </button>
  )
}

export default Story