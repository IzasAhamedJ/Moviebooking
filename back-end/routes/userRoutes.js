import express from 'express';
import { getUserBookings,addFavourite,getFavouriteMovies,updateFavouriteMovies} from '../controllers/userController.js';
import { protectAdmin} from '../middleware/Auth.js';
const userRoutes=express.Router();

userRoutes.get('/getUserBookings',getUserBookings);
userRoutes.post('/add-Favourite',addFavourite);
userRoutes.get('/getFavourites',getFavouriteMovies);
userRoutes.post('/update-Favourite',updateFavouriteMovies)

export default userRoutes;