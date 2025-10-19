import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import dateFormat from '../../libraries/dateFomat';
import { useAppContext } from '../../context/AppContext';

function ListBooking() {
   
    const currency=import.meta.env.VITE_CURRENCY;

     const {axios,getToken,user,image_base_url}=useAppContext();

    const[booking,setBookings]=useState([]);

    const[isLoad,setIsLoad]=useState(true);

   
    const getAllbooking=async()=>{
        // setBookings(dummyBookingData)
        const token=await getToken();
        const {data}=await axios.get('/api/admin/bookedData',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setBookings(data.data);
        setIsLoad(false)
    }
     

    useEffect(()=>{
      if(user){
          getAllbooking();
      }
    },[user])

    return  !isLoad?(
       <div>
              <Title txtOne="List" txtTwo="Bookings"/>
              <div className='max-w-4xl mt-6'>

                <table className='w-full border-collapse rounded-md text-nowrap'>

                    <thead>
                        <tr className='bg-pink-500 text-left text-white'>

                             <th className='p-2 font-medium'>User Name</th>
                             <th className='p-2 font-medium'>Movie Name</th>

                              <th className='p-2 font-medium'>Show Time</th>

                                <th className='p-2 font-medium'>Seats</th>

                                  <th className='p-2 font-medium'>Amount</th>
                        </tr>
                    </thead>

                    <tbody className='text-sm font-light'>

                         {
                            booking.map((data,index)=>(
                                                 <tr key={index} className='border-b border-bg-500 even:bg-blue-400'>
                               
                             
                                <td className='p-2 min-w-45 pl-5'>{data.user.name}</td>
                                <td className='p-2'>{data.show.movie.title}</td>
                                <td className='p-2'>{dateFormat(data.show.showDateTime)}</td>

                                <td className='p-2'>
                                  {Object.keys(data.bookedSeats).map(seat => data.bookedSeats[seat]).join(", ")}
                                </td>

                                <td className='p-2'>
                                    {currency}{data.amount}

                                </td>

                              </tr>
                            ))
                         }

                    </tbody>

                </table>

              </div>
       </div>
    ):
    <>
    <Loading/>
    </>
}

export default ListBooking
