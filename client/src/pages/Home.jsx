import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store/Slice/movie-slice";
import Loader from "../components/Loader/Loader";
import CardComponent from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";
import { toast } from "react-hot-toast";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, genres, status, error } = useSelector((state) => state.movie);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [loadError, setLoadError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);

        // First load genres
        const genresResult = await dispatch(getGenres()).unwrap();
        if (!genresResult || !Array.isArray(genresResult)) {
          throw new Error("Failed to load genres");
        }

        // Then load movies
        const moviesResult = await dispatch(fetchMovies()).unwrap();
        if (!moviesResult || !Array.isArray(moviesResult)) {
          throw new Error("Failed to load movies");
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setLoadError(error.message || "Failed to load data");
        toast.error(error.message || "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch, retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setLoadError(null);
  };

  // Show loading state
  if (isLoading || status === "pending") {
    return (
      <div className="home-container">
        <Navbar
          isScrolled={false}
          isGenresActive={false}
          hideNavbar={isPlaying}
        />
        <Loader />
      </div>
    );
  }

  // Show error state
  if (error || loadError) {
    return (
      <div className="home-container">
        <Navbar
          isScrolled={false}
          isGenresActive={false}
          hideNavbar={isPlaying}
        />
        <div className="error-container">
          <h2>Error: {error || loadError}</h2>
          <button onClick={handleRetry}>Retry</button>
        </div>
      </div>
    );
  }

  // Show no movies state
  if (!movies || movies.length === 0) {
    return (
      <div className="home-container">
        <Navbar
          isScrolled={false}
          isGenresActive={false}
          hideNavbar={isPlaying}
        />
        <div className="no-movies">
          <h2>No movies found</h2>
          <button onClick={handleRetry}>Refresh</button>
        </div>
      </div>
    );
  }

  // Show movies grid
  return (
    <div className="home-container">
      <Navbar
        isScrolled={false}
        isGenresActive={false}
        hideNavbar={isPlaying}
      />
      <div className="movies-container mt-5">
        {movies.map((movie) => (
          <CardComponent
            key={movie.id}
            movie={movie}
            genres={genres}
            isLiked={false}
            onPlayStateChange={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
