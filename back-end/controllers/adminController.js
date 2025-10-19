
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import user from "../models/User.js";


export const isAdmin=async(req,res)=>{
    res.json({
        isAdmin:true
    })
} 

export const getDashBoardData=async(req,res)=>{
    try {
         const bookings=await Booking.find({
            isPaid:true
         })

         const activeShow=await Show.find({
            showDateTime:{$gte:new Date()}
         }).populate('movie');

         const totalUser=await user.countDocuments();

        const dashBoardData={
            totalBookings:bookings.length,
            totalRevenue:bookings.reduce((acc,booking)=>acc + booking.amount,0),
            activeShow,
            totalUser
        }

        res.status(200).json({
            success:true,
            dashBoardData
        })



    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const getAllShows=async(req,res)=>{
   try {
     const shows=await Show.find({
        showDateTime:{$gte:new Date()}
     }).populate('movie').sort({
        showDateTime:1
     })

     res.status(200).json({
        data:shows
     })

   } catch (error) {
       res.status(500).json({
        message:error.message
       })
   }
}


export const getAllBookings=async(req,res)=>{
   try {
       const bookedData=await Booking.find({}).populate('user').populate({
        path:'show',
        populate:{
            path:'movie'
        }
       })

       res.status(200).json({
        data:bookedData
       })
   } catch (error) {
       
    res.status(500).json({
         message:error.message
    })
   }
}