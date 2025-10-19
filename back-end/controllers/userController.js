import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

export const getUserBookings=async(req,res)=>{
   try {
      const {userId}=req.auth();
      console.log('userid ',userId)


      const userBookingData=await Booking.find({
        user:userId
      }).populate({
        path:"show",
        populate:{
            path:'movie'
        }
      }).sort({createdAt:-1})

      res.status(200).json({
        success:true,
        userBookedData:userBookingData
      })


      
   } catch (error) {
       res.status(500).json({message:error.message})
   }
}

export const addFavourite=async(req,res)=>{
   try {
      const {movieId}=req.body;
      
      const {userId}=req.auth();

      const user=await clerkClient.users.getUser(userId);

      if(!user.privateMetadata.favorites){
        user.privateMetadata.favorites=[];
      }

      if(!user.privateMetadata.favorites.includes(movieId)){
        user.privateMetadata.favorites.push(movieId)
      }

      await clerkClient.users.updateUserMetadata(userId,{
        privateMetadata:user.privateMetadata
      })

      res.status(200).json({
        message:'Favourites Added Successfully'
      })
   } catch (error) {
      res.status(500).json({
        message:error.message
      })
   }
}

export const updateFavouriteMovies=async(req,res)=>{
   try {
     const {movieId}=req.body;

     const {userId}=req.auth();

     const user = await clerkClient.users.getUser(userId);
     
     if(!user.privateMetadata.favorites){
         user.privateMetadata.favorites=[];
     }
     if(!user.privateMetadata.favorites.includes(movieId)){
        user.privateMetadata.favorites.push(movieId);
     }
     else{
      user.privateMetadata.favorites=user.privateMetadata.favorites.filter( item => item !==movieId)
     }

     await clerkClient.users.updateUserMetadata(userId,{
      privateMetadata:user.privateMetadata
     })

     res.status(200).json({
        success:true,
        message:'Favouries Updated Successfully'
     })


   } catch (error) {
      res.status(500).json({
        message:error.message
      })
   }
}

export const getFavouriteMovies=async(req,res)=>{
   try {
     const user=await clerkClient.users.getUser(req.auth().userId);
     const favMovies=user.privateMetadata.favorites || [];

     const movies=await Movie.find({
      _id:{$in:favMovies}
     })

     res.status(200).json({
      success:true,
      favouriteMovies:movies
     })
   } catch (error) {
       res.status(500).json({
        message:error.message
       })
   }
} 