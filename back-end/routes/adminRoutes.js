import express from "express";

 const adminRouter=express.Router();

import { protectAdmin } from "../middleware/Auth.js";

import { getAllBookings, getAllShows, getDashBoardData, isAdmin } from "../controllers/adminController.js";

 adminRouter.get('/isAdmin',protectAdmin,isAdmin);

 adminRouter.get('/dashboardData',protectAdmin,getDashBoardData);

 adminRouter.get('/getAllshows',protectAdmin,getAllShows);

  adminRouter.get('/bookedData',protectAdmin,getAllBookings)


export default adminRouter;