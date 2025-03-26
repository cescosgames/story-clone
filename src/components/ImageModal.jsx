import React, { useEffect, useState } from 'react'
import { isModalOpen } from '../atoms';
import { useAtom } from 'jotai';
import ProgressBar from './ProgressBar';
import { DateTime } from 'luxon';
import demoPic from '../images/demoPic.jpg';

const ImageModal = ({ image, timerTime, nextStory, uploadTime, numStories, stories }) => {
    // our global atom for modal being open
    const [modalOpen, setModalOpen] = useAtom(isModalOpen);

    // our array of progress states to track each individual progress bar, based off the session stories array
    const [individualProgress, setIndividualProgress] = React.useState(
        stories.map(() => 0) // this is creating an array of states all set to 0, so num of stories (say 3) to 0 would be [0,0,0]
    );
    // the story we are currently on 
    const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);

    // our timer in seconds to be decreased and our progress in 10ths to increase with timer counting down
    const [timer, setTimer] = useState(timerTime);
    const [progress, setProgress] = useState(0);
    const [paused, setIsPaused] = useState(false); // for pausing on holding down

    // timeout function to move forward or close modal, dependent on modal open because the modal being open is what determines the timer running or not
    useEffect(() => {
        // console.log('calling countdown');
        let timeoutID; // declare our ID outside of the scope

        if (paused) {
            return;
        }

        if(timer > 0 && modalOpen) { // -1 because I like seeing the bar fill
            timeoutID = setTimeout(() => {
                setTimer((prevTime) => prevTime - 0.01);
                setProgress((prevProg) => prevProg + (100/(timerTime * 100)));
            }, 10); // check every x interval - is this bad? I'm not sure to be honest
        } else if (timer <= 0 && modalOpen) {
            setTimer(timerTime);
            setProgress(0);
            nextStory();
        } else {
            setModalOpen(false);
            setTimer(timerTime);
            setProgress(0);
        }

        // always use clearTimeout to avoid memory leaks
        return () => clearTimeout(timeoutID);
    },[timer, modalOpen, paused])

    // closing our modal effectively
    function closeModal() {
        setModalOpen(false);
        setTimer(timerTime);
        setProgress(0);
    }
    
    // our function to turn our JS Date.now into readable using luxon (see luxon doc's for explanations)
    const convertDate = (date) => {
        // first get the current time 
        const now = DateTime.now();
        
        // then get the upload time in Millis (), returns DateTime
        const relativeTime = DateTime.fromMillis(date);

        // get the difference from current time to relative time, in hours specifically
        const diffInHours = now.diff(relativeTime, 'hours').hours; // this returns the difference in hours

        // set our string depending on if less or more than an hour
        if (diffInHours < 1) {
            return 'Uploaded < 1 hour ago';
        } else {
            const roundedHours = Math.floor(diffInHours); // round down using math.floor
            // add s if not 1 hour(s) for cleanliness
            return `Uploaded ${roundedHours} hour${roundedHours === 1 ? '' : 's'} ago`
        }
    }

    return (
        <>
        {modalOpen ?
            <div
                className="absolute inset-0 bg-opacity-80 flex items-center justify-center z-10 rounded-2xl story-pop flex-col"
                onClick={() => null}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
            >
                {/* the image plus close button and loading bars */}
                <div className="bg-vintage-denim/10 rounded-2xl w-full h-full">
                
                    {/* the progress bar up top - need to find a way to have multiple of these */}
                    <div className='absolute w-full flex mt-1 gap-0.5 px-3'>
                        {/* map progress bars here from the amount of stories we have using Array.from, which in this case just gives us an undefined for each length */}
                        {Array.from({length: numStories }).map((_, index) => (
                            <ProgressBar key={index} progress={progress} />
                        ))}
                    </div>

                    <img src={image} alt='404' className='rounded-2xl w-full h-full object-cover'/>
                    <button
                        onClick={() => closeModal()}
                        className="text-3xl absolute top-0 right-0 mx-1 my-2 w-8 h-8 text-vintage-white rounded-md cursor-pointer"
                    >
                        {/* this is an x from hero-icons */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                        
                    </button>
                    {/* time left text */}
                    <p className='z-10 text-sm absolute bottom-5 left-5 text-vintage-white'>{convertDate(uploadTime)}</p>
                </div>
            </div>
            : ''}
        </>
  )
}

export default ImageModal