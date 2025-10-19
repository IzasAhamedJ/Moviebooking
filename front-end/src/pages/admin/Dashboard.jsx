import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets';
import { useLocation } from 'react-router-dom';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import Blur from '../../components/Blur';
import dateFormat from '../../libraries/dateFomat';
import { useAppContext } from '../../context/AppContext';

function Dashboard() {

     const {axios,getToken,user,image_base_url}=useAppContext();

    const currency=import.meta.env.VITE_CURRENCY;

    const url=useLocation();

    console.log('current url',url)

    const [dashboardData,setDashboardData]=useState({
        totalBookings:0,
        totalRevenue:0,
        activeShows:[],
        totalUser:0
    })

    const[loading,setLoading]=useState(false);

    const dashboardCards=[
        {
            title:'Total Bookings',value:dashboardData.totalBookings || 0 ,icon:ChartLineIcon 
        },
         {
            title:'Total Revenue',value:dashboardData.totalRevenue || 0 ,icon:CircleDollarSignIcon 
        },
         {
            title:'Active Shows',value:dashboardData.activeShow?.length || 0 ,icon:PlayCircleIcon 
        },
         {
            title:'Total Users',value:dashboardData.totalUser || 0 ,icon:UserIcon 
        }
    ]

    const fetchDashBoardData=async()=>{
         setLoading(true);
        try {
            const token=await getToken();
        const {data}=await axios.get('/api/admin/dashboardData',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        if(data.success){
            setDashboardData(data.dashBoardData);
        }
        // setDashboardData(dummyDashboardData);
        setLoading(false)
        } catch (error) {
             toast(error.message)
             setLoading(false)
        }
       
        
    }

    useEffect(()=>{
        if(user){
           fetchDashBoardData();
        }
          
    },[user])



    return !loading?(
        <>
          <Title txtOne="Admin" txtTwo="Dashboard"/>

          <div className='relative flex flex-wrap gap-4 mt-6 max-w-5xl'>
              <Blur top="-100px" left="0"/>

                {
                    dashboardCards.map((data,index)=>(
                        <div key={index} className='w-50 flex items-center justify-between px-4 py-3 bg-pink-500 border border-primary/20 rounded-md '>
                              <div>
                                <h1 className='text-sm'>{data.title}</h1>
                                <p className='text-xl font-medium mt-1'>{data.value}</p>
                              </div>
                              <data.icon className='w-6 h-6'/>
                        </div>
                    ))
                }
                       
          </div>

          <div className='mt-10'>
            <p className='text-lg font-medium'>Active Shows</p>
            <div className='reltaive flex flex-wrap gap-6 mt-4 max-w-5xl'>

                <Blur top='100px' left="-10%"/>
               {
                dashboardData.activeShow?.map((show)=>(
                    <div className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-pink-500 border border-primary/20 hover:-translate-y-1 transition duration-300'>
                        <img src={`${image_base_url}`+show.movie.poster_path} alt="" className='h-60 w-100 object-cover'/>
                        <p className='font-medium p-2 truncate'>{show.movie.title}</p>

                        <div className='flex items-center justify-between px-2'>

                            <p className='text-lg font-medium'>{currency}{show.showPrice}</p>
                             <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'>
                                <StarIcon className='w-4 h-4 text-pink-500 fill-pink-500'/>
                                {show.movie.vote_average.toFixed(1)}
                             </p>
                        </div>

                        <div className='px-2 pt-2 text-sm'>
                             {dateFormat(show.showDateTime)}
                        </div>
                    </div>
                ))
               }


            </div>
          </div>
        </>
    ):<>
       <Loading/>
    </>
}

export default Dashboard
