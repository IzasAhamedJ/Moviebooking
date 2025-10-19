import React, { useState } from 'react'
import Blur from './Blur'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function DateSelect({dateTime,id}) {
    
    const [selectedDate,setSelectedDate]=useState(null)

    
    const navigate=useNavigate();
    console.log('date',selectedDate)


    const bookHandler=()=>{
        if(!selectedDate){
            return toast('Please Select a date')
        }
        navigate(`/movies/${id}/${selectedDate}`)
    }

    return (
        <>
        
        <div id='dateselect' className='pt-20 pb-20'>
             <div className='flex flex-col items-center justify-between gap-10 md:flex-row
             relative p-8 border rounded-lg'>
                  <Blur top="-100px" left="-100px"/>
                   <Blur top="100px" left="0"/>

                   <div>
                      <p className='text-lg font-semibold'>Choose Date</p>
                      <div className='flex items-center gap-6 text-sm mt-5'>
                           <ChevronLeftIcon className='w-28'/>
                           <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
                                    {dateTime.map((date)=>(
                                        <button key={date.time} className={
                                            `flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${selectedDate === date.time? 'bg-pink-500':''}`
                                        }
                                        onClick={()=>setSelectedDate(date.time)}>
                                             <span>{new Date(date.time).getDate()}</span>
                                             <span>{new Date(date.time).toLocaleDateString("en-US",{month:"short"})}</span>
                                        </button>
                                    ))}
                           </span>
                           <ChevronRightIcon className='w-28'/>
                      </div>
                   </div>

                   <div>
                    <button className='rounded-full bg-pink-500 text-white px-8 py-2 mt-10 cursor-pointer' onClick={bookHandler}>Book Now</button>
                   </div>
             </div>
        </div>
        </>
    )
}

export default DateSelect
