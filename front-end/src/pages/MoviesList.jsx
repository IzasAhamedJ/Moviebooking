import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MoviesCard from '../components/MoviesCard'
import Blur from '../components/Blur'
import { useAppContext } from '../context/AppContext'

function MoviesList() {

    const{shows}=useAppContext();

    return dummyShowsData.length?(
              <div className='relative mb-30 px:8 md:px-16 lg:px-36 overflow-hidden min-h-[80-vh]'>
                <Blur top='0' right='30px'/>
                <h1 className='text-gray-300 mt-25'>Now Showing</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-20'>
                    {
                        shows.map((data) => (
                            <MoviesCard key={data._id} movies={data} />
                        ))}
                </div>
            </div>
    ):(

        <div className='px:8 md:px-16 lg:px-36 text-center py-50'>
              <h1 className='text-3xl'>No Movies Available</h1>
        </div>
             
    )
}

export default MoviesList
