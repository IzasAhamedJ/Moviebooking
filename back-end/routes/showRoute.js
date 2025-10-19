import express from "express"
const showRoutes=express.Router();
import { getNowPlayingMovies,addShow,getAllShow,getSingleShow} from "../controllers/showController.js";

import { protectAdmin } from "../middleware/Auth.js";

showRoutes.get("/NowPlaying",getNowPlayingMovies);

showRoutes.post("/addShow",addShow);

showRoutes.get("/allShow",getAllShow);

showRoutes.get("/:movieId",getSingleShow);


export default showRoutes;