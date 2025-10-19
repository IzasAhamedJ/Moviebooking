import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyShowsData, dummyDateTimeData, dummyCastsData } from '../assets/assets';
import Blur from '../components/Blur'
import { PlayCircleIcon, StarIcon, Heart } from 'lucide-react';
import { convertMinutesToHMS } from '../libraries/convertHours';
import DateSelect from '../components/DateSelect';
import MoviesCard from '../components/MoviesCard';
import Loading from '../components/Loading';
import { useAppContext } from '../context/AppContext';
function MovieDetails() {

  const { id } = useParams();

  const navigate=useNavigate();



  // const getSpecificData=dummyShowsData.filter((data)=>data._id===id);

  const [movieDetails, setMovieDetails] = useState(null);

  const { hours, minutes, seconds } = convertMinutesToHMS(movieDetails?.movie.runtime)

   const{shows,axios,getToken,user,fetchFavMovie,favouriteMovie,image_base_url}=useAppContext();

  const getData = async() => {
      try {
         const{data}=await axios.get(`/api/shows/${id}`);
          console.log('movie details data',data.data.movie)
          setMovieDetails(data.data)
        
      } catch (error) {
         toast.error(error.message)
      }
  }


  const handleFavourite=async()=>{
     try {
        if(!user) return toast.error('Please Login to add favourite movie');
        const payload={
          "movieId":id
        }
        const {data}=await axios.post('/api/user/update-Favourite',payload,
          {
            headers:{
              Authorization:`Bearer ${await getToken()}`
            }
          }
        )

        console.log('update data',data)

        if(data.success){
          await fetchFavMovie();
          toast.success(data.message)
        }
     } 
     catch (error) {
        toast.error(error.message);
         console.error(error)
     }
  }

  useEffect(() => {
    getData();
    console.log('effectrun');
    console.log('movieDETAILS',movieDetails);
  }, [id])



  return movieDetails ? (
    <div className='px:6 md:px-16 lg:px-40 pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8'>
        <img src={`${image_base_url}`+movieDetails.movie.poster_path} alt="" className='max-md:max-auto roundex-xl h-104 max-w-70 object-cover' />

        <div className='relative flex flex-col gap-3'>
          <Blur top='100px' left='-100px' />
          <p className='text-primary'>ENGLISH</p>
          <h1 className='text-4xl font-semibold max-w-96 text-balance'>{movieDetails.movie.title}</h1>
          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-pink fill-pink-500' />
            {movieDetails.movie.vote_average.toFixed(1)} User Rating
          </div>
          <p className='text-gray-400 mt-2 text-sm'>{movieDetails.movie.overview}</p>
          <p>
            {convertMinutesToHMS(movieDetails?.movie.runtime)} . {movieDetails.movie.genres.map(data => data.name).join(", ")} . {movieDetails.movie.release_date.split("-")[0]}
          </p>
          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button className='flex items-center gap-2 p-2 bg-gray-700 rounded-lg'>
              <PlayCircleIcon className='w-5 h-5' />
              Watch Thumbnails</button>
            <a href="#dateselect" className='bg-pink-500 p-2 rounded-lg'>Buy Tickets</a>
            <button onClick={handleFavourite} className='bg-gray-700 rounded-full p-2 cursor-pointer'>
              <Heart  className={`w-5 h-5 ${favouriteMovie.find(movie => movie._id === id)? 'fill-red-500' : ""}`} />
            </button>
          </div>
        </div>
      </div>



      <p className='text-lg font-mdedium mt-10'>
        Your Favourite cast




      </p>
      <div className='overflw-x-auto no-scrollbar mt-8 pb-20'>
        <div className='flex items-center gap-3'>
          {movieDetails.movie.casts.slice(0, 12).map((data, index) => (
            <div key={index} className='flex flex-col items-center text-center hover:translate-y-1 transition duration-200'>
              <img src={`${image_base_url}`+data.profile_path} alt="" className='rounded-full h-20 aspect-square object-cover' />
              <p className='font-medium text-xs mt-3'>{data.name}</p>
            </div>
          ))}
        </div>
      </div>

      <DateSelect dateTime={movieDetails.dateTime} id={id} />

      <p className='text-lg font-medium mt-5 mb-8'>You May Also Like</p>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
             {
              shows.slice(0,4).map((data)=>(
                <MoviesCard key={data._id} movies={data}/>
              ))
             }
      </div>
      <div className='text-center mt-10'>
        <button className='bg-pink-500 p-3 rounded-md font-medium cursor-pointer'
        onClick={()=>{navigate('/movies')}}>Show More</button>
      </div>



    </div>
  ) : (
    <div className='px:8 md:px-16 lg:px-36 text-center py-50'>
         <Loading/>
    </div>
  )
}

export default MovieDetails
