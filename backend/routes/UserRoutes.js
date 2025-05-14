import express from "express";
import {
  addtoLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  updateUserProfile,
  rateMovie,
  getRatedMovies,
  removeRating,
  getAverageMovieRating,
} from "../controllers/UserControl.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/liked/:email", getLikedMovies);
router.post("/add", addtoLikedMovies);
router.put("/remove", removeFromLikedMovies);
router.put("/profile", auth, updateUserProfile);
router.post("/rate", rateMovie);
router.get("/rated/:email", getRatedMovies);
router.delete("/rating", removeRating);
router.get("/average-rating/:movieId", getAverageMovieRating);

export default router;
