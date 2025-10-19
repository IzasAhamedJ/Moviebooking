import React, { useState } from 'react'
import { dummyTrailers } from '../assets/assets';
import ReactPlayer from 'react-player'
import Blur from './Blur';


function Trailer() {
    const [trailer, setTrailer] = useState(dummyTrailers[0]);

    console.log('video url', trailer.videoUrl);

    return (
        <>
            <div className='px-6 md:px-16 lg:px-24 xl:px-44 pt-20 overflow-hidden'>
                <p className='text-lg font-medium text-gray-300 mx-auto max-w-[960px] text-center'>Trailers Thumbnails</p>

                <div className='relative mt-6 flex items-center justify-center'>
                    <Blur top='-100px' right='-100px' />
                    {/* <video width="750" height="500" controls />
                    <source src={trailer.videoUrl} type="video/mp4" /> */}
                    {/* <ReactPlayer url={trailer.videoUrl} controls={false} className='mx-auto max-w-full' width="960px" height="540px"/> */}
                    {/* <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" controls={false} className='mx-auto max-w-full' width="960px" height="540px"/> */}
                    <img src={trailer.image} alt="" width="650px" height="350px" />

                </div>


                <div className='grid grid-cols-2 md:grid-cols-5 py-20'>
                    {dummyTrailers.slice(1).map((trailer) => (
                        <img src={trailer.image} alt="" className='w-50 h-50 rounded-sm mb-10 cursor-pointer hover:translate-y-1 transition duration-300' onClick={() => setTrailer(trailer)} />

                    ))}
                </div>
            </div>
        </>
    )
}

export default Trailer
