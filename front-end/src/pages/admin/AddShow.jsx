import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title';
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import { KConverter } from '../../libraries/KConverter';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function AddShow() {

    const {axios,getToken,user,image_base_url}=useAppContext();
    
    const currency=import.meta.env.VITE_CURRENCY;

    const[nowPlayingMovie,setNowPlayimgMovie]=useState([])

    const[selectedMovie,setSelectedMovie]=useState(null);
    
    const[dateTimeSelection,setDateTimeSelection]=useState({});

    const[dateTimeInput,setDateTimeInput]=useState("");

    const[showPrice,setShowPrice]=useState("");

    const[addingShow,setAddingShow]=useState(false);

    const fetchNowPlayingMovie=async()=>{
         try {
             const {data}=await axios.get('/api/shows/NowPlaying');


            //  setNowPlayimgMovie(dummyShowsData)
             if(data.success){
                setNowPlayimgMovie(data.nowPlayingMovies)
                console.log('Now Playing Movie',data.nowPlayingMovies);
             }
         } catch (error) {
             toast.error(error.message)
         }
    }

    const handleDateTimeAdd=()=>{
        if(!dateTimeInput) return false;

        const [date,time]=dateTimeInput.split("T");

        console.log('dataTime',date,time)
       

        setDateTimeSelection((prev)=>{
            console.log('prev dddd',prev[date])
            const times=prev[date] || [];
            console.log('prev date',times)
            console.log('times',times)
            if(!times.includes(time)){
                return {
                    ...prev,
                    [date]:[time]
                }
            }
            
            return prev;
        })

        console.log('prev',dateTimeSelection)
    }

    const handleRemoveTime=(date,time)=>{
            setDateTimeSelection((prev)=>{
                const filteredTimes=prev[date].filter((t)=>t !==time);
                if(filteredTimes.length > 0){
                    const {[date]:_,...rest}=prev;
                    return rest;

                }
                return {
                    ...prev,
                    [date]:filteredTimes
                }
            })
    }




    const handleSubmit=async()=>{
        setAddingShow(true);
        try {
             

             if(!selectedMovie || Object.keys(dateTimeSelection).length===0 || !showPrice){
               return toast.error('Please Fill All Fields');
             }
             
             const showsInput=Object.entries(dateTimeSelection).map(([date,time])=>({date,time}))
             
             const payload={
                movieId:selectedMovie,
                showInput:showsInput,
                showPrice:showPrice,
             }

             const {data}=await axios.post('/api/shows/addShow',payload,{
                headers:{Authorization:`Bearer ${await getToken()}`}
             })

             if(data.success){
                toast.success(data.message);
                setSelectedMovie(null);
                setDateTimeSelection({});
                setShowPrice("")
             }
             else{
                toast.error(error.message)
             }

             console.log('payload',payload)

        } catch (error) {
            toast.error(error.message)
        }
        setAddingShow(false)
    }

    useEffect(()=>{
           fetchNowPlayingMovie();
    },[])





    return nowPlayingMovie.length>0? (
        <>
        <Title txtOne="Add" txtTwo="Shows"/>
           <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
           <div className='overflow-x-auto no-scrollbar pb-4'>

            <div className="flex flex-wrap gap-4 mt-4 w-max">
                 {
                    nowPlayingMovie.map((data,index)=>(
                        <div key={data.id} className={
                            `relative w-35 cursor-pointer hover:-translate-y-1 transition duration-300`
                        } onClick={()=>setSelectedMovie(data.id)}>
                             <div className='relative rounded-lg overflow-hidden'>
                              <img src={image_base_url+data.poster_path} alt=""  className='w-full object-cover brightness-90'/>
                              <div className='text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0'>
                                    <p className='flex items-center gap-1 text-gray-400'>
                                        <StarIcon className="w-4 h-4 text-primary fill-primary"/>
                                        {data.vote_average.toFixed(1)}
                                    </p>
                                    <p className='text-gray-300'> 
                                       {KConverter(data.vote_count)}
                                       Votes
                                    </p>
                              </div>
                             </div>
                                   <div>
            {/* {selectedMovie === data._id} */}
            {
                selectedMovie===data.id && (
                    <div className='absolute top-2 right-2 flex items-center
                    justify-center bg-pink-500 h-6 w-6 rounded'>
                                  <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5}/>
                    </div>
                )
            }
           </div>

            <p className='font-medium truncate'>{data.title}</p>
                 <p className='text-gray-400 text-sm'>{data.release_date}</p>
                        </div>
                    ))
                    
                 }
                
                  

            </div>

           </div>

            {/**Form*/}

            <div className='mt-8'>
                 <label className='block text-sm font-medium mb-2'>Show Price</label>

                 <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
                   <p className='text-gray-400 text-sm'>{currency}</p>

                   <input type="nmber" min={0} value={showPrice} onChange={(e)=>setShowPrice(e.target.value)} placeholder='Enter Show Price' className='outline-none'/>
                 </div>
            </div>


                <div className='mt-8'>
                 <label className='block text-sm font-medium mb-2'>Select Date and Time</label>

                 <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
                   <p className='text-gray-400 text-sm'>{currency}</p>

                   <input type="datetime-local"  value={dateTimeInput} onChange={(e)=>setDateTimeInput(e.target.value)}  className='outline-none rounded-md'/>

                   <button onClick={handleDateTimeAdd} className='bg-pink-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-white text-black cursor-pointer'>
                    Add Time
                   </button>
                 </div>
            </div>


            {
                Object.keys(dateTimeSelection).length > 0 && (
            
                   <div className='mt-6'>
                           
                        <h2 className='mb-2'>Selected Date-Time</h2>

                        <ul className='space-y-3'>
                            {
                                Object.entries(dateTimeSelection).map(([date,times])=>(
                                    <li key={date}>

                                        <div className='font-medium'>
                                             {date}
                                        </div>

                                        <div className='flex flex-wrap gap-2 mt-1 text-sm'>
                                               
                                            {
                                                times.map((time)=>(
                                                    <div key={time} className='border px-2 py-2 flex items-center rounded'>
                                                        <span>{time}</span>
                                                        <DeleteIcon onClick={()=>handleRemoveTime(date,time)} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer'/>
                                                                                                            </div>
                                                ))
                                            }

                                        </div>

                                    </li>
                                ))
                            }
                        </ul>
                   </div>
                )}
               
               <button onClick={handleSubmit}  className='bg-pink-500 text-white px-8 py-2 mt-6 rounded-lg cursor-pinter'>Add Show</button>

           
        </>
    ):
    <>
    <Loading/>
    </>
}

export default AddShow
