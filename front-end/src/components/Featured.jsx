import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import MoviesCard from './MoviesCard';
import Blur from './Blur';
import { dummyShowsData } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { useState } from 'react';

function Featured() {

   const {axios,getToken,shows}=useAppContext();

   const[nowPlayingMovies,setNowPlayingMovies]=useState([]);

    const navigate = useNavigate();



    const fetchShows=async()=>{
        const {data}=await axios.get('/api/shows/NowPlaying');
        setNowPlayingMovies(data.nowPlayingMovies);
        console.log('NowPlaying',data.nowPlayingMovies);
    }


    useEffect(()=>{
        //  fetchShows();
    },[])



    return (
        <>
            <div className='px-6 md:px-16 lg:px-34 xl:px-44'>

                <div className='relative flex items-center justify-between pt-20 pb-10'>
                    <Blur top="0" right="-80px" />
                    <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
                    <button onClick={() => navigate('/movies')} className='group flex items-center gap-1 text-sm text-gray-300 cursor-pointer'>View All <ArrowRight className='group-hover:translate-x-0.5 tarnsition w-4.5 h-4.5' /></button>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {
                        shows.slice(0,4).map((data) => (
                            <MoviesCard  key={data._id} movies={data} />
                        ))}

                </div>
                <div className='flex justify-center mt-20'>
                    <button onClick={() => { navigate('/movies'); scrollTo(0, 0) }} className='bg-pink-500 p-3 rounded-lg cursor-pointer' disabled={shows.length<4}>Show More</button>
                </div>
            </div>
        </>
    )
}

export default Featured
