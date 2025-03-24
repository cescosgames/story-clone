import React from 'react'
import { useState } from 'react';

const ImageModal = () => {

    // this is just a placeholder, just messing around

    const [isOpen, setIsOpen] = useState(true);

  return (
    <>
    {isOpen ?
        <div
            className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 rounded-2xl"
            onClick={() => console.log('next story')}
        >
            <div
            className="bg-white p-4 rounded shadow-lg w-3/4 max-w-lg"
            >
            <h2 className="text-xl font-bold mb-4">Story Content</h2>
            <p>This is the story modal content.</p>
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-0 right-0 mx-5 my-10 w-10 h-10 text-vintage-white rounded cursor-pointer"
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