import React from 'react'
import { isModalOpen } from '../atoms';
import { useAtom } from 'jotai';
import demoPic from '../images/demoPic.jpg';

const ImageModal = ({ image }) => {
    // our global atom for modal being open
    const [modalOpen, setModalOpen] = useAtom(isModalOpen);

    return (
        <>
        {modalOpen ?
            <div
                className="absolute inset-0 bg-opacity-80 flex items-center justify-center z-10 rounded-2xl story-pop"
                onClick={() => null}
            >
                <div className="bg-vintage-denim/10 rounded-2xl w-full h-full p-5">
                    <img src={image} alt='404' className='rounded-sm w-full h-full object-cover'/>
                    <button
                        onClick={() => setModalOpen(false)}
                        className="absolute top-0 right-0 mx-10 my-10 w-10 h-10 opacity-50 text-vintage-white bg-vintage-orange rounded-full cursor-pointer"
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