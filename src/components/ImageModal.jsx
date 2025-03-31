import React, { act, useEffect, useState } from 'react'
import { isModalOpen } from '../atoms';
import { useAtom } from 'jotai';
import ProgressBar from './ProgressBar';
import { DateTime } from 'luxon';
import demoPic from '../images/demoPic.jpg';

const ImageModal = ({ image, timerTime, nextStory, prevStory, uploadTime, numStories, stories, activeIndex, sortStoryOnClose, deleteStory }) => {
    // our global atom for modal being open
    const [modalOpen, setModalOpen] = useAtom(isModalOpen);

    // our timer in seconds to be decreased and our progress in 10ths to increase with timer counting down
    const [timer, setTimer] = useState(timerTime);
    // our individual progress
    const [progress, setProgress] = useState(0);
    // our array of progresses, for each progress bar
    const [progresses, setProgresses] = useState(stories.map(() => 0));
    // our pause for holding down on story
    const [paused, setIsPaused] = useState(false);

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
                // after we update our progress, go to our state array of progresseS (for each story we have)
                // take the previous progresses, copy them using spread, update only the active index (first story, first bar etc.)
                // and return the updated progress array 
                setProgresses((prevProgresses) => {
                    const updatedProgresses = [...prevProgresses];
                    updatedProgresses[activeIndex] = progress; // Update the active index
                    return updatedProgresses; // Set updated array
                  });
            }, 10); // check every x interval - is this bad? I'm not sure to be honest
        } else if (timer <= 0 && modalOpen) {
            setTimer(timerTime);
            setProgress(0);
            nextStory();
        } else {
            closeModal();
        }

        // always use clearTimeout to avoid memory leaks
        return () => clearTimeout(timeoutID);
    },[timer, modalOpen, paused])

    // closing our modal effectively
    function closeModal() {
        setModalOpen(false);
        setTimer(timerTime);
        setProgress(0);
        sortStoryOnClose();
    }

    // useEffect for when the modal opens to reset all stories progress
    useEffect(() => {
        // the progresses array is NOT updating correctly, leading to the issue we have here where the 'last' story shows already loaded

        // if our modal is open,
        if(modalOpen) {
            // set our progressess array to a new map of our previous - if the index is greater than the active index (aka haven't seen it yet or already seen) set to 0 or 100 respectively
            setProgresses((prevProgs) => prevProgs.map((progress, index) => { 
                // console.log(`Index: ${index}, Progress: ${progress}, Active Index: ${activeIndex}`);
                return index >= activeIndex ? 0 : 100;
            }))
            // initially had it set to how much progress you had made, decided against it (progress vs 100)
        };
    }, [modalOpen, activeIndex])

    // ok so our progresses was not updating in time with our stories being modified, leading to the weird final loading bar error
    useEffect(() => {
        // so here, we need to update our progresses length to match our stories 
        setProgresses((prevProgs) => {
            // for if we add stories
            if (stories.length > prevProgs.length) {
                return [...prevProgs, ...Array(stories.length - prevProgs.length).fill(0)]; // add 0's using fill to our progress array for any missing progress bars
            }
            // for if we remove stories
            if (stories.length < prevProgs.length) {
                return prevProgs.slice(0, stories.length); // use slice to remove excess progress bars
            }
            // return our updated array
            return prevProgs;
        })
    }, [stories]);
    
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
            return '< 1 hour ago';
        } else {
            const roundedHours = Math.floor(diffInHours); // round down using math.floor
            // add s if not 1 hour(s) for cleanliness
            return `${roundedHours} hour${roundedHours === 1 ? '' : 's'} ago`
        }
    }

    return (
        <>
        {modalOpen ?
            <div
                className="absolute inset-0 bg-opacity-80 flex z-100 story-pop flex-col w-full h-screen max-h-screen sm:max-h-[800px] sm:max-w-sm"
                onClick={() => null}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
            >
                {/* the image plus close button and loading bars */}
                <div className="w-full h-full bg-black flex sm:rounded-2xl">
                
                    {/* the progress bar up top - need to find a way to have multiple of these */}
                    <div className='absolute w-full flex mt-5 gap-0.5 px-3'>
                        {/* map progress bars here from the amount of stories we have using Array.from, which in this case just gives us an undefined for each length */}
                        {Array.from({length: numStories }).map((_, index) => (
                            // set progresses equal to index instead of activeIndex because we need each individual bars index
                            <ProgressBar key={index} progress={progresses[index]} />
                        ))}
                    </div>

                    <img src={image} alt='404' className='w-full rounded-2xl object-scale-down'/>
                    <button
                        onClick={() => closeModal()}
                        className="text-3xl absolute top-10 right-5 mx-1 w-10 h-10 text-vintage-white rounded-md cursor-pointer"
                    >
                        {/* this is an x from hero-icons */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>                        
                    </button>
                    {/* our delete button */}
                    <button
                        onClick={() => {
                            closeModal();
                            // yea it's kinda fucked up but basically the upload time and ID are the same - hope this won't cause any issues lol
                            deleteStory(uploadTime);
                        }}
                        className="text-3xl absolute top-11 right-10 mx-10 w-10 h-10 text-vintage-white rounded-md cursor-pointer"
                    >
                        {/* delete from hero-icons */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>


                    </button>
                    {/* time left text */}
                    <p className='z-10 text-lg absolute top-12 left-5 text-vintage-white'>{convertDate(uploadTime)}</p>

                    {/* left/right chevron holder */}
                    <div className='absolute h-[80%] w-full top-30 rounded-2xl'>
                        {/* left chevron from heroicons */}
                        <div className='absolute bottom-[0] text-vintage-white opacity-50 h-full flex justify-start items-center w-[50%]' 
                            onClick={() => {
                                prevStory();
                                setProgress(0);
                                setTimer(timerTime);
                            }}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </div>
                        {/* right chevron from heroicons */}
                        <div className='absolute bottom-[0%] right-0 text-vintage-white opacity-50 h-full flex justify-end items-center w-[50%]' 
                            onClick={() => {
                                nextStory();
                                setProgress(0);
                                setTimer(timerTime);
                                }}
                                >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            : ''}
        </>
  )
}

export default ImageModal