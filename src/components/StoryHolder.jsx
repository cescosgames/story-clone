import React, { useEffect, useState } from 'react'
import AddStoryButton from './AddStoryButton'
import Story from './Story'
import { isModalOpen } from '../atoms'
import { useAtom } from 'jotai'
import ImageModal from './ImageModal'
import { DateTime } from 'luxon'

// Function to calculate size for base64 images, I didn't know this this is from the internet!
function getBase64Size(base64String) {
  const padding = (base64String.charAt(base64String.length - 2) === "=") ? 2 : (base64String.charAt(base64String.length - 1) === "=") ? 1 : 0;
  return (base64String.length * (3 / 4)) - padding;
}

const StoryHolder = ({  }) => {
  // our global atom for the story modal being open or not
  const [modalOpen, setModalOpen] = useAtom(isModalOpen);
  // our story timer for our modal
  const [timerTime, setTimerTime] = useState(3); // in seconds

  // storage information for commplying with local storage limits
  const [totalStorageMB, setTotalStorageMB] = useState(0);

  // our array of stories, modified from our add story button
  const [stories, setStories] = useState([]);

  // our active image, null to start
  const [activeImg, setActiveImg] =useState(null);
  // our active index
  const [activeIndex, setActiveIndex] = useState(-1);
  // our active time-stamp, similar to image
  const [activeTimeStamp, setActiveTimeStamp] = useState(null);

  // here we load our saved non-expired stories to a JS array from local storage IF there are any, otherwise return an emtpy array
  useEffect(() => {
    // get our saved stories, or empty array
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];

    // run our check for time function for expired stories
    const expiredStories = checkExpireStories(savedStories);

    // update our stories array by removing expired stories
    const updatedStories = savedStories.filter(story => !expiredStories.includes(story));
    const unseenStories = updatedStories.filter(story => !story.alreadySeen);
    const seenStories = updatedStories.filter(story => story.alreadySeen);
    // combine the 2 arrays now!
    const storiesToMount = [...unseenStories, ...seenStories];

    // set the stories - expired to our JS array
    setStories(storiesToMount);

    // dependency is empty so only run this on mount
  }, []);



  // Calculate total storage size when stories change
  useEffect(() => {
    const totalStorage = stories.reduce((total, story) => {
      if (story.url && story.url.startsWith('data:image')) {
        return total + getBase64Size(story.url);
      }
      return total;
    }, 0);
    setTotalStorageMB(totalStorage / (1024 * 1024)); // Store in MB
  }, [stories]); // Recalculate whenever stories change


  // this is the base64 local storage version
  const handleImageUpload = (event) => {
    // get our image from our onChange input upload
    const imgFile = event.target.files[0];

    // convert our file to base64 to store in localStorage
    if (imgFile) {
      const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader(); // use file reader API
          reader.onload = () => resolve(reader.result); // this gives us our base64 string
          reader.onerror = (error) => reject(error); // reject if error
          reader.readAsDataURL(file); // read the file
        })
      }

      convertFileToBase64(imgFile)
      .then((base64) => {
        const newStory = {
          id: Date.now(),
          url: base64,
          uploadTime: Date.now(),
          alreadySeen: false,
        };

        // setting a limit for the number of stories
        const maxStorageMB = 3.7; // trial and error, seems like I'm allowed 3.9 mb? confusing and arbitrary

        // Check we haven't exceeded already
        if ((totalStorageMB / (1024 * 1024)) > maxStorageMB) {
          alert('storage capacity reached, unable to upload');
          console.log('total storage size mb' +  (totalStorageMB / (1024 * 1024)))
          return;
        } 

        const newImageSizeMB = imgFile instanceof File ? imgFile.size / (1024 * 1024) : getBase64Size(imgFile) / (1024 * 1024);

        if (totalStorageMB + newImageSizeMB > maxStorageMB) {
          alert('storage capacity will be exceeded, unable to upload');
          console.log(newImageSizeMB + 'total image size mb | total storage size mb' +  totalStorageMB)
          return;
        } 
      
        // const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
        // savedStories.push(newStory);
        // localStorage.setItem("stories", JSON.stringify(updatedStories));

        // for proper sorting, create 2 arrays to handle seen and unseen stories
        const unseenStories = stories.filter(story => !story.alreadySeen);
        const seenStories = stories.filter(story => story.alreadySeen);
        // add the new story to the unseen stories array
        const updatedUnseenStories = [...unseenStories, newStory];
        // combine the 2 arrays now!
        const updatedStories = [...updatedUnseenStories, ...seenStories];
        // then set our stories array
        setStories(updatedStories);
        // moved the useEffect from earlier to here because
        localStorage.setItem("stories", JSON.stringify(updatedStories));
      })

    } else {
      alert('File Not Valid, Please Try Again');
    }
  };

  // // this is the URL testing version, allows unlimited* local session uploads, use this for testing multiple stories 
  // const handleImageUpload = (event) => {
  //   // get our image from our onChange input upload
  //   const imgFile = event.target.files[0];
  //   // console.log(imgFile);
  //   // if the file exists, create a new object (newStory) which contains an ID and a URL to the image
  //   if (imgFile) {
  //     const newStory = {
  //       id: Date.now(), // Unique ID
  //       // BIG NOTE: this temporary URL WILL NOT PERSIST IN LOCAL STORAGE, fine for testing, not fine for deployment
  //       // to fix this
  //       url: URL.createObjectURL(imgFile), // Temporary URL
  //       // adding more classes like already seen bool for organization, and timestamp to delete after x time
  //       uploadTime: Date.now(), // I guess I could use the ID... well we'll figure it out later
  //       alreadySeen: false, // to organize stories
  //     };

  //     // for proper sorting, create 2 arrays to handle seen and unseen stories
  //     const unseenStories = stories.filter(story => !story.alreadySeen);
  //     const seenStories = stories.filter(story => story.alreadySeen);
  //     // add the new story to the unseen stories array
  //     const updatedUnseenStories = [...unseenStories, newStory];
  //     // combine the 2 arrays now!
  //     const updatedStories = [...updatedUnseenStories, ...seenStories];
  //     // then set our stories array
  //     setStories(updatedStories);

  //   } else {
  //     alert('File Not Valid, Please Try Again');
  //   }
  // };



  // need a use effect to re-sort our stories not JUST on story upload, but on open story as well
  const sortOnCloseModal = () => {
    // for proper sorting, create 2 arrays to handle seen and unseen stories
    const unseenStories = stories.filter(story => !story.alreadySeen);
    const seenStories = stories.filter(story => story.alreadySeen);
    // combine the 2 arrays now!
    const updatedStories = [...unseenStories, ...seenStories];

    // then set our stories array
    setStories((prevStories) => { return updatedStories });
  }

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

  // delete story function, called in pop up image modal
  const deleteStory = (storyId) => {
    // Filter the stories to remove the one with the matching id
    setStories((prevStories) => {
      const updatedStories = prevStories.filter((story) => story.id !== storyId);
  
      // update localStorage after the state has been updated
      localStorage.setItem("stories", JSON.stringify(updatedStories));
  
      return updatedStories;
    });
  };

  // handling our story seen, using map instead of find()
  const handleStorySeen = (id) => {
    setStories((prevStories) => {
      // creating the updated stories array with map
      const updatedStories = prevStories.map((story) =>
        // if our story id matches our id, we use the spread operator to copy the existing properties of that id object, and create a new one
        // with the alreadySeen variable set to true. So we copy all the existing properties and change the already seen
        // if the id doesn't match, just return the same object
        story.id === id ? { ...story, alreadySeen: true } : story
      );
  
      // updating our local storage with the updated stories, NOT the original stories array since it hasn't updated yet
      localStorage.setItem("stories", JSON.stringify(updatedStories));
  
      // return the updatedStories so it registers
      return updatedStories;
    });
  };

  // handling our old stories more than X timeunit old
  const checkExpireStories = (stories) => {
    const oneMinute = DateTime.now().minus({ hours: 24 }); // using luxon to get 24 hours ago

    // then return our 'filtered' array with only stories that are less than one minute ago
    return stories.filter(story => {
      const uploadTime = DateTime.fromMillis(story.uploadTime);
      return uploadTime < oneMinute; // this may seem confusing but what this is saying is...
      // if the upload time is less than oneMinute (ago) it is older, therefore it is expired
      // the inverse would also work! check the mount function and just set this function equal to our stories
    });
    // this function will be called when we mount our stories
  }
  
  return (
    <div className='border-b-1 border-vintage-tan px-2 items-center flex gap-2 h-[15%]'>
        {/* our add story button here that takes our upload image function as prop */}
        <AddStoryButton addStory={handleImageUpload}/>
        {/* our stories will propagate here */}
        <div className='flex overflow-scroll scrollbar-hidden gap-2 w-full'>
            {stories.map((story) => (
              <Story key={story.id} openStory={openStory} image={story.url} storyURL={story.url} storyID={story.id} storySeen={story.alreadySeen} storyDate={story.uploadTime} />
            ))}
        </div>
        {/* easy clear dev button
        <div className='h-10 w-10 cursor-pointer rounded-full bg-red-500' onClick={() => localStorage.removeItem("stories")}>
            <p>X</p>
        </div> */}
        {/* our image pop up modal */}
        <ImageModal image={activeImg} timerTime={timerTime} nextStory={advanceStory} prevStory={previousStory} uploadTime={activeTimeStamp} numStories={stories.length} stories={stories} activeIndex={activeIndex} sortStoryOnClose={sortOnCloseModal} deleteStory={deleteStory}/>
    </div>
  )
}

export default StoryHolder