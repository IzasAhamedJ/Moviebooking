import React from 'react'
import { dummyShowsData } from '../assets/assets'
import Blur from '../components/Blur'
import MoviesCard from '../components/MoviesCard'
import { useAppContext } from '../context/AppContext'

function Favouites() {

    const{favouriteMovie}=useAppContext();


    
        
           return favouriteMovie.length?(
              <div className='relative mb-30 px:8 md:px-16 lg:px-36 overflow-hidden min-h-[80-vh]'>
                <Blur top='0' right='30px'/>
                <h1 className='text-gray-300 mt-25'>Your Favourite Movies</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-20'>
                    {
                        favouriteMovie.map((data) => (
                            <MoviesCard movies={data} />
                        ))}
                </div>
            </div>
    ):(

        <div className='px:8 md:px-16 lg:px-36 text-center py-50'>
              <h1 className='text-3xl'>No Movies Available</h1>
        </div>
             
    )
    
}

export default Favouites
