import express from "express";
import {
  addtoLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
} from "../controllers/UserControl.js";

const router = express.Router();

router.get("/liked/:email", getLikedMovies);
router.post("/add", addtoLikedMovies);
router.put("/remove", removeFromLikedMovies);

export default router;
