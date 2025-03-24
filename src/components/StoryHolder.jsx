import React, { useEffect, useState } from 'react'
import AddStoryButton from './AddStoryButton'
import Story from './Story'
import demoPic from '../images/demoPic.jpg';

const StoryHolder = () => {
  // our array of stories from our add story button
  const [stories, setStories] = useState([]);
  // our current image file, set from our add story button
  const [imgFile, setImgFile] = useState(null);



  // our set image function
  const uploadImg = (image) => {
    setImgFile(image);
  }

  // add image to out array function
  const addToArray = (image) => {
    null
  }

  useEffect(() => {
    console.log(imgFile);
  },[setImgFile]);

  
  return (
    <div className='border-2 border-vintage-tan w-full rounded-sm px-2 py-3 flex gap-2'>
        <AddStoryButton addStory={uploadImg}/>
        <div className='flex overflow-scroll scrollbar-hidden gap-2 fade'>
        </div>
    </div>
  )
}

export default StoryHolder