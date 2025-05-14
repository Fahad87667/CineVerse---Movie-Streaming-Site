import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  removeLikedMovie,
  addToLikedMovies,
  rateMovie,
  removeMovieRating,
  getSimilarMovies,
  getMovieTrailer,
} from "../../store/Slice/movie-slice";
import Rating from "../Rating/Rating";
import "./TrailerModal.scss";
import TrailerPlayerModal from "../TrailerModal/TrailerPlayerModal";

const TrailerModal = ({
  movie,
  handleModal,
  isLiked,
  trailer,
  onPlayStateChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isDisliked, setIsDisliked] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { ratedMovies } = useSelector((state) => state.movie);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    if (ratedMovies && movie) {
      const ratedMovie = ratedMovies.find((m) => m.movieId === movie.id);
      if (ratedMovie) {
        setUserRating(ratedMovie.rating);
      }
    }
  }, [ratedMovies, movie]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (movie?.id) {
        setLoadingSimilar(true);
        try {
          const response = await dispatch(getSimilarMovies(movie.id)).unwrap();
          setSimilarMovies(response.slice(0, 6)); // Show only 6 similar movies
        } catch (error) {
          console.error("Error fetching similar movies:", error);
        } finally {
          setLoadingSimilar(false);
        }
      }
    };

    fetchSimilarMovies();
  }, [movie?.id, dispatch]);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (movie?.id) {
        try {
          const key = await dispatch(getMovieTrailer(movie)).unwrap();
          setTrailerKey(key);
        } catch (error) {
          setTrailerKey("");
        }
      }
    };
    fetchTrailer();
  }, [movie, dispatch]);

  const handlePlayStateChange = (playing) => {
    setIsPlaying(playing);
    onPlayStateChange?.(playing);
  };

  const addToMovieLikedList = async () => {
    if (!user) {
      toast.error("Please login to add movies to your list");
      navigate("/login");
      return;
    }

    try {
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
      toast.success("Movie added to your list");
    } catch (err) {
      toast.error(err.message || "Failed to add movie to your list");
      console.log(err);
    }
  };

  const removeFromMovieLikedList = async () => {
    if (!user) {
      toast.error("Please login to remove movies from your list");
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        removeLikedMovie({ email: user.email, movieId: movie.id })
      ).unwrap();
      setIsLikedState(false);
      toast.success("Movie removed from your list");
    } catch (err) {
      toast.error(err.message || "Failed to remove movie from your list");
      console.log(err);
    }
  };

  const handleLike = () => {
    toast.success("Movie added to your list");
    setIsLikedState(true);
    setIsDisliked(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("Please login to dislike movies");
      navigate("/login");
      return;
    }

    try {
      if (isLikedState) {
        await dispatch(
          removeLikedMovie({ email: user.email, movieId: movie.id })
        ).unwrap();
        setIsLikedState(false);
        toast.success("Movie removed from your list");
      }
      setIsDisliked(true);
    } catch (err) {
      toast.error(err.message || "Failed to remove movie from your list");
      console.log(err);
    }
  };

  const handleRatingChange = async (rating) => {
    if (!user) {
      toast.error("Please login to rate movies");
      navigate("/login");
      return;
    }

    try {
      if (rating === userRating) {
        // If clicking the same rating, remove it
        await dispatch(
          removeMovieRating({ email: user.email, movieId: movie.id })
        ).unwrap();
        setUserRating(0);
        toast.success("Rating removed");
      } else {
        // Add or update rating
        await dispatch(
          rateMovie({
            email: user.email,
            movie,
            rating,
          })
        ).unwrap();
        setUserRating(rating);
        toast.success(`Rated ${rating} stars`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update rating");
    }
  };

  const handlePlayClick = () => setShowTrailer(true);
  const handleTrailerClose = () => setShowTrailer(false);

  return (
    <>
      <Modal
        show={true}
        onHide={() => handleModal(false)}
        size="lg"
        centered
        className="trailer-modal"
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>{movie.name || movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white p-0">
          <div className="p-4">
            <Row className="mb-4">
              <Col md={3} className="mb-3 mb-md-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    movie.poster_path || movie.poster
                  }`}
                  alt={movie.name || movie.title}
                  className="img-fluid rounded movie-poster"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x450?text=No+Image";
                  }}
                />
              </Col>
              <Col md={9}>
                <div className="d-flex gap-3 mb-3">
                  <Button variant="light" onClick={handlePlayClick}>
                    <IoPlayCircleSharp className="me-2" />
                    Play
                  </Button>
                  <Button
                    variant={isLikedState ? "light" : "outline-light"}
                    onClick={handleLike}
                  >
                    <RiThumbUpFill className="me-2" />
                    Like
                  </Button>
                  <Button
                    variant={isDisliked ? "light" : "outline-light"}
                    onClick={handleDislike}
                  >
                    <RiThumbDownFill className="me-2" />
                    Dislike
                  </Button>
                  {isLikedState ? (
                    <Button
                      variant="outline-light"
                      onClick={removeFromMovieLikedList}
                    >
                      <AiOutlineCheck className="me-2" />
                      Remove from List
                    </Button>
                  ) : (
                    <Button
                      variant="outline-light"
                      onClick={addToMovieLikedList}
                    >
                      <AiOutlinePlus className="me-2" />
                      Add to my list
                    </Button>
                  )}
                </div>
                <h5 className="mb-3">Overview</h5>
                <p className="mb-4">{movie.overview}</p>
                <div className="movie-details">
                  <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <div className="mb-2">
                    <strong>Rating</strong>
                    <div className="d-flex align-items-center mt-1">
                      <span className="rating-value">
                        {movie.vote_average
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                      </span>
                      <span className="ms-2">
                        <Rating
                          initialRating={movie.vote_average || 0}
                          readonly
                          size={20}
                        />
                      </span>
                    </div>
                  </div>
                  <p>
                    <strong>Genres:</strong>{" "}
                    {movie.genres?.map((genre, index) => (
                      <span key={index} className="me-2">
                        {genre}
                      </span>
                    ))}
                  </p>
                  <p>
                    <strong>Language:</strong> {movie.original_language}
                  </p>
                </div>
              </Col>
            </Row>

            {/* Add Similar Movies Section */}
            {similarMovies.length > 0 && (
              <div className="similar-movies mt-4">
                <h5 className="mb-3">Similar Movies You May Like</h5>
                <Row>
                  {similarMovies.map((similarMovie) => (
                    <Col key={similarMovie.id} xs={6} sm={4} md={2}>
                      <div
                        className="similar-movie-card"
                        onClick={() => {
                          handleModal(false);
                          setTimeout(() => {
                            handleModal(true, similarMovie);
                          }, 100);
                        }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${similarMovie.poster}`}
                          alt={similarMovie.name}
                          className="img-fluid rounded"
                        />
                        <div className="similar-movie-info">
                          <h6>{similarMovie.name}</h6>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      {showTrailer && (
        <TrailerPlayerModal
          show={showTrailer}
          onHide={handleTrailerClose}
          trailer={trailerKey}
        />
      )}
    </>
  );
};

export default TrailerModal;
