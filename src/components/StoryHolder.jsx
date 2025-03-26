import React, { useEffect, useState } from 'react'
import AddStoryButton from './AddStoryButton'
import Story from './Story'
import { isModalOpen } from '../atoms'
import { useAtom } from 'jotai'
import ImageModal from './ImageModal'

const StoryHolder = ({  }) => {
  // our global atom for the story modal being open or not
  const [modalOpen, setModalOpen] = useAtom(isModalOpen);
  // our story timer for our modal
  const [timerTime, setTimerTime] = useState(1); // in seconds

  // our array of stories, modified from our add story button
  const [stories, setStories] = useState([]);

  // our active image, null to start
  const [activeImg, setActiveImg] =useState(null);
  // our active index
  const [activeIndex, setActiveIndex] = useState(-1);
  // our active time-stamp, similar to image
  const [activeTimeStamp, setActiveTimeStamp] = useState(null);

  // here we load our saved stories to a JS array from local storage IF there are any, otherwise return an emtpy array
  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    // set the stories to our JS array
    setStories(savedStories);
    // dependency is empty so only run this on mount
  }, []);

  // whenever we update our stories array, set our stories array and save it to local storage in json format
  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));

  }, [stories]);


  // this is the important one
  const handleImageUpload = (event) => {
    // get our image from our onChange input upload
    const imgFile = event.target.files[0];
    // console.log(imgFile);
    // if the file exists, create a new object (newStory) which contains an ID and a URL to the image
    if (imgFile) {
      const newStory = {
        id: Date.now(), // Unique ID
        // BIG NOTE: this temporary URL WILL NOT PERSIST IN LOCAL STORAGE, fine for testing, not fine for deployment
        // to fix this
        url: URL.createObjectURL(imgFile), // Temporary URL
        // adding more classes like already seen bool for organization, and timestamp to delete after x time
        uploadTime: Date.now(), // I guess I could use the ID... well we'll figure it out later
        alreadySeen: false, // to organize stories
      };
      
      // for proper sorting, create 2 arrays to handle seen and unseen stories
      const unseenStories = stories.filter(story => !story.alreadySeen);
      const seenStories = stories.filter(story => story.alreadySeen);
      // add the new story to the unseen stories array
      const udpatedUnseenStories = [...unseenStories, newStory];
      // combine the 2 arrays now!
      const updatedStories = [...udpatedUnseenStories, ...seenStories];
      // then set our stories array
      setStories(updatedStories);

    } else {
      alert('File Not Valid, Please Try Again');
    }
  };

  // opening our story function passed as prop to our Story components
  const openStory = (image, storyID, timeStamp) => {
    // get the index of our story to progress our stories
    const index = stories.findIndex(story => story.id === storyID);
    setActiveIndex(index);

    // mark our story as soon using our handleStorySeen function THIS MUTATES THE ARRAY
    handleStorySeen(storyID);

    // set our active image to pass to our modal
    setActiveImg(image);

    // set our timestamp
    setActiveTimeStamp(timeStamp);
    
    // open our modal
    setModalOpen(true);
  }

  const advanceStory = () => {
    // check we are in index bounds
    if(activeIndex + 1 < stories.length) {
      // this is basically the same as openStory, just doesn't update the session list or open the modal
      handleStorySeen(stories[activeIndex + 1].id);
      setActiveImg(stories[activeIndex + 1].url);
      setActiveTimeStamp(stories[activeIndex + 1].uploadTime)
      setActiveIndex((prevIndex) => prevIndex + 1);

      return activeIndex + 1;
    } else {
      // console.log('finished stories');
      setModalOpen(false);
    }
  }

  const previousStory = () => {
    // check we are in index bounds
    // console.log(activeIndex);
    if(activeIndex - 1 > -1) {
      // this is basically the same as openStory, just doesn't update the session list or open the modal
      handleStorySeen(stories[activeIndex - 1].id);
      setActiveImg(stories[activeIndex - 1].url);
      setActiveTimeStamp(stories[activeIndex - 1].uploadTime)
      setActiveIndex((prevIndex) => prevIndex - 1);

      return activeIndex - 1;
    } else {
      // console.log('finished stories');
      // setModalOpen(false);
    }
  }

  // handling our story seen, using map instead of find()
  const handleStorySeen = (id) => {
    // take our previous stories, map over them, if our ID matches, set it's already seen to true otherwise just return the story.
    setStories((prevStories) =>
      prevStories.map((story) =>
        // if our story id matches our id, we use the spread operator to copy the existing properties of that id object, and create a new one
        // with the alreadySeen variable set to true. So we copy all the existing properties and change the already seen
        // if the id doesn't match, just return the same object
        story.id === id ? { ...story, alreadySeen: true } : story
      )
    );
  };
  
  return (
    <div className='border-2 border-vintage-tan w-full rounded-sm px-2 py-3 flex gap-2'>
        {/* our add story button here that takes our upload image function as prop */}
        <AddStoryButton addStory={handleImageUpload}/>
        {/* our stories will propagate here */}
        <div className='flex overflow-scroll scrollbar-hidden gap-2 w-full'>
            {stories.map((story) => (
              <Story key={story.id} openStory={openStory} image={story.url} storyURL={story.url} storyID={story.id} storySeen={story.alreadySeen} storyDate={story.uploadTime} />
            ))}
        </div>
        {/* our image pop up modal */}
        <ImageModal image={activeImg} timerTime={timerTime} nextStory={advanceStory} prevStory={previousStory} uploadTime={activeTimeStamp} numStories={stories.length} stories={stories} activeIndex={activeIndex}/>
    </div>
  )
}

export default StoryHolder