import { TicketPlus,StarIcon} from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { convertMinutesToHMS } from '../libraries/convertHours';
import { useAppContext } from '../context/AppContext';

function MoviesCard({movies}) {


    const{image_base_url}=useAppContext()
    const navigate=useNavigate();

     const { hours, minutes, seconds } = convertMinutesToHMS(movies.runtime);

    return (
    <>
    <div className='bg-gray-800 rounded-2xl hover:translate-y-2 transition duration-300 flex flex-col justify-between p-2'>
        <img onClick={()=>{navigate(`/movies/${movies._id}`);scrollTo(0,0)}}
         src={`${image_base_url}`+movies.backdrop_path} alt="" className='rounded-lg h-50
        object-cover object-top-right cursor-pointer'/>
         
        <p className='font-semibold mt-2 truncate'>{movies.title}</p>

        <p className='text-sm text-gray-400 mt-2 w-70'>
            {new Date(movies.release_date).getFullYear()} + {movies.genres.slice(0,2).map(gen =>gen).join("|")}+ {`${hours}h ${minutes}m`}
        </p>

        <div className='flex items-center justify-between mt-5'>
            <button onClick={()=>{navigate(`/movies/${movies._id}`);scrollTo(0,0)}} className='bg-pink-500 text-sm rounded-lg p-2 cursor-pointer'>
                 Buy Tickets
            </button>
            <p>
                <StarIcon className="w-4 h-4 text-primary fill-primary"/>
                {movies.vote_average.toFixed(1)}
            </p>
        </div>


    </div>
    </>
    )
}

export default MoviesCard
