import React from 'react'
import demoPic from '../images/demoPic.jpg';
import Footer from './Footer';

const BodyDisplay = () => {
  return (
    <div className='w-full flex rounded-md h-[75%] flex-col p-10 gap-10'>

        {/* <h1 className='italic'>image would go here</h1> */}

        <div className='w-full flex gap-2 flex-col'>
          <h1 className='text-mg font-bold'>Welcome to 24h</h1>
          <p className='text-xs'>24h is a fully local, stories app where you can upload short, ephemeral snapshots of your last 24 hours</p>
          <p className='text-xs'>To get started, add your first story by clicking the plus circle in the section above</p>
          <p className='text-xs'>To view the new story, click on the thumbnail that just appeared after uploading!</p>
          <p className='text-xs'>Your stories will last 24 hours before vanishing</p>
        </div>

        <div className='w-full flex gap-2 flex-col'>
          <h1 className='text-mg font-bold'>Background</h1>
          <p className='text-xs'>This is a project inspired by the 24hr Story Feature assignment on roadmap.sh</p>
          <p className='text-xs'>You can view the entire project on Github by clicking the Github icon above</p>
          <p className='text-xs'>The repository features information on the original assignment, and explanation behind the project</p>
          <p className='text-xs'>Thanks for checking this project out and feel free to reach out with any questions</p>
          <p> - Cesco </p>
        </div>

        {/* <img src={demoPic} alt="" className='w-full h-full object-cover rounded-t-sm'/>

        <div className='w-full h-[33%] bg-vintage-denim rounded-b-sm p-2'>
            <h1 className='text-vintage-mango text-sm'>This is a picture of a dog</h1>
        </div> */}
        <Footer />
    </div>
  )
}

export default BodyDisplay