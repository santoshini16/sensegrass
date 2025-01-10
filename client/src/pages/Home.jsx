import React from 'react'
import { BackgroundBeams } from "../components/ui/background-beams";
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Card from '../components/Card';
import ImageWithCards from '../components/ImageWithCards';

const Home = () => {
  return (
    <> 
    <div className='w-[100vw]'>
     <Navbar/>
     <div className="h-[45rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
       <Main/>
       <BackgroundBeams />
     </div>
     <ImageWithCards/>
     <div className='flex flex-col gap-6 justify-center items-center z-50 '>
     
     <Card/>
     </div>
     <Footer/>
    </div>
    </>
    
  )
}

export default Home