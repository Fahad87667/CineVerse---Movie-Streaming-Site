import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "8c247ea0b4b56ed2ff7d41c9a833aa77";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const BACKEND_URL = "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  if (!array || !Array.isArray(array)) return;

  array.forEach((movie) => {
    if (!movie) return;

    const movieGenres = [];
    if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
    }

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name:
          movie?.original_name ||
          movie?.original_title ||
          movie?.title ||
          "Unknown",
        image: movie.backdrop_path,
        poster: movie.poster_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  try {
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      if (results && Array.isArray(results)) {
        createArrayFromRawData(results, moviesArray, genres);
      }
    }
    return moviesArray;
  } catch (error) {
    console.error("Error fetching raw data:", error);
    throw error;
  }
};

export const getGenres = createAsyncThunk(
  "movie/getGenres",
  async (type = "movie") => {
    try {
      const endpoint = type === "tv" ? "tv" : "movie";
      const {
        data: { genres },
      } = await axios.get(
        `${TMDB_BASE_URL}/genre/${endpoint}/list?api_key=${API_KEY}`
      );
      return genres || [];
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch genres"
      );
    }
  }
);

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async ({ type = "movie", sortBy = "popularity.desc" } = {}, { getState }) => {
    try {
      const {
        movie: { genres },
      } = getState();
      if (!genres || !Array.isArray(genres)) {
        throw new Error("Genres not loaded");
      }

      let url;
      if (type === "tv") {
        url = `${TMDB_BASE_URL}/trending/tv/week?api_key=${API_KEY}`;
      } else if (type === "new-popular") {
        url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}`;
      } else {
        url = `${TMDB_BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
      }

      const movies = await getRawData(url, genres, true);
      return movies;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch movies"
      );
    }
  }
);

export const getMovieTrailer = createAsyncThunk(
  "movie/getMovieTrailer",
  async (movie) => {
    try {
      const { data } = await axios.get(
        `${TMDB_BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`
      );
      return data.results[0]?.key;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch trailer"
      );
    }
  }
);

export const fetchMoviesWithGenre = createAsyncThunk(
  "movie/fetchMoviesWithGenre",
  async ({ genre, type }, { getState }) => {
    try {
      const {
        movie: { genres },
      } = getState();
      const movies = await getRawData(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
        genres
      );
      return movies;
    } catch (error) {
      console.error("Error fetching movies with genre:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch movies"
      );
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movie/searchMovies",
  async ({ query }) => {
    try {
      const { data } = await axios.get(
        `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      );
      return data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw new Error(
        error.response?.data?.message || "Failed to search movies"
      );
    }
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "movie/getUserLikedMovies",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/liked/${email}`);
      return response.data.movies;
    } catch (error) {
      console.error("Error fetching liked movies:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch liked movies"
      );
    }
  }
);

export const addToLikedMovies = createAsyncThunk(
  "movie/addToLikedMovies",
  async ({ email, movie }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/add", {
        email,
        movie,
      });
      return response.data.user.likedMovies;
    } catch (error) {
      console.error("Error adding to liked movies:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add movie to liked list"
      );
    }
  }
);

export const removeLikedMovie = createAsyncThunk(
  "movie/removeLikedMovie",
  async ({ email, movieId }, { rejectWithValue }) => {
    try {
      const response = await api.put("/users/remove", {
        email,
        movie: { id: movieId },
      });
      return response.data.user.likedMovies;
    } catch (error) {
      console.error("Error removing from liked movies:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to remove movie from liked list"
      );
    }
  }
);

const initialState = {
  movies: [],
  genres: [],
  genresLoaded: false,
  status: "idle",
  error: null,
  likedMovies: [],
  searchedMovies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSearchedMovies: (state) => {
      state.searchedMovies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Genres
      .addCase(getGenres.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.genresLoaded = false;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload || [];
        state.genresLoaded = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.genresLoaded = false;
      })
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload || [];
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get Movie Trailer
      .addCase(getMovieTrailer.fulfilled, (state, action) => {
        state.trailer = action.payload;
      })
      // Fetch Movies with Genre
      .addCase(fetchMoviesWithGenre.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchMoviesWithGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchMoviesWithGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchedMovies = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get User Liked Movies
      .addCase(getUserLikedMovies.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getUserLikedMovies.fulfilled, (state, action) => {
        state.likedMovies = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getUserLikedMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add to Liked Movies
      .addCase(addToLikedMovies.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(addToLikedMovies.fulfilled, (state, action) => {
        state.likedMovies = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addToLikedMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Remove from Liked Movies
      .addCase(removeLikedMovie.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(removeLikedMovie.fulfilled, (state, action) => {
        state.likedMovies = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(removeLikedMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSearchedMovies } = movieSlice.actions;
export default movieSlice.reducer;
