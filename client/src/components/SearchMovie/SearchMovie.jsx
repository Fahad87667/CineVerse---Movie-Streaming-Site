import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieTrailer, searchMovies } from "../../store/Slice/movie-slice";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import TrailerModal from "../TrailerModal/TrailerModal";

const SearchMovie = ({
  showSearchResult,
  setShowSearchResult,
  searchedInput,
  onPlayStateChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedMovies } = useSelector((state) => state.movie);
  const [isTrailerActive, setTrailerActive] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (searchedInput && searchedInput.trim() !== "") {
      dispatch(searchMovies({ query: searchedInput }));
    }
  }, [searchedInput, dispatch]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    dispatch(getMovieTrailer(movie));
    setTrailerActive(true);
  };

  const playTrailer = (movie) => {
    navigate("/trailer", {
      replace: true,
      state: { movie },
    });
  };

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
    if (path.startsWith("http")) return path;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  if (!showSearchResult || !searchedInput) return null;

  return (
    <div
      className="search-results"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#141414",
        padding: "20px",
        borderRadius: "4px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {searchedMovies && searchedMovies.length > 0 ? (
          searchedMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "4px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title || movie.name}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              <div
                className="movie-card__overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "15px",
                }}
              >
                <h5
                  style={{
                    color: "#fff",
                    marginBottom: "10px",
                    fontSize: "1rem",
                  }}
                >
                  {movie.title || movie.name}
                </h5>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTrailer(movie);
                    }}
                    style={{
                      padding: "5px 10px",
                      fontSize: "0.875rem",
                    }}
                  >
                    <FaPlay style={{ marginRight: "5px" }} /> Play
                  </button>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMovieClick(movie);
                    }}
                    style={{
                      padding: "5px 10px",
                      fontSize: "0.875rem",
                    }}
                  >
                    <AiOutlineInfoCircle style={{ marginRight: "5px" }} /> More
                    Info
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: "#fff", textAlign: "center", width: "100%" }}>
            No movies found
          </div>
        )}
      </div>

      {isTrailerActive && selectedMovie && (
        <TrailerModal
          movie={selectedMovie}
          handleModal={setTrailerActive}
          isLiked={false}
          trailer={selectedMovie.trailer}
          onPlayStateChange={onPlayStateChange}
        />
      )}
    </div>
  );
};

export default SearchMovie;
