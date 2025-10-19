import React from 'react'
import { dummyBookingData } from '../assets/assets'
import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import Blur from '../components/Blur'
import { convertMinutesToHMS } from '../libraries/convertHours'
import dateFormat from '../libraries/dateFomat'
import { useAppContext } from '../context/AppContext'


function MyBookings() {

    const currency=import.meta.env.VITE_CURRENCY;

    const{axios,getToken,user,image_base_url}=useAppContext();
    


    const[booking,setBookings]=useState([]);

    const[isLoading,setIsLoading]=useState(true);


    const myBookings=async()=>{
        try {
            const {data}=await axios.get('/api/user/getUserBookings',{
                 headers:{
              Authorization:`Bearer ${await getToken()}`
            }
            })
            

            if(data.success){
                setBookings(data.userBookedData)
             
            }
        } catch (error) {
            toast.error(error.message)
        }

            setIsLoading(false)
    }

    useEffect(()=>{
        if(user){
           myBookings();
        }
      
    },[])

    return !isLoading ? (
        <div className='px-6 md:px-16 lg:px-34 py-20 md:py-50 relative'>
          
            <Blur top='100px' left='100px' />
            <div>
                  <Blur bottom='0px' left='600px' />
            </div>
            <h1 className='text-lg font-bold mb-4'>My Bookings</h1>
            <div>
                {
                    booking.map((data,index) => (
                        <div key={index} className='flex flex-col md:flex-row items-center justify-between bg-gray-700 border rounded-lg mt-4 p-2 max-w-3xl'>
                            <div className='flex flex-col md:flex-row'>
                                <img src={`${image_base_url}`+data.show.movie.poster_path} alt="" className='md:max-w-45
                                aspect-video h-auto object-cover object-bottom rounded'/>
                                <div className='flex flex-col'>
                                     <p className='text-lg font-semibold'>{data.show.movie.title}</p>
                                     <p className='text-gray-400 text-sm'>{convertMinutesToHMS(data.show.movie.runtime)}</p>
                                      <p className='text-gray-400 text-sm mt-auto'>{dateFormat(data.show.showDateTime)}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
                                    <div className='flex items-center gap-4'>
                                         <p className='text-2xl font-semibold mb-3'>{currency}{data.amount}</p>
                                         {!data.isPaid && !data.paymentLink &&
                                         <button className='bg-pink-500 text-sm px-4 py-1.5 mb-3 rounded-sm font-medium cursor-pointer'>Pay Now</button>}
                                    </div>
                                    <div className='text-sm'>
                                        <p><span className='text-gray-400'>Total Tickets:</span>{data.bookedSeats.length}</p>
                                        <p><span className='text-gray-400'>Seat Number:</span>{data.bookedSeats.join(", ")}</p>
                                        
                                    </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    ) : (
        <div className='px:8 md:px-16 lg:px-36 text-center py-50'>
           <Loading/>
        </div>
    )
}

export default MyBookings
