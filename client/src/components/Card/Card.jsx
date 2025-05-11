import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import TrailerModal from "../TrailerModal/TrailerModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieTrailer,
  addToLikedMovies,
  removeLikedMovie,
} from "../../store/Slice/movie-slice";
import { toast } from "react-hot-toast";
import "./Card.scss";

const CardComponent = ({ movie, isLiked = false, onPlayStateChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTrailerActive, setTrailerActive] = useState(false);
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const { user } = useSelector((state) => state.auth);

  if (!movie) {
    return null;
  }

  const playTrailer = () => {
    navigate("/trailer", {
      replace: true,
      state: {
        movie: movie,
      },
    });
  };

  const handleModal = async (status) => {
    try {
      setTrailerActive(status);
      await dispatch(getMovieTrailer(movie)).unwrap();
    } catch (error) {
      toast.error("Failed to load trailer");
      setTrailerActive(false);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to like movies");
      navigate("/login");
      return;
    }

    try {
      if (isLikedState) {
        await dispatch(
          removeLikedMovie({ email: user.email, movieId: movie.id })
        ).unwrap();
        setIsLikedState(false);
        toast.success("Movie removed from liked movies");
      } else {
        const movieData = {
          id: movie.id,
          name: movie.name || movie.title || "Unknown",
          image: movie.image || movie.backdrop_path,
          poster: movie.poster || movie.poster_path,
          genres: movie.genres || [],
        };
        await dispatch(
          addToLikedMovies({ email: user.email, movie: movieData })
        ).unwrap();
        setIsLikedState(true);
        toast.success("Movie added to liked movies");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update liked movies");
    }
  };

  const imageUrl =
    movie.poster_path || movie.backdrop_path || movie.poster || movie.image;
  const movieName = movie.name || movie.title || "Unknown";

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300x450?text=No+Image";
    if (path.startsWith("http")) return path;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <>
      <Card className="h-100 movie-card">
        <Card.Img
          variant="top"
          src={getImageUrl(imageUrl)}
          alt={movieName}
          className="movie-card__image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
          }}
        />
        <Card.ImgOverlay className="movie-card__overlay">
          <div className="movie-card__content">
            <h5 className="movie-card__title">{movieName}</h5>
            {movie.genres && movie.genres.length > 0 && (
              <div className="movie-card__genres">
                {movie.genres.map((genre, index) => (
                  <span key={index} className="movie-card__genre">
                    {genre}
                  </span>
                ))}
              </div>
            )}
            <div className="movie-card__buttons">
              <Button
                variant="light"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  playTrailer();
                }}
              >
                <FaPlay /> Play
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleModal(true);
                }}
              >
                <AiOutlineInfoCircle /> More Info
              </Button>
              <Button
                variant="link"
                size="sm"
                className="like-button"
                onClick={handleLike}
              >
                {isLikedState ? (
                  <FaHeart className="text-danger" />
                ) : (
                  <FaRegHeart className="text-light" />
                )}
              </Button>
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>

      {isTrailerActive && (
        <TrailerModal
          movie={movie}
          handleModal={handleModal}
          isLiked={isLikedState}
          trailer={movie.trailer}
          onPlayStateChange={onPlayStateChange}
        />
      )}
    </>
  );
};

export default CardComponent;
