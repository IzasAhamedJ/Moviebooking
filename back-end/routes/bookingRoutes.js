import express from "express";


const bookRoutes=express.Router();

// import { protectAdmin } from "../middleware/Auth";

import { createBooking,getOccupiedSeats,getUserBooking} from "../controllers/bookingController.js";


bookRoutes.post("/createBooking",createBooking);

bookRoutes.get("/getUserBooking",getUserBooking)

bookRoutes.get("/seats/:showId",getOccupiedSeats);

export default bookRoutes;