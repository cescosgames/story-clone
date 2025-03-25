import React, { useState } from 'react'

const AddStoryButton = ({ addStory }) => {

  return (
    <div className='relative text-md rounded-full border-2 border-dotted h-10 aspect-square text-vintage-tan flex justify-center items-center'>
        <label 
            htmlFor="image-upload"
            className="cursor-pointer h-full w-full text-center flex items-center justify-center"
          >
            {/* something is wrong with my cnetering here but I can't find it, so just doing margin bottom 1 for now */}
            <p className='mb-1'>+</p>
        </label>

        <input 
          type="file" 
          id='image-upload'
          // only accept image files (png, jpg, gif)
          accept='image/*'
          className='hidden'
          // the event.target is our input and we are checking the first file in the file list (file list is not persistent)
          onChange={(e) => {
            // console.log(e.target.files[0]);
            addStory(e);
            }
          }
        />
    </div>
  )
}

export default AddStoryButton