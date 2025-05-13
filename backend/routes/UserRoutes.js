import express from "express";
import {
  addtoLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  updateUserProfile,
} from "../controllers/UserControl.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/liked/:email", getLikedMovies);
router.post("/add", addtoLikedMovies);
router.put("/remove", removeFromLikedMovies);
router.put("/profile", auth, updateUserProfile);

export default router;
