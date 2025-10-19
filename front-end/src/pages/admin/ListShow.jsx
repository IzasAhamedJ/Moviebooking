import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import dateFormat from '../../libraries/dateFomat';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function ListShow() {
  
    const currency=import.meta.env.VITE_CURRENCY;

     const {axios,getToken,user,image_base_url}=useAppContext();
   

    const[shows,setShows]=useState([]);

    const[load,setLoad]=useState(true);


    const getAllShows=async()=>{
        try {
            //  setShows([
            //     {
            //     movie:dummyShowsData[0],
            //     showDateTime:"2025-06-30T02:30:00.000",
            //     showPrice:59,
            //     occupiedSeat:{
            //         A1:"user_1",
            //         B1:"user_2",
            //         C1:"user_3"
            //     }
            //  }
            //  ])
        const token=await getToken();
        const {data}=await axios.get('/api/admin/getAllshows',{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        if(data.statusCode==404){
          toast.error(data.message);
          setLoad(false);
          return;
        }
        setShows(data.data)
        console.log('getAllListShows',data)
             setLoad(false);
        } 
        catch (error) {
             toast.error(error.message);
             console.error(error)
        }
    }


    useEffect(()=>{
         if(user){
                getAllShows();
         }
       
    },[user])


    return !load?(
        <div>
              <Title txtOne="List" txtTwo="Shows"/>

              <div className='max-w-4xl mt-6 overflow-x-auto'>

                <table className='w-full border-collapse rounded-md overflow-hidden text-wrap'>

                    <thead>
                        <tr className='bg-pink-500 text-left text-white'>
            

                              <th className='p-2 font-medium'>Movie Name</th>

                              <th className='p-2 font-medium'>Show Time</th>

                                <th className='p-2 font-medium'>Seats</th>

                                  <th className='p-2 font-medium'>Amount</th>
                        </tr>
                        
                    </thead>
                    <tbody className='text-sm font-light'>
                        {
                            shows.map((data,index)=>(
                              <tr key={index} className='border-b border-bg-500 even:bg-blue-400'>
                               
                             

                                <td className='p-w min-w-45 pl-5'>{data.movie.title}</td>

                                <td className='p-2'>{dateFormat(data.showDateTime)}</td>

                                <td className='p-2'>
                                 {Object.keys(data?.occupiedSeats).length}
                                </td>

                                <td className='p-2'>
                                    {currency}{Object.keys(data.occupiedSeats).length * data.showPrice}

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

export default ListShow
