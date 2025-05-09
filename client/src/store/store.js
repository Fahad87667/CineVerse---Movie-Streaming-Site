import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slice/movie-slice";
import authReducer from "./Slice/auth-slice";

const store = configureStore({
  reducer: {
    movie: movieReducer,
    auth: authReducer,
  },
});

export default store;
