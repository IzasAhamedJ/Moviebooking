import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

function Loading() {
   const{paymentUrl}=useParams();

   const navigate=useNavigate();

   useEffect(()=>{
        if(paymentUrl){
                setTimeout(() => {
                     navigate('/'+paymentUrl)
                }, 8000);
        }
   },[])


    return (
        <>
            <div className='flex justify-center items-center h-[80-vh]'>
                <div className='animate-spin rounded-full h-14 w-14 border-2 border-pink-500'>

                </div>
            </div>
        </>
    )
}

export default Loading
