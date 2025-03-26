import React, { useEffect, useState } from 'react'
import { isModalOpen } from '../atoms';
import { useAtom } from 'jotai';
import ProgressBar from './ProgressBar';
import demoPic from '../images/demoPic.jpg';

const ImageModal = ({ image, timerTime, nextStory }) => {
    // our global atom for modal being open
    const [modalOpen, setModalOpen] = useAtom(isModalOpen);

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
                    <div className='absolute w-full flex mt-0.5 gap-1 px-1'>
                        <ProgressBar progress={progress} />
                    </div>

                    <img src={image} alt='404' className='rounded-sm w-full h-full object-cover'/>
                    <button
                        onClick={() => closeModal()}
                        className="absolute top-0 right-0 mx-2 my-5 w-8 h-8 opacity-50 text-vintage-white bg-vintage-orange rounded-md cursor-pointer"
                    >
                        X
                    </button>
                </div>
            </div>
            : ''}
        </>
  )
}

export default ImageModal